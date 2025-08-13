const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  CMD: new SlashCommandBuilder()
    .setDescription('Mueves la canción a un punto específico en el tiempo.')
    .addStringOption(option => option.setName("minuto").setDescription("colocar la cancion en el minuto...").setRequired(false)),

  async execute(client, interaction) {
    const queue = client.distube.getQueue(message);

    if (!queue) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setTitle(':x: No hay ninguna canción reproduciéndose')
          .setDescription('No puedo mover a un punto específico si no hay ninguna canción reproduciéndose.')
          .setColor('Red')
        ]
      });
    }

    const time = args[0];
    if (!time || !/^\d+:\d{1,2}$/.test(time)) {
      return message.channel.send({
        embeds: [new EmbedBuilder()
          .setTitle(':x: Tiempo inválido')
          .setDescription('El tiempo debe estar en el formato `mm:ss`. Por ejemplo: `2:30` para mover a los 2 minutos y 30 segundos.')
          .setColor('Red')
        ]
      });
    }

    const [minutes, seconds] = time.split(':');
    const seekTime = parseInt(minutes) * 60 + parseInt(seconds);

    client.distube.seek(message, seekTime);

    const skippedMessage = new EmbedBuilder()
      .setTitle(`⏮️ Cambiando al ${time} ⏭`)
      .setColor('Blue');
    message.channel.send({ embeds: [skippedMessage] });
  }
};
