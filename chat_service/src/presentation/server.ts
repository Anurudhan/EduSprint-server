import express, { Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from 'helmet'
import errorHandler from "../_lib/common/errorHandler";
import { routers } from "../infrastructure/routers";
import { dependencies } from "../_boot/dependencie";

// Load environment-specific variables
if (process.env.NODE_ENV === "production") {
  config({ path: "./.env.production" });
} else {
  config({ path: "./.env.local" });
}

console.log(process.env.FRONTEND_URL,"=======chat=========");


const app: Application = express();

const corsOptions = {
  origin: String(process.env.FRONTEND_URL),
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet())
app.use(cors(corsOptions));

app.get("/api/chat/test", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Chat service ON!",
  });
});
// app.use("/api/chat", routes(dependancies));
app.use("/", routers(dependencies));

// Not found handler
app.all("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, status: 404, message: "API Not found--->CHAT" });
});

app.use(errorHandler);

export default app;