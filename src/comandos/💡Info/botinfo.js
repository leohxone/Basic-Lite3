const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const git = require('git-last-commit');

module.exports = {
    DESCRIPTION: "Muestra la foto de un usuario",

    async execute (client, message, args, prefix) {
        
        const authorcmd = message.author;
        const dias = Math.floor(client.uptime / 86400000)
        const horas = Math.floor(client.uptime / 3600000) % 24
        const minutos = Math.floor(client.uptime / 60000) % 60
        const segundos = Math.floor(client.uptime / 10000) % 60

        git.getLastCommit((err, commit) => {
            const subject = commit.subject;
            const memoryUsage = formatBytes(process.memoryUsage().heapUsed)
            const node = process.version
            const discordv = Discord.version
            const cpu = (process.cpuUsage().system / 1000000).toFixed(2);

            const embed = new EmbedBuilder()
                .setTitle('Informacion del bot')
                .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
                .setColor('Green')
                .addFields(
                    { name: 'Desarrollador', value: '`! M1guel19#6187`', inline: true },
                    { name: 'Usuario', value: `\`${client.user.username}\``, inline: true },
                    { name: 'ID', value: `${client.user.id}`, inline: true },
                    { name: 'Fecha de creacion', value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`, inline: true },
                    { name: 'Comando de ayuda', value: '\`-help\` o \`/help\`', inline: true },
                    { name: 'Tiempo encendido', value: ` \`${dias}\` dias, \`${horas}\` horas, \`${minutos}\` minutos y \`${segundos}\` segundos.` },
                    { name: 'Servidores', value: `${client.guilds.cache.size}`, inline: true},
                    { name: 'Ping del bot', value: `${client.ws.ping}ms`, inline: true },
                    { name: 'Actualización', value: `\`${subject}\``, inline: true },
                    { name: 'Actualizado hace', value: `<t:${commit.committedOn}:R>`, inline: true },
                    { name: 'Lenguajes', value: '\`JavaScript y Node.js\`', inline: true },
                    { name: 'Version de node', value: `\`${node}\``, inline: true },
                    { name: 'Version de discord', value: `\`v${discordv}\``, inline: true },
                    { name: 'Uso de CPU', value: `\`${cpu}%\``, inline: true },
                    { name: 'Uso de memoria', value: `\`${memoryUsage}\``, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: `Enviado por: ${authorcmd.username}`, iconURL: `${authorcmd.displayAvatarURL({dynamic: true})}`})

        message.reply({ embeds: [embed] })
    });
            function formatBytes(a, b) {
                let c = 1024
                d = b || 2
                e = ['B', 'KB', 'MB']
                f = Math.floor(Math.log(a) / Math.log(c))

            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
        }
    }
}