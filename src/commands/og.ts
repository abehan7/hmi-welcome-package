import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, Client, CommandInteraction, TextChannel } from "discord.js";
import { ethers } from "ethers";
import { fetchOGAddress } from "../api";
import { OG_CHANNEL_ID, OG_ID } from "../constants";
import { normalEmbed } from "../utils";

export const data = new SlashCommandBuilder()
  .setName("og")
  .setDescription("send your wallet address")
  .addStringOption((option) =>
    option
      .setName("wallet_address")
      .setDescription("send your wallet address")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction, client: Client) {
  try {
    if (!interaction?.channelId) return;
    const { user } = interaction;

    // const whitelist_channel = getChannel("invite-logs", client);
    // console.log("whitelist_channel:", whitelist_channel);
    const channel = await client.channels.fetch(interaction.channelId);

    // get role

    if (!channel || channel.type !== "GUILD_TEXT") return;

    // const OGRole = await getRole("OG", channel as TextChannel);

    const member = await channel.guild?.members.cache.get(user.id);

    if (OG_CHANNEL_ID !== channel.id)
      return await privateMsg(
        interaction,
        `**❗this command is only for OG channel**`
      );

    if (!member?.roles.cache.has(OG_ID)) {
      try {
        const msg = `you're not OG yet`;
        // const title = `${user.username}#${user.discriminator}`;
        // await channel.send({ embeds: [normalEmbed(title, msg)] });
        console.log("msg send done");
        await privateMsg(interaction, `${user} ${msg}`);
        // Abe#5318
        // you're not OG yet

        return;
      } catch (error) {
        console.log("msg send error");

        return;
      }
    }

    const wallet = await interaction.options.getString("wallet_address")!;

    const _isAddress = await ethers.utils.isAddress(wallet);
    if (!_isAddress)
      return await privateMsg(interaction, `**${wallet}** is invalid address`);

    const post = {
      discord_id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      wallet_address: wallet,
    };

    const response = await fetchOGAddress(post);
    const { status, message } = response.data;
    console.log("response:", status, message);
    console.log(wallet);

    const messageObj = {
      content: status
        ? `**${user}** **${wallet}** is added to OGlist`
        : "smth went wrong",
      ephemeral: true,
    };

    return await interaction.reply(messageObj);
  } catch (error) {
    console.error(error);
  }
}

const getRole = (_role: string, channel: TextChannel) =>
  channel?.guild?.roles.cache.find((r) => r.name === _role);

const getChannel = (channelName: string, client: Client) => {
  return client.channels.cache.find((c) => {
    if (c.type === "DM") return false;
    return c?.name === channelName;
  });
};

const privateMsg = (
  interaction: CommandInteraction<CacheType>,
  message: string
) => interaction.reply({ content: message, ephemeral: true });
