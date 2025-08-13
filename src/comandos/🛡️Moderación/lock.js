const {EmbedBuilder} = require('discord.js');

module.exports = {
    DESCRIPTION: "🔒 Bloquea un canal de texto.",
    PERMISSIONS: ["ManageChannels"],
    
  async execute(client, message, errorEmbed) {

    const channel = message.channel;

    try {
      await channel.permissionOverwrites.create(message.guild.id, { SendMessages: true });
      return message.reply({ 
        embeds: [
            new EmbedBuilder()
                .setTitle('🔒 Se ha bloqueado un canal de texto')
                .setDescription(`> ✅ El canal ${channel} fue bloqueado con éxito.`)
                .setColor('Red')
                .setTimestamp()
                .setFooter({ text: `Bloqueado por: ${message.member.displayName} `})
    ]});
    } catch (error) {
      console.error(error);
      return message.reply({ embeds: [errorEmbed('Hubo un error mientras intentabas bloquear el canal de texto')] });
    }
  },
};
