const { EmbedBuilder } = require('discord.js');
const Genius = require('genius-lyrics');

module.exports = {
  DESCRIPTION: "Muestra las letras de la canción actual",
  ALIASES: "letras",
  async execute(client, message, args, prefix) {
    const queue = message.client.distube.getQueue(message);
    if (!queue) {
      const noQueueError = new EmbedBuilder()
        .setTitle(':x: No se encontró ninguna cola.')
        .setDescription('No hay canciones en la cola para mostrar las letras.')
        .setColor('Red');
      return message.channel.send({ embeds: [noQueueError] });
    }
    const song = queue.songs[0];
    const apiKey = 'a8iciZaVkN5o-yUefS96HnzlpgYdXrBWZrq6oridHysMNs9lwTeWPs8Ema4l4by8';
    const geniusClient = new Genius.Client(apiKey);
    try {
      const lyricsData = await geniusClient.songs.search(song.name);
      if (!lyricsData || !lyricsData[0]) {
        const noLyricsError = new EmbedBuilder()
          .setTitle(':x: No se encontraron letras.')
          .setDescription(`No se encontraron letras para la canción ${song.name}.`)
          .setColor('Red');
        return message.channel.send({ embeds: [noLyricsError] });
      }
      const lyrics = await lyricsData[0].getLyrics();
      if (!lyrics) {
        const noLyricsError = new EmbedBuilder()
          .setTitle(':x: No se encontraron letras.')
          .setDescription(`No se encontraron letras para la canción ${song.name}.`)
          .setColor('Red');
        return message.channel.send({ embeds: [noLyricsError] });
      }
      const lyricsEmbed = new EmbedBuilder()
        .setTitle(`Letras de ${song.name}`)
        .setDescription(lyrics)
        .setColor('Green');
      return message.channel.send({ embeds: [lyricsEmbed] });
    } catch (error) {
      console.error(error);
      const apiError = new EmbedBuilder()
        .setTitle(':x: Error al obtener las letras.')
        .setDescription('Ocurrió un error al intentar obtener las letras de la canción.')
        .setColor('Red');
      return message.channel.send({ embeds: [apiError] });
    }
  }
}
