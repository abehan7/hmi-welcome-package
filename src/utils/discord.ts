import axios from "axios";
import { IDecodedDiscordToken } from "../interfaces/discordToken";

export const getDiscordUser = async (
  tokenType: string,
  accessToken: string
): Promise<IDecodedDiscordToken> => {
  const response = await axios.get("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${tokenType} ${accessToken}`,
    },
  });
  return response.data as unknown as IDecodedDiscordToken;
};
