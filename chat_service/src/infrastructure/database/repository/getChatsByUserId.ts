import { Types } from "mongoose";
import { Chat } from "../model";
import ErrorResponse from "../../../_lib/common/errorResponse";
import { ChatType, IChat } from "../../../domain/entities";

export const getChatsByUserId = async (userId: string | Types.ObjectId): Promise<IChat[] | null> => {
  try {
    if (!userId) return null;
    const objectId = typeof userId === "string" ? new Types.ObjectId(userId) : userId;

    // Using aggregation pipeline to lookup user information
    const chats = await Chat.aggregate([
      // Match stage - find relevant chats
      {
        $match: {
          chatType: ChatType.individual,
          participants: { $in: [objectId] }
        }
      },
      // Add a field to identify the other participant
      {
        $addFields: {
          otherParticipantId: {
            $filter: {
              input: "$participants",
              as: "participant",
              cond: { $ne: ["$$participant", objectId] }
            }
          }
        }
      },
      // Unwind to get the single other participant
      {
        $addFields: {
          otherParticipantId: { $arrayElemAt: ["$otherParticipantId", 0] }
        }
      },
      // Lookup the other participant's user data
      {
        $lookup: {
          from: "users", // Replace with your actual users collection name
          localField: "otherParticipantId",
          foreignField: "_id",
          as: "otherParticipant"
        }
      },
      // Get the first (and only) user from the lookup result
      {
        $addFields: {
          otherParticipant: { $arrayElemAt: ["$otherParticipant", 0] }
        }
      },
      // Add the other participant's name and avatar to the chat
      {
        $addFields: {
          name: "$otherParticipant.userName", // Replace with your actual field name for username
          avatar: "$otherParticipant.profile.avatar" // Replace with your actual path to avatar
        }
      }
    ]);

    // If no chats are found, return null
    if (chats.length === 0) return null;

    // Transform each chat document to ensure it matches IChat interface
    const transformedChats: IChat[] = chats.map(chat => {
      return chat as IChat;
    });
    console.log(transformedChats, "this is chat")

    return transformedChats;
  } catch (error: any) {
    throw ErrorResponse.internalError(
      error?.message || "Something went wrong!"
    );
  }
};