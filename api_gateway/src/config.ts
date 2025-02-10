
import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 5000;
export const Service = {
    AUTH_SERVICE_URL : process.env.AUTH_SERVICE_URL || "http://localhost:5001",
    USER_SERVICE_URL : process.env.USER_SERVICE_URL || "http://localhost:5002",
    CHAT_SERVICE_URL : process.env.CHAT_SERVICE_URL || "http://localhost:5003",
    NOTIFICATION_SERVICE_URL:process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5004",
    COURSE_SERVICE_URL :  process.env.COURSE_SERVICE_URL || "http://localhost:5005",
    PAYMENT_SERVICE_URL:process.env.PAYMENT_SERVICE_URL || "http://localhost:5006",
    CLIENT_URL : process.env.CLIENT_URL || "http://localhost:5173",
}
