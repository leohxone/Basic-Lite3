const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Remueve una canción de la lista.")
    .addIntegerOption(option => option.setName('numero').setDescription('El número de lista de la canción que quieres eliminar').setRequired(true)),

  async execute(client, interaction) {
    const queue = client.distube.getQueue(interaction);
    const amount = interaction.options.getInteger('cantidad');

    if (!queue) {
      const noQueueError = new EmbedBuilder()
        .setTitle(':x: No hay ninguna canción reproduciéndose')
        .setDescription('No puedo remover una canción si no hay ninguna reproduciéndose.')
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

    if (amount > queue.songs.length || amount < 1) {
      const outOfRangeError = new EmbedBuilder()
        .setTitle(':x: El número especificado está fuera del rango de canciones')
        .setDescription(`El rango válido es del 1 al ${queue.songs.length}.`)
        .setColor('Red');
      return interaction.reply({ embeds: [outOfRangeError] });
    }

    const removedSong = queue.songs.splice(amount - 1, 1);
    const successinteraction = new EmbedBuilder()
        .setTitle(`:white_check_mark: ¡La canción "${removedSong.name}" ha sido removida! :wastebasket:`)
        .setColor('Green');
      interaction.reply({ embeds: [successinteraction] });
  }
}