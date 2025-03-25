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
  origin: [FRONTEND_URL, "http://localhost:5173"], // Allow frontend origins
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true, // Allow cookies in CORS requests
  preflightContinue: false, // Ensure preflight requests are responded to automatically
  optionsSuccessStatus: 204, // Respond with 204 (No Content) to OPTIONS
};

app.use(cors(corsOptions));

// Manually handle OPTIONS requests if needed
app.options("*", cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
// Modify helmet to allow WebSocket connections
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for WebSocket connections
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin requests
}));
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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