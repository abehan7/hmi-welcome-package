import { Client } from "discord.js";
import config from "./config";
import * as msgCommandModules from "./msg_commands";

const msgCommands = Object(msgCommandModules);
const msgCommandsNames = Object.keys(msgCommands);

export const client = new Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});

client.once("ready", () => console.log("Discord bot Ready!"));

client.on("messageCreate", async (message) => {
  msgCommandsNames.map((commandName) => {
    msgCommands[commandName].passCondition(message) &&
      msgCommands[commandName].execute(message, client);
  });
});

client.login(config.DISCORD_TOKEN);
