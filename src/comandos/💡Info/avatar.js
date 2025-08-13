const {EmbedBuilder} = require ('discord.js');

module.exports = {
    DESCRIPTION: "Muestra la foto de un usuario",

    async execute (client, message, args, prefix) {

        const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle(`Imagen de perfil de ${user.username}!`)
          .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }));
        message.channel.send({ embeds: [avatarEmbed] });
      },
    };