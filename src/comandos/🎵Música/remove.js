const { EmbedBuilder } = require('discord.js');

module.exports = {
  DESCRIPTION: "Remueve una canción de la lista",
  ALIASES: "remover",

  async execute(client, message, args, prefix) {
    const queue = client.distube.getQueue(message);

    if (!queue) {
      const noQueueError = new EmbedBuilder()
        .setTitle(':x: No hay ninguna canción reproduciéndose')
        .setDescription('No puedo remover una canción si no hay ninguna reproduciéndose.')
        .setColor('Red');
      return message.reply({ embeds: [noQueueError] });
    };

    if (!message.member.voice?.channel) {
      const notInVoiceChannelError = new EmbedBuilder()
        .setTitle(':x: No estás en un canal de voz')
        .setDescription('Para ejecutar este comando tienes que estar en un canal de voz.')
        .setColor('Red');
      return message.reply({ embeds: [notInVoiceChannelError] });
    };

    if (message.guild.members.me.voice?.channel && message.member.voice?.channel.id !== message.guild.members.me.voice?.channel.id) {
      const notInSameVoiceChannelError = new EmbedBuilder()
        .setTitle(':x: No estamos en el mismo canal de voz')
        .setDescription('Para ejecutar este comando tienes que estar en el mismo canal de voz que yo.')
        .setColor('Red');
      return message.reply({ embeds: [notInSameVoiceChannelError] });
    };

    if (!args[0]) {
      const noArgsError = new EmbedBuilder()
        .setTitle(':x: No se ha especificado una canción')
        .setDescription(`Especifica el número de la canción que deseas remover.\nEjemplo: ${process.env.PREFIX}remover 2`)
        .setColor('Red');
      return message.reply({ embeds: [noArgsError] });
    }

    const songToRemove = parseInt(args[0], 10);

    if (isNaN(songToRemove)) {
      const invalidArgsError = new EmbedBuilder()
        .setTitle(':x: El argumento no es un número válido')
        .setDescription(`Especifica el número de la canción que deseas remover.\nEjemplo: ${process.env.PREFIX}remover 2`)
        .setColor('Red');
      return message.reply({ embeds: [invalidArgsError] });
    }

    if (songToRemove > queue.songs.length || songToRemove < 1) {
      const outOfRangeError = new EmbedBuilder()
        .setTitle(':x: El número especificado está fuera del rango de canciones')
        .setDescription(`El rango válido es del 1 al ${queue.songs.length}.`)
        .setColor('Red');
      return message.reply({ embeds: [outOfRangeError] });
    }

    const removedSong = queue.songs.splice(songToRemove - 1, 1)[0];
    const successMessage = new EmbedBuilder()
        .setTitle(`:white_check_mark: ¡La canción "${removedSong.name}" ha sido removida! :wastebasket:`)
        .setColor('Green');
      message.reply({ embeds: [successMessage] });
  }
}