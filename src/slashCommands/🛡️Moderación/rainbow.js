const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Crea o cambia el color de un rol")
    .addRoleOption(option => option.setName('rol').setDescription('Rol mencionado.').setRequired(true)),
    PERMISSIONS: ["ManageRoles"],
    BOT_PERMISSIONS: ["ManageRoles"],

    async execute (client, interaction, errorEmbedi) {
        const rolejoin = interaction.options.getRole('rol')
        const role = interaction.mentions.roles.first() || interaction.guild.roles.cache.find(role => role.name === rolejoin);

        if (!rolejoin) return interaction.reply({embeds: [errorEmbedi('Por favor menciona o especifica el id del rol en cuestión.')]})
        
        setInterval(() => {
            const color = Math.floor(Math.random()*16777215).toString(16);
            role.edit({ color: `#${color}` });
        }, 1500);

        const embed = new EmbedBuilder()
        .setTitle(':white_check_mark: **Rol modificado con exito**')
        .setDescription(`Se ha activado el modo rainbow en el rol`)
        .setColor(`Green`)

        interaction.reply({embeds: [embed] });
    }
}