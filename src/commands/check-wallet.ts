import { OG_CHANNEL_ID } from "./../constants/index";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, Client, CommandInteraction } from "discord.js";
import { getWalletInfo } from "../api";
import { WHITELIST_CHANNEL_ID, WHITELIST_ID } from "../constants";
import { IUser } from "../interfaces";
import { CheckWalletProps } from "../interfaces/api";

const wlChannelIds = [WHITELIST_CHANNEL_ID, OG_CHANNEL_ID];

export const data = new SlashCommandBuilder()
  .setName("check_wallet")
  .setDescription("will show you your registered wallet address");

export async function execute(interaction: CommandInteraction, client: Client) {
  try {
    const { user } = interaction;

    const channel = await client.channels.fetch(interaction.channelId);
    // get role

    if (!wlChannelIds.includes(channel.id))
      return await privateMsg(
        interaction,
        `❗this command is only for **wl-wallet-address** or **og-wallet-address** channel`
      );

    const { data } = await getWalletInfo(user.id);
    const { status, message } = data as CheckWalletProps;
    const userInfo = data.data as IUser | null;

    const messageObj = {
      content: status
        ? `
        **${user}**\nwl wallet address: **${
            userInfo?.wl_wallet_address ?? "not exist"
          }**\nog wallet address: **${
            userInfo?.og_wallet_address ?? "not exist"
          }**
        `
        : `**${user}** ${message}`,
      ephemeral: true,
    };
    // console.log(messageObj);
    // 생각해보니 디코 권한오류인듯
    return interaction.reply(messageObj);
  } catch (error) {
    const messageObj = { content: `sorry, server error😥`, ephemeral: true };
    return interaction.reply(messageObj);
  }
}
const privateMsg = (
  interaction: CommandInteraction<CacheType>,
  message: string
) => interaction.reply({ content: message, ephemeral: true });
