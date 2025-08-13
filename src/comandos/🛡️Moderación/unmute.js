const {EmbedBuilder, time} = require ('discord.js');
const ms = require('ms');

module.exports = {
    DESCRIPTION: "Silencia a un usuario",
    PERMISSIONS: ["MuteMembers"],

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
                errorMessages.push('> ¡No puedo silenciarme a mí mismo!');
            }

            if (user.id === authorcmd.id) {
                errorMessages.push('> ¡No puedes silenciarte a ti mismo!');
            }

            if (!member){
                errorMessages.push('> ¡No he encontrado a ese miembro!');
            }

            if (errorMessages.length > 0) {
                return message.reply({ embeds: [errorEmbed(errorMessages.join('\n\n'))] });
            }

        if (member.isCommunicationDisabled()) {
            await member.timeout(null);
        } else {
            return message.reply({ embeds: [errorEmbed('¡Este miembro no se encuentra asilado!')] });
        }

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle(`:white_check_mark: Usuario desmuteado correctamente :loud_sound:`)
            .setDescription(`Se ha removido el aislante con éxito! :white_check_mark:`)
            .setTimestamp()
            .addFields(
              { name: "Usuario", value: `${user}`, inline: true },
              { name: "Moderador", value: `${authorcmd}`, inline: true },
        );

        await message.reply({ embeds: [embed] });
    }
}
