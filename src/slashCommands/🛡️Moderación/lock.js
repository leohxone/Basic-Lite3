const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription('🔒 Bloquea un canal de texto.'),
    PERMISSIONS: ["ManageChannels"],
    
  async execute(client, interaction, errorEmbedi) {

    const channel = interaction.channel;

    try {
      await channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false });
      return interaction.reply({ 
        embeds: [
            new EmbedBuilder()
                .setTitle('🔒 Se ha bloqueado un canal de texto')
                .setDescription(`> ✅ El canal ${channel} fue bloqueado con éxito.`)
                .setColor('Red')
                .setTimestamp()
                .setFooter({ text: `Bloqueado por: ${interaction.user.tag} `})
    ]});
    } catch (error) {
        console.error(error);
        return interaction.reply({ embeds: [errorEmbedi('Hubo un error mientras intentabas bloquear el canal de texto')] });
    }
  },
};
