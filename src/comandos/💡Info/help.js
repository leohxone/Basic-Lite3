const { EmbedBuilder } = require('discord.js');

module.exports = {
    DESCRIPTION: "Muestra una lista de comandos disponibles o información sobre un comando específico",
    ALIASES: ["h", "ayuda"],

    async execute(client, message, args, prefix) {
        const embed = new EmbedBuilder()
            .setColor("#8400ff")
            .setTitle("🤖 Comandos del bot")
            .setDescription(`Escribe \`${prefix}help <comando>\` para obtener más información sobre un comando específico.`)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp();

        if (!args.length) {
            const commands = client.commands.map(cmd => cmd.DESCRIPTION).join("\n- ");
            embed.addField("Comandos disponibles", commands ? `- ${commands}` : "No hay comandos disponibles.");
            return message.channel.send({ embeds: [embed] });
        }

        const commandName = args[0].toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.ALIASES && cmd.ALIASES.includes(commandName));

        if (!command) {
            embed.addField("Comando desconocido", `No se ha encontrado el comando \`${commandName}\`. Escribe \`${prefix}help\` para ver todos los comandos disponibles.`);
            return message.channel.send({ embeds: [embed] });
        }

        embed.setTitle(`Comando \`${prefix}${commandName}\``)
            .setDescription(command.DESCRIPTION);

        if (command.ALIASES) embed.addField("Alias", command.ALIASES);

        return message.channel.send({ embeds: [embed] });
    }
}