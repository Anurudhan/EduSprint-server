import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { Message }  from "../infrastructure/database/model";
import { updateLastSeen } from "../infrastructure/database/repository";

// Define a proper type for online users
interface OnlineUser {
  userId: string;
  socketId: string;
}

// Using an array is simpler than maintaining both a Map and an array
let onlineUsers: OnlineUser[] = [];

export const socket = (server: HTTPServer) => {
  // Get frontend URL from environment with fallback
  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
  console.log(FRONTEND_URL, "frontend url for socket.io ------------>");
  const io = new SocketIOServer(server, {
    cors: {
      origin: [FRONTEND_URL], // Add common development URLs
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"]
    },
    // Handle path for potential API gateway routing
    path: process.env.SOCKET_PATH || "/socket.io",
    // Increase ping timeout and interval for microservice environment
    pingTimeout: 60000,
    pingInterval: 25000,
    // Transport options
    transports: ['polling','websocket'],
    // Allow upgrades to websocket
    allowUpgrades: true,
  });

  io.on("connection", (socket: Socket) => {
    // Properly extract and handle the userId from query params
    // Fix case sensitivity issue - check both "userid" and "userId"
    const userIdFromQuery = socket.handshake.query.userId || socket.handshake.query.userid;
    const initialUserId = typeof userIdFromQuery === 'string' ? userIdFromQuery : undefined;
    
    console.log("Socket connected", socket.id);
    console.log(initialUserId, "handshake userId check--------->");
    
    // If we have a userId from the connection query, add the user immediately
    if (initialUserId) {
      addOrUpdateUser(initialUserId, socket.id);
      io.emit("online-users", onlineUsers);
    }
    
    // Change the type to accept any to handle both string and object payloads
    socket.on("new-user", (userIdPayload: any) => {
      // Extract the actual userId string regardless of format
      let userId: string;
      
      if (typeof userIdPayload === 'object' && userIdPayload !== null) {
        // If it's an object, try to extract userId property
        userId = userIdPayload.userId || '';
      } else {
        // Otherwise use it directly if it's a string
        userId = String(userIdPayload);
      }
      
      console.log(userId, "new-user---->");
      
      if (!userId) {
        console.error("Invalid userId received:", userIdPayload);
        return;
      }
      
      // Update or add user to online users list
      addOrUpdateUser(userId, socket.id);
      
      console.log("online-users", onlineUsers);
      io.emit("online-users", onlineUsers);
    });

    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
      console.log("joined to roomid: ", roomId);
    });

    socket.on("send-message", async (messageData: any) => {
      console.log(messageData.roomId, "message roomid");
      io.to(messageData.roomId).emit("receive-message", {
        ...messageData,
        createdAt: new Date().toISOString(),
      });
    });

    socket.on("typing", ({ roomId, senderId }) => {
      socket.to(roomId).emit("isTyping", senderId);
    });

    socket.on("delete-message", ({ messageId, roomId }: any) => {
      io.to(roomId).emit("get-delete-message", messageId);
    });
    socket.on('block-user', ({ userId }) => {
      console.log(`Blocking user: ${userId}`);
      // Find the socket ID from the onlineUsers array instead
      const userToBlock = onlineUsers.find(user => user.userId === userId);
      if (userToBlock && userToBlock.socketId) {
        io.to(userToBlock.socketId).emit('user-blocked');
      }
    });

    socket.on("message-seen", async ({ roomId, chatId, userId }) => {
      try {
        // Find all previous unseen messages and update them
        const messages = await Message.find({ chatId, receiverSeen: false }).sort(
          { createdAt: 1 }
        );
        
        for (const msg of messages) {
          await Message.updateMany(
            { _id: msg._id },
            { $set: { receiverSeen: true } }
          );
          
          io.to(roomId).emit("message-seen-update", {
            messageId: msg._id,
            userId,
          });
        }
      } catch (error) {
        console.error("Error in message-seen handler:", error);
      }
    });

    // Video call events
    socket.on("start-call", ({ roomId, id }) => {
      console.log(roomId, "roomid---video call");
      console.log(id, "userid---");
      socket.to(roomId).emit("incoming-call", id);
      console.log("emitted---->", roomId);
    });
    
    socket.on("end-call", (roomId) => {
      socket.to(roomId).emit("end-call");
    });

    socket.on("disconnect", async () => {
      try {
        // Find the disconnected user
        const disconnectedUser = onlineUsers.find(user => user.socketId === socket.id);
        
        if (disconnectedUser) {
          const disconnectedUserId = disconnectedUser.userId;
          
          // Remove from online users
          onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
          
          // Notify others
          io.emit("online-users", onlineUsers);
          
          // Update last seen
          await updateLastSeen(disconnectedUserId);
          io.emit("last-seen", disconnectedUserId);
        }
      } catch (error) {
        console.error("Error in disconnect handler:", error);
      }
    });
  });

  io.on("error", (error: any) => {
    console.error("Socket.IO error:", error);
  });

  // Helper function to add or update a user in the online users array
  function addOrUpdateUser(userId: string, socketId: string) {
    const existingUserIndex = onlineUsers.findIndex(user => user.userId === userId);
    
    if (existingUserIndex === -1) {
      // Add new user
      onlineUsers.push({ userId, socketId });
    } else {
      // Update existing user
      onlineUsers[existingUserIndex].socketId = socketId;
    }
  }

  return io;
};