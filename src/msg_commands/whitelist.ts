import { Message } from "discord.js";
import { INVITES, INVITE_TRACKER_ID } from "../constants";
import { normalEmbed } from "../utils";
export const passCondition = (message: Message): Boolean => {
  const commandName = message.interaction?.commandName;
  console.log(commandName);
  // if message sender id is INVITE_TRACKER and slashcommand is /invites, operate execute
  return message.webhookId === INVITE_TRACKER_ID && commandName === INVITES;
};

export const execute = async (message: Message) => {
  if (!message.embeds[0].description || !message.interaction) return;
  console.log("hi there:");

  // proccess the number from "invite Tracker" bot message
  const inviteNumber = Number(
    message.embeds[0].description
      .split("invites.")[0]
      .split("have")[1]
      .replace(/\*/g, "")
  );

  // if user invitation is more than 10, get whitelist role
  const isWhitelist = inviteNumber >= 10;
  const role = getRole("WHITELIST", message);
  // console.log(role);

  if (!role || !message.guild) return;

  // set infos for sending message to user
  const userObj = message.interaction.user;
  const guildUser = await message.guild.members.fetch(userObj.id);
  const title = `${userObj.username}#${userObj.discriminator}`;

  if (isWhitelist) {
    // send msg when user is not whitelist
    const msg = `You need **${10 - inviteNumber}** invites more!`;
    return message.channel.send({ embeds: [normalEmbed(title, msg)] });
  } else {
    // when user is whitelist
    guildUser.roles.add(role);
    const msg = `You have been whitelisted  🎉`;
    return message.channel.send({ embeds: [normalEmbed(title, msg)] });
  }
};

const getRole = (_role: string, message: Message) => {
  if (!message.guild) return;
  return message.guild.roles.cache.find((r) => r.name === _role);
};
