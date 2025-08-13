const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  CMD: new SlashCommandBuilder()
    .setDescription('Activa o desactiva la repetición de las canciones o la cola de reproducción.')
    .addStringOption(option => option.setName("mode").setDescription("Modo de repetición").setRequired(false)
      .addChoices(
        { name: "Off", value: "off" },
        { name: "Song", value: "song" },
        { name: "Queue", value: "queue" },
      )
    ),

  async execute(client, interaction) {
    const queue = client.distube.getQueue(interaction);
    const input = interaction.options.getString("mode");

    if (!queue) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(':x: No hay ninguna canción reproduciéndose')
          .setDescription('No puedo activar o desactivar la repetición si no hay ninguna canción reproduciéndose.')
          .setColor('Red')
        ]
      });
    }

    const currentMode = queue.repeatMode;
    const modes = {
      0: '🔁 La repetición está desactivada',
      1: '🔂 La repetición de la canción está activada',
      2: '🔁 La repetición de la cola de reproducción está activada'
    };

    const mode = input
      ? ['off', 'song', 'queue'].includes(input.toLowerCase())
        ? input === 'off' ? 0 : input === 'song' ? 1 : 2
        : null
      : currentMode === 2 ? 0 : currentMode + 1;

    if (mode === null) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(':x: Argumento inválido')
          .setDescription('El argumento debe ser "off", "song" o "queue"')
          .setColor('Red')
        ]
      });
    }

    client.distube.setRepeatMode(interaction, mode);

    const updatedMode = queue.repeatMode;
    const repeatMessage = new EmbedBuilder()
      .setTitle(modes[updatedMode])
      .setColor('Blue');
    interaction.reply({ embeds: [repeatMessage] });
  }
}
