const {EmbedBuilder} = require('discord.js');

module.exports = {
    DESCRIPTION: "🔓 Desbloquea un canal de texto.",
    PERMISSIONS: ["ManageChannels"],

    async execute (client, message, errorEmbed) {

        const channel = message.channel;

        try {
            await channel.permissionOverwrites.edit(message.guild.id, { SendMessages: true });
            return message.reply({ 
                embeds: [
                    new EmbedBuilder()
                        .setTitle('🔓 Se ha desbloqueado un canal de texto')
                        .setDescription(`> ✅ El canal ${channel} se ha desbloqueado con éxito.`)
                        .setColor('Green')
                        .setTimestamp()
                        .setFooter({ text: `Desbloqueado por: ${message.member.displayName} `})
            ]});
        } catch (error) {
            console.error(error);
            return message.reply({ embeds: [errorEmbed('Hubo un error mientras intentabas desbloquear el canal de texto')] });
        }
    }
};