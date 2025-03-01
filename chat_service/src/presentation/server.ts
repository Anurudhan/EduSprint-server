import express, { Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from 'helmet';
import errorHandler from "../_lib/common/errorHandler";
import { routers } from "../infrastructure/routers";
import { dependencies } from "../_boot/dependencie";

// Load environment-specific variables
if (process.env.NODE_ENV === "production") {
  config({ path: "./.env.production" });
} else {
  config({ path: "./.env.local" });
}

// Get frontend URL from environment with fallback
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
console.log(FRONTEND_URL, "=======chat frontend URL=========");

const app: Application = express();

const corsOptions = {
  origin: [FRONTEND_URL, "http://localhost:5173"], // Add common development URLs
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
// Modify helmet to allow WebSocket connections
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for WebSocket connections
}));
app.use(cors(corsOptions));

// Health check endpoint
app.get("/chat/test", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Chat service ON!",
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/", routers(dependencies));

// Not found handler
app.all("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "API Not found--->CHAT" });
});

app.use(errorHandler);

export default app;