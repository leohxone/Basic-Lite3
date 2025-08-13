const { EmbedBuilder } = require('discord.js');

module.exports = {
  DESCRIPTION: "Mezcla la lista de reproducción",
  ALIASES: ["shuffle"],

  async execute(client, message, args) {
    const queue = client.distube.getQueue(message);

    if (!queue) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setTitle(':x: No hay ninguna canción reproduciéndose')
          .setDescription('No puedo mezclar la lista de reproducción si no hay ninguna canción reproduciéndose.')
          .setColor('Red')
        ]
      });
    }

    client.distube.shuffle(message);

    const shuffleMessage = new EmbedBuilder()
      .setTitle('🔀 La lista de reproducción ha sido mezclada')
      .setColor('Blue');
    message.channel.send({ embeds: [shuffleMessage] });
  }
}