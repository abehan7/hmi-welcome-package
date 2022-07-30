module.exports = {
  apps: [
    {
      name: "discord-bot/server",
      script: "./build/index.js",
      exec_mode: "cluster",
      wait_ready: true,
    },
    {
      name: "discord-bot/wl-slash-command",
      script: "./build/bot-wl-slash.js",
      exec_mode: "cluster",
      wait_ready: true,
    },

    {
      name: "discord-bot/og-slash-command",
      script: "./build/bot-og-slash.js",
      exec_mode: "cluster",
      wait_ready: true,
    },

    {
      name: "discord-bot/og-wl-chat-block",
      script: "./build/bot-wl-chat-block.js",
      exec_mode: "cluster",
      wait_ready: true,
    },
  ],
};
