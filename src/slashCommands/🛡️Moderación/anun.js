const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Envia un anuncio por medio del bot.")
    .addStringOption(option => option.setName('mensaje').setDescription('El mensaje enviado.').setRequired(true)),
    PERMISSIONS: ["ManageMessages"],
    
    async execute (client, interaction) {

      const mensay = interaction.options.getString(`mensaje`)

      await interaction.reply({ 
        embeds: [
          new EmbedBuilder()
          .setTitle(`**ANUNCIO**`)
          .setDescription(`${mensay}`)
          .setColor('0x008f39')
          .setTimestamp()
                ]
            })
      }
}