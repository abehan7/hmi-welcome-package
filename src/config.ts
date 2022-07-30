import dotenv from "dotenv";
dotenv.config();
const {
  CLIENT_ID,
  GUILD_ID,
  DISCORD_TOKEN,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  ALCHEMY_RPC_URL,
} = process.env;

if (
  !CLIENT_ID ||
  !GUILD_ID ||
  !DISCORD_TOKEN ||
  !DB_USER ||
  !DB_PASSWORD ||
  !DB_NAME ||
  !ALCHEMY_RPC_URL
) {
  throw new Error("Missing environment variables");
}

interface IConfig {
  CLIENT_ID: string;
  GUILD_ID: string;
  DISCORD_TOKEN: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  ALCHEMY_RPC_URL: string;
}

const config: IConfig = {
  CLIENT_ID,
  GUILD_ID,
  DISCORD_TOKEN,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  ALCHEMY_RPC_URL,
};

export default config;
