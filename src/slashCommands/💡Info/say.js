const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Envia un mensaje por medio del bot.")
    .addStringOption(option => option.setName('mensaje').setDescription('El mensaje enviado.').setRequired(true)),
    
    async execute (client, interaction) {
      const mensay = interaction.options.getString(`mensaje`)
      interaction.reply({ 
        embeds: [
          new EmbedBuilder()
          .setTitle('Mensaje:')
          .setDescription(`${mensay}`)
          .setColor('0x119ad9')
          .setTimestamp()
          .setFooter({ text: `Enviado por: ${interaction.user.tag} `})
                ]
            })
      }
}