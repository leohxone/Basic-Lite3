const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Envias un mensaje como el bot.")
    .addStringOption(option => option.setName('mensaje').setDescription('El mensaje enviado.').setRequired(true)),
    OWNER: true,

    async execute (client, interaction, prefix) {
        let mensay = interaction.options.getString("mensaje");
         interaction.reply(`${mensay}`);
      }
}