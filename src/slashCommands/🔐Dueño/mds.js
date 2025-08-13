const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Envía mensajes privados.")
    .addUserOption(option => option.setName('usuario').setDescription('Usuario mencionado').setRequired(true))
    .addStringOption(option => option.setName('mensaje').setDescription('El mensaje enviado.').setRequired(true)),
    OWNER: true,
    
    async execute (client, interaction, errorEmbedi) {
        const mensaje = interaction.options.getString("mensaje");
        const usermd = interaction.options.getUser("usuario");

        if(!mensaje) return interaction.reply({ embeds: [errorEmbedi("Es necesario un texto.")] });

        if(!usermd) return interaction.reply({ embeds: [errorEmbedi("Es necesario una mención del usuario al que se le quiera enviar el md.")] });

        usermd.send({
            embeds: [
                new EmbedBuilder()
                .setTitle('**Te ha llegado un md!** :envelope_with_arrow:')
                .setDescription(`> **${mensaje}**`)
                .setColor('Blue')
                .setTimestamp()
                .setFooter({ text: `Enviado por: ${interaction.user.tag} `})
        ]})

        await interaction.reply({ 
            embeds: [
                new EmbedBuilder()
                .setTitle(':incoming_envelope: **Mensaje enviado con éxito!**')
                .setDescription(`> Mensaje enviado a ${usermd}. :white_check_mark:`)
                .setColor('Green')
                .setTimestamp()
        ]})
    }
}