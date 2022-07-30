import { getDiscordUser } from "./../utils/discord";
import { Request, Response, NextFunction } from "express";

const discordAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("discordAuth");
    const discordToken = req.header("Authorization");
    // console.log(discordToken);
    if (!discordToken) throw new Error("No discord token");
    const [tokenType, accessToken] = discordToken.split(" ");
    // console.log(tokenType, accessToken);
    const decodedDiscordToken = await getDiscordUser(tokenType, accessToken);

    console.log(decodedDiscordToken);
    req.decodedDiscordToken = decodedDiscordToken;

    next();
  } catch (error) {
    throw new Error("fail to get discord token");
  }
};

export default discordAuth;
