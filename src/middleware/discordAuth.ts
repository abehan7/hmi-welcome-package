import { getDiscordUser } from "./../utils/discord";
import { Request, Response, NextFunction } from "express";

const discordAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discordToken = req.header("Authorization");
    // console.log(discordToken);
    if (!discordToken) throw new Error("No discord token");
    const [tokenType, accessToken] = discordToken.split(" ");
    // console.log(tokenType, accessToken);
    const decodedDiscordToken = await getDiscordUser(tokenType, accessToken);
    if (!decodedDiscordToken)
      res.status(401).send({ status: false, message: "invalid discord token" });

    // console.log(decodedDiscordToken);
    req.decodedDiscordToken = decodedDiscordToken;

    next();
  } catch (error) {
    res.status(401).send({
      status: false,
      message: "invalid discord token",
    });
  }
};

export default discordAuth;
