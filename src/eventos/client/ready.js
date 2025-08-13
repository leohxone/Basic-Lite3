const Discord = require('discord.js');

module.exports = async client => {
    const cpu = (process.cpuUsage().system / 1000000).toFixed(2);
    const node = process.version
    const discordv = Discord.version

    console.log('Iniciando el bot...'.blue);
    console.log('Encendido'.blue);
    console.log(`Conectado como ${client.user.tag}`.blue);
    console.log(`Versión de node: ${node}`.blue)
    console.log(`Versión de discord: v${discordv}`.blue)
    console.log(`CPU del bot: ${cpu}%`.blue)
    console.log(`Servers: ${client.guilds.cache.size}`.blue);
    client.on("warn", (e) => console.warn(e));
    

    if(client?.application?.commands) {
        client.application.commands.set(client.slashArray);
        console.log(`(/) ${client.slashCommands.size} Comandos Publicados!`.green);
    }
}