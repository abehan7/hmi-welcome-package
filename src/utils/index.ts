import { MessageEmbed, TextChannel } from "discord.js";
import jwt from "jsonwebtoken";
import config from "../config";
const { DB_USER, DB_PASSWORD, DB_NAME } = config;
export const createToken = (discord_id: string) => {
  const token = jwt.sign({ discord_id }, process.env.JWT_SECRET!, {
    expiresIn: "1m",
  });
  return token;
};

export const getTime = (date: number) => {
  const time = new Date(date);
  const _hour = time.getHours();
  const _minute = time.getMinutes();
  const _date = time.getDate();
  const _month = time.getMonth() + 1;
  const _year = time.getFullYear();
  return `${_year}.${_month}.${_date} ${_hour}h${_minute}m`;
};

export const normalEmbed = (title: string, message: string) =>
  new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`**${title}**`)
    .setDescription(message)
    .setTimestamp()
    .setFooter({ text: "HMI" });

// export const getRole = (role: string, channel: TextChannel) =>
export const getRole = (_role: string, channel: TextChannel) =>
  channel?.guild?.roles.cache.find((r) => r.name === _role);

export const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ictdjh9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
