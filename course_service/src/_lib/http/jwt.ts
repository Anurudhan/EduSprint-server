import jwt from "jsonwebtoken";
import { UserPayload } from "./IUserPayload";

export const generateAccessToken = (
    payload: UserPayload
) => {

    const { _id, email, role } = payload;
    const newPayload = { _id, email, role };

    return jwt.sign(
        newPayload,
        String(process.env.ACCESS_TOKEN_SECRET),
        { expiresIn: '15m' }  
    );
};