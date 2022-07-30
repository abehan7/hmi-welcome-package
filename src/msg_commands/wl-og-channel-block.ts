import { HMI_BOT, OG_CHANNEL_ID, RYAN_ID } from "./../constants/index";
import { Message } from "discord.js";
import { WHITELIST_CHANNEL_ID } from "../constants";

export const passCondition = (message: Message) => {
  const allowedChannel = [WHITELIST_CHANNEL_ID, OG_CHANNEL_ID];
  const isBot = HMI_BOT === message.author.id;
  const isRYAN = RYAN_ID === message.author.id;

  const _passCondition =
    allowedChannel.includes(message.channel.id) && !isBot && !isRYAN;

  console.log("passCondition", _passCondition);
  console.log("user name from channel block ||", message.author.username);
  return _passCondition;
};

// const testWallet = "0x7523Ca426946e0e8f8f8f8f8f8f8f8f8f8f8f8f8f";

export const execute = async (message: Message) => {
  try {
    await message.delete();
  } catch (error) {
    console.log(error);
  }
};
