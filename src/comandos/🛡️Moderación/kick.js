const { EmbedBuilder } = require ('discord.js');

module.exports = {
    DESCRIPTION: "Kickea a cualquier usuario",
    PERMISSIONS: ["KickMembers"],

    async execute (client, message, args, prefix, errorEmbed) {

        const authorcmd = message.author;
        const user = message.guild.members.resolve(message.mentions.members.first() || client.users.cache.get(args[0]));
        
        if (!user) {
            return message.reply({embeds: [errorEmbed('> ¡No puedo banear a nadie sin mencionarlo!')] });
          }
      
          const member = message.guild.members.cache.get(user.id);
          const errorMessages = [];

            if (member.roles.highest.position >= message.member.roles.highest.position) {
                errorMessages.push(`> ¡No se puede actuar sobre ${user.user.username} ya que tienen un rol superior!`);
            }

            if (user.id === client.user.id) {
                errorMessages.push('> ¡No puedes kickearme!');
            }

            if (user.id === authorcmd.id) {
                errorMessages.push('> ¡No puedes kickearte a ti mismo!');
            }

            if (errorMessages.length > 0) {
                return message.reply({ embeds: [errorEmbed(errorMessages.join('\n\n'))] });
            }
        
        let ingreso = args.slice().join(" ");
        let reason = ingreso.replace(user, "") || "No específicada.";

        const embed2 = new EmbedBuilder()
            .setColor("Green")
            .setTitle(`:name_badge: Te han kickeado de: ${message.guild.name}`)
            .setDescription(`¡**${authorcmd.username}** te ha kickeado! \n\n **Razón:** ${reason}`)
            .setTimestamp()

        try {
            await user.send({ embeds: [embed2] });
            } catch (error) {
            return message.reply({ embeds: [errorEmbed('¡No hay usuario mencionado!')] });
        }

        await member.kick(reason)

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle(":name_badge: Usuario kickeado correctamente :mechanical_leg:")
            .setDescription(`¡El usuario ha sido pateado con éxito! :x:`)
            .setTimestamp()
            .addFields(
                { name: `Usuario`, value: `${user}`, inline: true },
                { name: `Razón`, value: `${reason}`, inline: true },
                { name: "Moderador", value: `${authorcmd}`, inline: true },
            )

        await message.reply({ embeds: [embed] })

    }
}