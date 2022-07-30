import { Message } from "discord.js";
import { BLACKLIST } from "../constants";
import { getRole } from "../utils";

export const passCondition = (message: Message) => {
  const isBlacklist = BLACKLIST.some((word) =>
    message.content.toLowerCase().includes(word)
  );
  const channel = message.channel;

  if (!channel || channel.type !== "GUILD_TEXT") return;
  const role = getRole("Gentleman's Team", channel);
  const isTeamMember = message.member?.roles.cache.has(role?.id!);
  return isBlacklist && !isTeamMember;
};

export const execute = async (message: Message) => message.delete();
