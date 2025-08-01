import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticateToken=(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
)=>{
  const authHeader = req.headers["authorization"]; 
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
     res.status(401).json({ message: "No token provided" });
     return
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || typeof decoded === "string") {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    req.userId = (decoded as JwtPayload).userId;
    next();
    
  });
}
