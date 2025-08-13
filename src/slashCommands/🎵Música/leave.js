const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription('Dejar de reproducir música.'),

    async execute (client, interaction) {
        const queue = client.distube.getQueue(interaction);

        if (!queue) {
            const noQueueError = new EmbedBuilder()
              .setTitle(':x: No hay ninguna canción reproduciéndose')
              .setDescription('No puedo saltar a la siguiente canción si no hay ninguna reproduciéndose.')
              .setColor('Red');
            return interaction.reply({ embeds: [noQueueError] });
          };
  
          if (!interaction.member.voice?.channel) {
            const notInVoiceChannelError = new EmbedBuilder()
              .setTitle(':x: No estás en un canal de voz')
              .setDescription('Para ejecutar este comando tienes que estar en un canal de voz.')
              .setColor('Red');
            return interaction.reply({ embeds: [notInVoiceChannelError] });
          };
  
          if (interaction.guild.members.me.voice?.channel && interaction.member.voice?.channel.id !== interaction.guild.members.me.voice?.channel.id) {
            const notInSameVoiceChannelError = new EmbedBuilder()
              .setTitle(':x: No estamos en el mismo canal de voz')
              .setDescription('Para ejecutar este comando tienes que estar en el mismo canal de voz que yo.')
              .setColor('Red');
            return interaction.reply({ embeds: [notInSameVoiceChannelError] });
          };

        client.distube.stop(interaction);
        const disconnectedEmbed = new EmbedBuilder()
            .setTitle(':stop_button: Desconectado!')
            .setColor('Green');
        interaction.reply({ embeds: [disconnectedEmbed] });
    }
}