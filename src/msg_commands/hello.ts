import { Message } from "discord.js";

export const passCondition = (message: Message) => {
  return message.content.toLowerCase().includes("hello");
};

export const execute = async (message: Message) => {
  // message.channel.send("**what's up**");
  if (!message.mentions.members) return;
  // FIXME: 이거 멤버가 없어 이거 쓰지말자
  // 여기에 남겨 놓는 이유는 잊어먹지 말라고
  // const member = message.mentions.members.first();
  // console.log(message.channel);

  // get  channel name
  // DMChannel
  if (message.channel.type === "DM") return;
  const channelName = message.channel?.name;
  console.log(channelName);
  // message.channel.send(`**${channelName}**`);
  //   console.log(message.guild?.members);
  // if (!message.guild) return;
  // const whaleObj = message.guild.roles.cache.find((r) => r.name === "WHALE");
  // let authoruser = message.guild.members.cache.find(
  //   (m) => m.id === message.author.id
  // );

  // console.log(whaleObj?.id);
  // authoruser?.roles.add("965808674499067984");
};
