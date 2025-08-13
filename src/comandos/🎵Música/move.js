const { EmbedBuilder } = require('discord.js');

module.exports = {
  DESCRIPTION: "Mueve una canción en la lista de reproducción",
  ALIASES: "move",

  async execute(client, message, args, prefix) {
    const queue = client.distube.getQueue(message);

    if (!queue) {
      const noQueueError = new EmbedBuilder()
        .setTitle(':x: No hay ninguna canción reproduciéndose')
        .setDescription('No puedo mover una canción si no hay ninguna reproduciéndose.')
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

    if (args.length < 2) {
      const noArgsError = new EmbedBuilder()
        .setTitle(':x: Faltan argumentos')
        .setDescription(`Especifica el número de la canción que deseas mover y la posición a la que deseas moverla.\nEjemplo: ${process.env.PREFIX}move 3 1`)
        .setColor('Red');
      return message.reply({ embeds: [noArgsError] });
    }

    const songToMove = parseInt(args[0], 10);
    const positionToMove = parseInt(args[1], 10);

    if (isNaN(songToMove) || isNaN(positionToMove)) {
      const invalidArgsError = new EmbedBuilder()
        .setTitle(':x: Los argumentos no son números válidos')
        .setDescription(`Especifica el número de la canción que deseas mover y la posición a la que deseas moverla.\nEjemplo: ${process.env.PREFIX}move 3 1`)
        .setColor('Red');
      return message.reply({ embeds: [invalidArgsError] });
    }

    if (songToMove > queue.songs.length || songToMove < 1) {
      const outOfRangeError = new EmbedBuilder()
        .setTitle(':x: El número de la canción especificada está fuera del rango de canciones')
        .setDescription(`El rango válido es del 1 al ${queue.songs.length}.`)
        .setColor('Red');
      return message.reply({ embeds: [outOfRangeError] });
    }

    if (positionToMove > queue.songs.length || positionToMove < 1) {
      const outOfRangeError = new EmbedBuilder()
        .setTitle(':x: La posición especificada está fuera del rango de canciones')
        .setDescription(`El rango válido es del 1 al ${queue.songs.length}.`)
        .setColor('Red');
      return message.reply({ embeds: [outOfRangeError] });
    }

    const movedSong = queue.songs.splice(songToMove - 1, 1)[0];
    queue.songs.splice(positionToMove - 1, 0, movedSong);
    const successMessage = new EmbedBuilder()
        .setTitle(`:white_check_mark: ¡La canción "${movedSong.name}" ha sido movida a la posición ${positionToMove}!`)
        .setColor('Green');
      message.reply({ embeds: [successMessage] });
  }
}