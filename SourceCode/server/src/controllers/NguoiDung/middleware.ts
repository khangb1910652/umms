import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    // If no token is provided, deny access
    return res.status(401).json({ message: "Token không được cung cấp" });
  }

  // Verify the token
  jwt.verify(token, "ThucTap2023_UMMS", (err: any, decoded: any) => {
    if (err) {
      // If the token is invalid, deny access
      return res.status(403).json({ message: "Token không hợp lệ" });
    }

    // Token is valid, save user information in the request for further processing
    req.user = decoded;
    next();
  });
};
