const got = require('got');

const packageFile = require('../../package.json')

module.exports = async (client) => {

    setInterval(() => {
        got(client.config.discord.price_api).then(response => {
            const list = JSON.parse(response.body);
            const price = list["data"]

            client.user.setPresence({
                status: 'idle',
                activity: {
                    name: `${price.amount.split(".")[0]} USD`,
                    type: client.config.discord.status_type,
                    url: 'https://www.twitch.tv/example'
                }
            })
            //client.user.setActivity(`${price.toString().split(".")[0]} USD`); 
            console.log(`[Bitcoin] Updated Price: ${price.amount.split(".")[0]} (updating status)`)
        }).catch(error => {
            var logsChanel = client.channels.cache.get(client.config.discord.error_logs_channel_id)
            logsChanel.send(`**Price Update Error Has Occured**\n\`\`\`${error}\`\`\``)
        })
    }, 30000);

    client.user.setUsername(client.config.discord.username).catch(error => {
        var logsChanel = client.channels.cache.get(client.config.discord.error_logs_channel_id)
        logsChanel.send(`**Ratelimited While Setting Name & Avatar**\n\`\`\`${error}\`\`\``)
    }) 
    console.log('[Discord] Updated Username')

    client.user.setAvatar(client.config.discord.avatar).catch(error => {
        var logsChanel = client.channels.cache.get(client.config.discord.error_logs_channel_id)
        logsChanel.send(`**Ratelimited While Setting Name & Avatar**\n\`\`\`${error}\`\`\``)
    }) 
    console.log('[Discord] Updated Avatar')

    console.log(`[Discord] Logged in as ${client.user.tag} (${client.user.id})`)
    console.log(`[Discord] Ready on ${client.guilds.cache.size} servers`)
    console.log(`[Discord] Made By: ${packageFile.author}`)
};