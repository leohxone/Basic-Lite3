const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription('Pausar la reproducción de la canción.'),

    async execute (client, interaction) {
        const queue = interaction.client.distube.getQueue(interaction);

        if (!queue) {
          const noQueueError = new EmbedBuilder()
            .setTitle(':x: No se encontró ninguna cola.')
            .setDescription('No hay canciones en la cola para pausar.')
            .setColor('Red');
          return interaction.reply({ embeds: [noQueueError] });
        }
    
        if (queue.paused) {
          const isPausedError = new EmbedBuilder()
            .setTitle(':x: Error al pausar la canción.')
            .setDescription('La canción ya se encuentra pausada.')
            .setColor('Red');
          return interaction.reply({ embeds: [isPausedError] });
        }
    
        interaction.client.distube.pause(interaction);
    
        const pausedEmbed = new EmbedBuilder()
          .setTitle(':pause_button: Canción pausada.')
          .setDescription(`La canción actual ha sido pausada por ${interaction.member.displayName}.`)
          .setColor('Blue');
        interaction.reply({ embeds: [pausedEmbed] });
      }
    }