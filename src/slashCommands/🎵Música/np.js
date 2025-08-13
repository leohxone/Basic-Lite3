const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

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
    CMD: new SlashCommandBuilder()
    .setDescription('Ver la duración de la canción actual.'),

    async execute (client, interaction) {
        const queue = interaction.client.distube.getQueue(interaction);
    
        if (!queue) {
          const noQueueError = new  EmbedBuilder()
            .setTitle(':x: No se encontró ninguna cola.')
            .setDescription('No hay canciones en la cola para mostrar.')
            .setColor('Red');
          return interaction.reply({ embeds: [noQueueError] });
        }
    
        const currentSong = queue.songs[0];
        const timeElapsed = queue.currentTime;
        const totalTime = currentSong.duration;

        const progressBar = buildProgressBar(timeElapsed, totalTime, 10);

        const npEmbed = new EmbedBuilder()
          .setTitle(`:musical_note: Reproduciendo ahora: **${currentSong.name}**`)
          .setDescription(`**${getTimeString(timeElapsed)}** ${progressBar} **${getTimeString(totalTime)}**`)
          .setThumbnail(currentSong.thumbnail)
          .setColor('Blue');
          const npMessage = await interaction.reply({ embeds: [npEmbed] });

          const interval = setInterval(async () => {
            const updatedQueue = interaction.client.distube.getQueue(interaction);
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