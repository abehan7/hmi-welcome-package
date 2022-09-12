import axios from "axios";
import { IUser } from "../interfaces";
import { CheckWalletProps } from "../interfaces/api";
import { createToken } from "../utils";

const api = axios.create({ baseURL: process.env.api_BASE_URL });

export const fetchAddress = (user: IUser) =>
  api.patch(`/user/${createToken(user.discord_id)}/whitelist`, user);

export const fetchOGAddress = (user: IUser) =>
  api.patch(`/user/${createToken(user.discord_id)}/og`, user);

export const getWalletInfo = (discord_id: string) =>
  api.get(`/user/${createToken(discord_id)}`);
