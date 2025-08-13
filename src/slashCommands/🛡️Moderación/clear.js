const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Elimina mensajes en un canal.")
    .addIntegerOption(option => option.setName('cantidad').setDescription('El número de mensajes para eliminar').setMinValue(1).setMaxValue(100).setRequired(true)),
    PERMISSIONS: ["ManageMessages"],

    async execute (client, interaction, errorEmbedi) {

        const amount = interaction.options.getInteger('cantidad');
        const channel = interaction.channel;             

        if (isNaN(amount) || amount < 1 || amount > 100) return await interaction.reply({ embeds: [errorEmbedi('¡Por favor utiliza números del 1 al 100!')] });

        await channel.bulkDelete(amount).catch(err => {
            return;
        });
        
        await interaction.reply({ 
            embeds: [
                new EmbedBuilder()
                    .setTitle(':white_check_mark: **Mensajes borrados con éxito!**')
                    .setDescription(`Se han borrado **${amount}** mensajes en este canal.`)
                    .setColor('Blue')
        ]})
    }

}