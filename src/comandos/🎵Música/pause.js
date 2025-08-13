const {EmbedBuilder} = require ('discord.js');

module.exports = {
    DESCRIPTION: "Pausa la reprodución de la canción actual",
    ALIASES: "pausar",

    async execute (client, message, args, prefix) { 
        const queue = message.client.distube.getQueue(message);

        if (!queue) {
          const noQueueError = new EmbedBuilder()
            .setTitle(':x: No se encontró ninguna cola.')
            .setDescription('No hay canciones en la cola para pausar.')
            .setColor('Red');
          return message.channel.send({ embeds: [noQueueError] });
        }
    
        if (queue.paused) {
          const isPausedError = new EmbedBuilder()
            .setTitle(':x: Error al pausar la canción.')
            .setDescription('La canción ya se encuentra pausada.')
            .setColor('Red');
          return message.channel.send({ embeds: [isPausedError] });
        }
    
        message.client.distube.pause(message);
    
        const pausedEmbed = new EmbedBuilder()
          .setTitle(':pause_button: Canción pausada.')
          .setDescription(`La canción actual ha sido pausada por ${message.author}.`)
          .setColor('Blue');
        message.channel.send({ embeds: [pausedEmbed] });
      }
    }