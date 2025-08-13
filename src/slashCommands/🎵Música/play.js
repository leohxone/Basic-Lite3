const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription('Reproducción de música.')
    .addStringOption(option => option.setName('cancion').setDescription('Reproduce canciones o playlists').setRequired(true)),

    async execute (client, interaction) {
        let songName = interaction.options.getString("cancion");

        if (!songName) {
            const noSongNameError = new EmbedBuilder()
              .setTitle(':x: No se especificó ninguna canción.')
              .setDescription('¡Especifica el nombre de una canción para reproducir!')
              .setColor('Red');
          return interaction.reply({ embeds: [noSongNameError] });
          };
  
          if (!interaction.member.voice.channel) {
              const noVoiceChannelError = new EmbedBuilder()
              .setTitle(':x: No estás en un canal de voz.')
              .setDescription('Debes estar en un canal de voz para reproducir música.')
              .setColor('Red');
          return interaction.reply({ embeds: [noVoiceChannelError] });
          };
  
          if (interaction.guild.members.me.voice?.channel && interaction.member.voice?.channel.id != interaction.guild.members.me.voice?.channel.id) {
              const differentVoiceChannelError = new EmbedBuilder()
              .setTitle(':x: Estás en un canal de voz diferente al mío.')
              .setDescription('Debes estar en el mismo canal de voz que yo para reproducir música.')
              .setColor('Red');
          return interaction.reply({ embeds: [differentVoiceChannelError] });
          };
  
          client.distube.play(interaction.member.voice?.channel, songName, {
              member: interaction.member,
              textChannel: interaction.channel,
              interaction
          });
          interaction.reply(`🔎 **Buscando \`${songName}\`...**`);
      }
  }