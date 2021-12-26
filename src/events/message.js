const Discord = require('discord.js');
require('discord-reply');

module.exports = async (client, message) => {

    if (message.author.bot || message.channel.type === 'dm') return;
    
    if (message.content === `<@!${client.user.id}>`) {
        message.lineReply('Hello there ');
    }

}