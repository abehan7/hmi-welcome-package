import axios from "axios";
import { IUser } from "../interfaces";
import { createToken } from "../utils";

const API = axios.create({ baseURL: process.env.API_BASE_URL });

export const fetchAddress = (user: IUser) =>
  API.patch(`/user/${createToken(user.discord_id)}/whitelist`, user);

export const fetchOGAddress = (user: IUser) =>
  API.patch(`/user/${createToken(user.discord_id)}/og`, user);
