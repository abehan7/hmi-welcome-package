import { IncomingMessage } from "http";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      decodedData?: {
        discord_id: string;
        iat: number;
        exp: number;
      };
    }
  }
}
