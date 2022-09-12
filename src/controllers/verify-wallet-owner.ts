import { Request, Response } from "express";
import { BASE_PATH } from "../constants/common";
import { ethers } from "ethers";
import { web3 } from "../utils/interact";
import { Client, Message, TextChannel } from "discord.js";
import { GENERAL_CHANNEL_ID } from "../constants";
import config from "../config";

// const client = new Client({
//   intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
// });

// client.once("ready", () => console.log("Discord bot Ready!"));
// client.login(config.DISCORD_TOKEN);

// client.on("messageCreate", async (message) => {
//   msgCommandsNames.map((commandName) => {
//     !paused &&
//       msgCommands[commandName].passCondition(message) &&
//       msgCommands[commandName].execute(message, client);
//   });
// });

export const verifyWallet = async (req: Request, res: Response) => {
  try {
    const { account, signature, message } = req.body;
    const { decodedDiscordToken } = req;
    const discordName = `${decodedDiscordToken.username}#${decodedDiscordToken.discriminator}`;
    console.log(`#1 ${discordName} || discord id : ${decodedDiscordToken.id}`);
    // TODO:
    // 이 아이디에 role을 주는거야 만약 HI-PLANET을 가지고 있다면
    // 그래서 예를들어 1000개 생산한 쿠폰중에서 사용안한 쿠폰을 그 아이디에 coupon number 옆에 넣어서 db에 저장하기
    // 그런 다음에 디코에서 슬래시 커맨드 하면 자기 쿠폰 보여주기
    // 사용여부 알려주는 거는 shopify에서 알아봐야 할 듯

    // FIXME: STEP1: verify signature
    if (!account || !signature || !message)
      res
        .status(400)
        .send({ status: false, message: "❌ Missing parameters", data: null });
    // const decodedWallet = await web3.eth.personal.ecRecover(message, signature);
    const decodedWallet = await web3.eth.accounts.recover(message, signature);

    console.log(`#2 ${discordName} || decodedWallet : ${decodedWallet}`);
    console.log(`#3 ${discordName} || account : ${account}`);
    if (decodedWallet.toUpperCase() !== account.toUpperCase())
      return res
        .status(400)
        .send({ status: false, message: "❌ different accounts", data: null });
    const isAddress = ethers.utils.isAddress(account);
    console.log(`#4 ${discordName} || isAddress : ${isAddress}`);
    if (!isAddress)
      return res
        .status(400)
        .send({ status: false, message: "❌ Invalid wallet", data: null });

    // FIXME: STEP2 이제 이 아이디에 role을 주는거야 만약 HI-PLANET을 가지고 있다면.

    // const channel = await client.channels.fetch(GENERAL_CHANNEL_ID);

    // if (!channel)
    //   return res
    //     .status(400)
    //     .json({ message: "channel not found", status: false });

    // const role = getRole("WHITELIST", channel as TextChannel);

    return res.status(200).send({
      status: true,
      message: "wallet verified ✅",
      data: {
        wallet: decodedWallet,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: false, message: "❌ Internal server error", data: null });
  }
};

export const verifyToken = async (req: Request, res: Response) => {};
const getRole = (_role: string, channel: TextChannel) =>
  channel?.guild?.roles.cache.find((r) => r.name === _role);

const util = {};
