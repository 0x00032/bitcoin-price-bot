const Discord = require("discord.js");
const fs = require('fs-extra');

const client = new Discord.Client();

client.config = require('./storage/config');

const events = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
for (const file of events) {
    console.log(`[Discord] Loading event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};
  
client.login(client.config.discord.token).catch(e => {
    console.log('[Discord] Invalid bot token!');
    process.exit(0)
});