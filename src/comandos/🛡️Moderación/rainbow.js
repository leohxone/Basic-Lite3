const {EmbedBuilder} = require ('discord.js');

module.exports = {
    DESCRIPTION: "Crea o cambia el color de un rol",
    PERMISSIONS: ["ManageRoles"],
    BOT_PERMISSIONS: ["ManageRoles"],

    async execute (client, message, args, prefix, errorEmbed) {
        const rolejoin = args.join(" ");
        const role = message.mentions.roles.first() || message.guild.roles.cache.find(role => role.name === rolejoin);

        if (!rolejoin) return message.reply({embeds: [errorEmbed('¡Por favor menciona o especifica el id del rol en cuestión!')]})
        
        setInterval(() => {
            const color = Math.floor(Math.random()*16777215).toString(16);
            role.edit({ color: `#${color}` });
        }, 1500);

        const embed = new EmbedBuilder()
        .setTitle(':white_check_mark: **Rol modificado con exito**')
        .setDescription(`Se ha activado el modo rainbow en el rol`)
        .setColor(`Green`)

        message.reply({embeds: [embed] });
    }
}