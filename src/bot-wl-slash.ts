import { Client } from "discord.js";
import config from "./config";
import * as commandModules from "./commands";

const commands = Object(commandModules);

// console.log(commands);

export const client = new Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});

client.once("ready", () => console.log("Discord bot Ready!"));

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = await interaction;
  //
  // channel.guild.members.cache.get(discord_id);
  if ("whitelist" !== commandName) return;

  "whitelist" === commandName &&
    (await commands[commandName].execute(interaction, client));
});
client.login(config.DISCORD_TOKEN);
