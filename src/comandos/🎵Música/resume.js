const {EmbedBuilder} = require ('discord.js');

module.exports = {
    DESCRIPTION: "Reanuda la canción pausada actualmente.",
    ALIASES: "Reanudar",

    async execute (client, message, args, prefix) { 
        const queue = message.client.distube.getQueue(message);

        if (!queue) {
            const noQueueError = new EmbedBuilder()
              .setTitle(':x: No se encontró ninguna cola.')
              .setDescription('No hay canciones en la cola para reanudar.')
              .setColor('Red');
            return message.channel.send({ embeds: [noQueueError] });
          }
      
          if (!queue.pause) {
            const isPlayingError = new EmbedBuilder()
              .setTitle(':x: Error al reanudar la canción.')
              .setDescription('No se puede reanudar porque la canción no está pausada.')
              .setColor('Red');
            return message.channel.send({ embeds: [isPlayingError] });
          }
      
          message.client.distube.resume(message);
      
          const resumedEmbed = new EmbedBuilder()
            .setTitle(':arrow_forward: Canción reanudada.')
            .setDescription(`La canción actual ha sido reanudada por ${message.author}.`)
            .setColor('Blue');
          message.channel.send({ embeds: [resumedEmbed] });
        },
      };