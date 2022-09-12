import { db } from "../models";
import { Request, Response } from "express";
// import { client } from "../bot";
import { IUser } from "../interfaces";
import { GENERAL_CHANNEL_ID, WHITELIST_ID } from "../constants";
import { Client, TextChannel } from "discord.js";
import config from "../config";

const client = new Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});
client.once("ready", () => console.log("Discord bot Ready!"));
client.login(config.DISCORD_TOKEN);

export const createWhiteList = async (req: Request, res: Response) => {
  try {
    console.log("createWhiteList");
    // const userInfo = req.body;
    const { username, discriminator, wallet_address } = req.body;
    const { discord_id } = req.decodedData!;

    const oldUser = await db.User.findOne({ discord_id });
    const channel = await client.channels.fetch(GENERAL_CHANNEL_ID);
    if (!channel)
      return res
        .status(400)
        .json({ message: "channel not found", status: false });

    //general 965622452594028587
    // const roleId = await modules.getRole("Whitelist", channel as TextChannel);
    // if (!roleId) return res.status(400).send("role not found");
    const verified = await modules.verifyUserRole(
      discord_id,
      WHITELIST_ID,
      channel as TextChannel
    );

    if (!verified) return res.status(400).send("role not found");

    const userInfo: IUser = {
      username,
      discriminator,
      discord_id,
      wl_wallet_address: wallet_address,
      whitelist: verified,
    };

    // const _userInfo: IUser = { ...userInfo, whitelist: verified };

    try {
      !oldUser && (await modules.isNotExistFn(userInfo, discord_id, res));
      oldUser && (await modules.isExistFn(userInfo, discord_id, res));
    } catch (error) {
      res.status(409).json({ message: error, status: false });
    }
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: error, status: false });
  }
};

export const createOG = async (req: Request, res: Response) => {
  try {
    console.log("createOG");
    const { username, discriminator, wallet_address } = req.body;
    const { discord_id } = req.decodedData!;

    const oldUser = await db.User.findOne({ discord_id });
    const channel = await client.channels.fetch(GENERAL_CHANNEL_ID);
    if (!channel)
      return res
        .status(400)
        .send({ message: "channel not found", status: false });

    //general 965622452594028587
    const roleId = await modules.getRole("OG", channel as TextChannel);
    if (!roleId)
      return res.status(400).json({ message: "role not found", status: false });
    const verified = await modules.verifyUserRole(
      discord_id,
      roleId.id,
      channel as TextChannel
    );

    // const _userInfo: IUser = { ...userInfo, og: verified };
    // wallet_address,
    const userInfo: IUser = {
      username,
      discriminator,
      discord_id,
      og: verified,
      og_wallet_address: wallet_address,
    };

    try {
      !oldUser && (await modules.isNotExistFn(userInfo, discord_id, res));
      oldUser && (await modules.isExistFn(userInfo, discord_id, res));
    } catch (error) {
      res.status(409).json({ message: error, status: false });
    }
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: error, status: false });
  }
};

export const getWalletInfo = async (req: Request, res: Response) => {
  try {
    const { discord_id } = req.decodedData!;
    const user = (await db.User.findOne({ discord_id })) as IUser | null;

    const userTag = `${user?.username ?? "no name"}#${
      user?.discriminator ?? "no discriminator"
    }`;

    console.log(`${userTag} || check-wallet command`);

    if (!user)
      return res
        .status(200)
        .send({ message: "user not found", status: false, data: null });

    return res
      .status(200)
      .send({ message: "user found", status: true, data: user });
  } catch (err) {
    console.log(`smth went wrong in getWalletInfo`);
    res.status(200).json({ message: "server error", status: false });
  }
};

const modules = {
  isNotExistFn: async (userInfo: IUser, discord_id: string, res: Response) => {
    const update = { ...userInfo, discord_id };
    const newWhitelist = new db.User(update);
    await newWhitelist.save();
    // res.status(201).json(newWhitelist);
    res
      .status(201)
      .json({ message: "successfully added to whitelist", status: true });
  },

  isExistFn: async (userInfo: IUser, discord_id: string, res: Response) => {
    const update = { $set: { ...userInfo, discord_id } };
    await db.User.updateOne({ discord_id }, update);
    res.status(200).json({ message: "successfully updated", status: true });
    // res.status(200).json(oldUser);
  },

  verifyUserRole: async (
    discord_id: string,
    roleId: string,
    channel: TextChannel
  ): Promise<boolean> => {
    try {
      if (!channel) return false;
      if (!channel || channel.type !== "GUILD_TEXT") return false;
      const member = channel.guild.members.cache.get(discord_id);
      if (!member) return false;
      if (member.roles.cache.has(roleId)) return true;
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  getRole: (_role: string, channel: TextChannel) =>
    channel?.guild?.roles.cache.find((r) => r.name === _role),
};
