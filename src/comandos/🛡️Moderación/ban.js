const { EmbedBuilder } = require('discord.js');

module.exports = {
    DESCRIPTION: "Banea a cualquier usuario mencionado",
    PERMISSIONS: ["BanMembers"],

    async execute(client, message, args, prefix, errorEmbed) {

        const authorcmd = message.author;
        const user = message.guild.members.resolve(message.mentions.users.first() || client.users.cache.get(args[0]));
        
        if (!user) {
            return message.reply({embeds: [errorEmbed('> ¡No puedo banear a nadie sin mencionarlo!')] });
          }
      
          const member = message.guild.members.cache.get(user.id);
          const errorMessages = [];
      
          if (member.roles.highest.position >= message.member.roles.highest.position) {
            errorMessages.push(`> ¡No se puede actuar sobre ${user.user.username} ya que tienen un rol superior!`);
          }
          if (user.id === client.user.id) {
            errorMessages.push('> ¡No puedes banearme!');
          }
          if (user.id === authorcmd.id) {
            errorMessages.push('> ¡No puedes banearte a ti mismo!');
          }
          if (errorMessages.length > 0) {
            return message.reply({ embeds: [errorEmbed(errorMessages.join('\n\n'))] });
          }

        let ingreso = args.slice().join(" ");
        let reason = ingreso.replace(user, "") || "No específicada.";

        const embed2 = new EmbedBuilder()
            .setColor("Red")
            .setTitle(`:name_badge: Te han baneado de: ${message.guild.name}`)
            .setDescription(`¡**${authorcmd.username}** te ha baneado! \n\n **Razón:** ${reason}`)
            .setTimestamp()

        try {
            await user.send({ embeds: [embed2] });
        } catch (error) {
            return message.reply({ embeds: [errorEmbed('¡No hay usuario mencionado!')] });
        }

        await member.ban({ reason: reason });

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle(":name_badge: Usuario baneado correctamente :hammer:")
            .setDescription(`¡El usuario ha sido baneado con exito! :white_check_mark:`)
            .setTimestamp()
            .addFields(
                { name: `Usuario`, value: `${user}`, inline: true },
                { name: `Razón`, value: `${reason}`, inline: true },
                { name: "Moderador", value: `${authorcmd}`, inline: true },
            )

        await message.channel.send({ embeds: [embed] })

    }
}