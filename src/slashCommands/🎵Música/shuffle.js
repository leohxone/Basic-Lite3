const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  CMD: new SlashCommandBuilder()
  .setDescription('Ver la duración de la canción actual.'),

  async execute (client, interaction) {
    const queue = interaction.client.distube.getQueue(interaction);

    if (!queue) {
      return interaction.channel.send({
        embeds: [new EmbedBuilder()
          .setTitle(':x: No hay ninguna canción reproduciéndose')
          .setDescription('No puedo mezclar la lista de reproducción si no hay ninguna canción reproduciéndose.')
          .setColor('Red')
        ]
      });
    }

    client.distube.shuffle(interaction);

    const shuffleinteraction = new EmbedBuilder()
      .setTitle('🔀 La lista de reproducción ha sido mezclada')
      .setColor('Blue');
    interaction.channel.send({ embeds: [shuffleinteraction] });
  }
}