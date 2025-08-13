const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("🔓 Desbloquea un canal de texto."),
    PERMISSIONS: ["ManageChannels"],

    async execute (client, interaction, errorEmbedi) {

        const channel = interaction.channel;

        try {
            await channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true });
            return interaction.reply({ 
                embeds: [
                    new EmbedBuilder()
                        .setTitle('🔓 Se ha desbloqueado un canal de texto')
                        .setDescription(`> ✅ El canal ${channel} se ha desbloqueado con éxito.`)
                        .setColor('Green')
                        .setTimestamp()
                        .setFooter({ text: `Desbloqueado por: ${interaction.user.tag} `})
            ]});
        } catch (error) {
            console.error(error);
            return interaction.reply({ embeds: [errorEmbedi('Hubo un error mientras intentabas desbloquear el canal de texto')] });
        }
    }
};