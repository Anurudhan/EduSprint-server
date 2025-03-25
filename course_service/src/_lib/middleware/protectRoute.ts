import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { generateAccessToken, httpStatusCode, UserPayload } from "../http";
import { Role } from "../../domain/entities";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const verifyToken = (token: string, secret: string): UserPayload | null => {
  try {
    return jwt.verify(token, secret) as UserPayload;
  } catch (err) {
    if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
      console.error(`Error verifying token: ${err.message}`);
      return null;
    }
    throw err;
  }
};

export const protectRouter = (role?: Role) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { access_token, refresh_token } = req.cookies;
      let user: UserPayload | null = null;

      if (access_token) {
        user = verifyToken(access_token, process.env.ACCESS_TOKEN_SECRET!);
      }

      if (!user && refresh_token) {
        user = verifyToken(refresh_token, process.env.REFRESH_TOKEN_SECRET!);
        if (user) {
          const newAccessToken = generateAccessToken({
            _id: user._id,
            email: user.email,
            role: user.role,
          });
          res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          });
        }
      }
      console.log(user, "this is the user")
      if (!user) {
        res
          .status(httpStatusCode.UNAUTHORIZED)
          .json({ message: "Unauthorized, please log in again." });
        return;
      }

      if (role && user.role !== role) {
        res
          .status(httpStatusCode.UNAUTHORIZED)
          .json({ message: "Unauthorized, insufficient permissions." });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in JWT middleware:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
};