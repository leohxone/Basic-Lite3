const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Ver una imagen de perfil.")
    .addUserOption(option => option.setName('usuario').setDescription('Usuario mencionado').setRequired(false)),

    async execute (client, interaction) {

        const user = interaction.options.getUser("usuario") || interaction.user;
        const avatarEmbed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle(`Imagen de perfil de ${user.username}!`)
          .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }));
        interaction.reply({ embeds: [avatarEmbed] });
      },
    };