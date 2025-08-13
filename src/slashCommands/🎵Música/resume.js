const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription('Continuar la reproducción de la canción.'),

    async execute (client, interaction) {
        const queue = interaction.client.distube.getQueue(interaction);

        if (!queue) {
            const noQueueError = new EmbedBuilder()
              .setTitle(':x: No se encontró ninguna cola.')
              .setDescription('No hay canciones en la cola para reanudar.')
              .setColor('Red');
            return interaction.reply({ embeds: [noQueueError] });
          }
      
          if (!queue.pause) {
            const isPlayingError = new EmbedBuilder()
              .setTitle(':x: Error al reanudar la canción.')
              .setDescription('No se puede reanudar porque la canción no está pausada.')
              .setColor('Red');
            return interaction.reply({ embeds: [isPlayingError] });
          }
      
          interaction.client.distube.resume(interaction);
      
          const resumedEmbed = new EmbedBuilder()
            .setTitle(':arrow_forward: Canción reanudada.')
            .setDescription(`La canción actual ha sido reanudada por ${interaction.member.displayName}.`)
            .setColor('Blue');
          interaction.reply({ embeds: [resumedEmbed] });
        },
      };