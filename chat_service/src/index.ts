import { createServer } from "http";
import { socket } from "./_boot/socket";
import database from "./_boot/database";
import app from "./presentation/server";
import { startConsumer } from "./_boot/consumer";

(async () => {
  try {
    const server = createServer(app);

    // Initialize socket.io with the HTTP server
    const io = socket(server);

    // Connect to database and start consumer
    await Promise.all([database(), startConsumer()])

    // Start the server
    const PORT = process.env.PORT || 5003;
    server.listen(PORT, () => {
      console.log(
        `The ${process.env.SERVICE || 'chat'} service is listening on port ${PORT}`
      );
    });
  } catch (error: any) {
    console.error(error?.message || "An error occurred");
    process.exit(1);
  }
})();
