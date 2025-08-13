const {EmbedBuilder, time} = require ('discord.js');
const ms = require('ms');

module.exports = {
    DESCRIPTION: "Silencia a un usuario",
    PERMISSIONS: ["MuteMembers"],

    async execute (client, message, args, prefix, errorEmbed) {

        const authorcmd = message.author;
        const user = message.guild.members.resolve(message.mentions.members.first() || client.users.cache.get(args[0]));
        const settime = args[1];
        const razon = args.slice(2).join(" ") || "No específicada.";

        if (!user) {
            return message.reply({embeds: [errorEmbed('> ¡No puedo banear a nadie sin mencionarlo!')] });
          }
      
          const member = message.guild.members.cache.get(user.id);
          const errorMessages = [];

            if (member.roles.highest.position >= message.member.roles.highest.position) {
                errorMessages.push(`> ¡No se puede actuar sobre ${user.user.username} ya que tienen un rol superior!`);
            }

            if (user.id === client.user.id) {
                errorMessages.push('> ¡No puedo silenciarme a mí mismo!');
            }

            if (user.id === authorcmd.id) {
                errorMessages.push('> ¡No puedes silenciarte a ti mismo!');
            }

            if (!member){
                errorMessages.push('> ¡No he encontrado a ese miembro!');
            }

            if (member.isCommunicationDisabled()){
                errorMessages.push('> ¡Ese miembro ya esta asilado!');
            }

            if (!settime) {
                errorMessages.push('> ¡No se ha especificado un tiempo válido!');
            } else {
                const muteTime = ms(settime);

                if (!muteTime) {
                    errorMessages.push('> ¡No se ha especificado un tiempo válido!');
                } else {
                    await member.timeout(muteTime, razon);
                }
            }

            if (errorMessages.length > 0) {
                return message.reply({ embeds: [errorEmbed(errorMessages.join('\n\n'))] });
            }

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle(`:name_badge: Usuario muteado correctamente :mute:`)
            .setDescription(`¡El usuario ha sido aislado con éxito! :white_check_mark:`)
            .setTimestamp()
            .addFields(
              { name: "Usuario", value: `${user}`, inline: true },
              { name: "Tiempo", value: `${settime}`, inline: true },
              { name: "Razón", value: `${razon}`, inline: true },
              { name: "Moderador", value: `${authorcmd}`, inline: true },
        );

        await message.reply({ embeds: [embed] });
    }
}
