const { EmbedBuilder } = require('discord.js');

function buildProgressBar(timeElapsed, totalTime, length) {
  const percentage = timeElapsed / totalTime;
  const progressLength = Math.floor(length * percentage);
  const emptyLength = length - progressLength;

  const progressBar = '▬'.repeat(progressLength) + '🔘' + '▬'.repeat(emptyLength);

  return progressBar;
}

function getTimeString(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.round(time % 60);
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return timeString;
}

module.exports = {
  DESCRIPTION: "Muestra información sobre la canción actualmente en reproducción.",
  ALIASES: "nowplaying",

  async execute(client, message, args, prefix) {
    const queue = message.client.distube.getQueue(message);

    if (!queue) {
      const noQueueError = new EmbedBuilder()
        .setTitle(':x: No se encontró ninguna cola.')
        .setDescription('No hay canciones en la cola para mostrar.')
        .setColor('Red');
      return message.reply({ embeds: [noQueueError] });
    }

    const currentSong = queue.songs[0];
    const timeElapsed = queue.currentTime;
    const totalTime = currentSong.duration;

    const progressBar = buildProgressBar(timeElapsed, totalTime, 10);

    const npEmbed = new EmbedBuilder()
      .setTitle(`:musical_note: Ahora está sonando: \n**${currentSong.name}**`)
      .setDescription(`**${getTimeString(timeElapsed)}** ${progressBar} **${getTimeString(totalTime)}**`)
      .setThumbnail(currentSong.thumbnail)
      .setColor('Blue');
    const npMessage = await message.reply({ embeds: [npEmbed] });

    const interval = setInterval(async () => {
      const updatedQueue = message.client.distube.getQueue(message);
      if (!updatedQueue || updatedQueue.songs[0] !== currentSong) {
        clearInterval(interval);
        return;
      }

      const timeElapsed = updatedQueue.currentTime;
      const progressBar = buildProgressBar(timeElapsed, totalTime, 10);

      const updatedEmbed = new EmbedBuilder()
        .setTitle(`:musical_note: Ahora está sonando: \n**${currentSong.name}**`)
        .setDescription(`**${getTimeString(timeElapsed)}** ${progressBar} **${getTimeString(totalTime)}**`)
        .setThumbnail(currentSong.thumbnail)
        .setColor('Blue');
      await npMessage.edit({ embeds: [updatedEmbed] });
    }, 5000);
  },
};