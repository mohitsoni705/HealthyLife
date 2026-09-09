import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type AuthenticatedRequest = Request & {
  user_id?: number;
  user_role?: string;
};

/** Restrict appointment scheduling to reception or administrators. */
export default function receptionMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if (!header || !secret) {
    res.status(401).json({ message: "Missing authorization token" });
    return;
  }

  try {
    const payload = jwt.verify(header, secret) as { user_id: number; role?: string };
    req.user_id = payload.user_id;
    req.user_role = payload.role;

    if (!["reception", "admin"].includes(payload.role || "")) {
      res.status(403).json({ message: "Only reception staff can schedule appointments" });
      return;
    }
    next();
  } catch {
    res.status(401).json({ message: "You are not logged in" });
  }
}
