pm2 delete HMI-discord-bot

<!-- bind EADDRINUSE null:5000 -->

pm2 stop HMI-discord-bot
pm2 monit
pm2 start ecosystem.config.js
pm2 list
pm2 reload HMI-discord-bot

pm2 scale HMI-discord-bot 3

pm2 logs --lines 200

pm2-dev run my-app.js
