import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ITokenPayload } from "../interfaces";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params) return;
    const token = req.params.discord_id;
    if (!token) return;

    const _decodedData = (await jwt.verify(
      token,
      process.env.JWT_SECRET!
    )) as ITokenPayload;

    if (!_decodedData) return;
    console.log(_decodedData);
    req.decodedData = _decodedData;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
