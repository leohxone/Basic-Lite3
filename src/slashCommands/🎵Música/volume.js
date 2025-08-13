const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Modifica el volumen del bot")
    .addIntegerOption(option => option.setName('porcentaje').setDescription('% de volumen del bot.').setRequired(true)),

  async execute(client, interaction) {
    const queue = client.distube.getQueue(interaction);
    const amount = interaction.options.getInteger('porcentaje');

    if (!queue) {
      const noQueueError = new EmbedBuilder()
        .setTitle(':x: No hay ninguna canción reproduciéndose')
        .setDescription('No puedo ajustar el volumen si no hay ninguna reproduciéndose.')
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

    const currentVolume = queue.volume;

    if (!amount) {
      const currentVolumeinteraction = new EmbedBuilder()
        .setTitle(`🔊 El volumen actual es ${currentVolume}%`)
        .setColor('Blue');
      return interaction.reply({ embeds: [currentVolumeinteraction] });
    }

    if (isNaN(amount) || amount < 0 || amount > 200) {
      const invalidArgsError = new EmbedBuilder()
        .setTitle(':x: El argumento no es un número válido')
        .setDescription(`Especifica el volumen en un número entre 0 y 200.\nEjemplo: /volume 50`)
        .setColor('Red');
      return interaction.reply({ embeds: [invalidArgsError] });
    }

    client.distube.setVolume(interaction, amount);
    const successinteraction = new EmbedBuilder()
      .setTitle(`🔊 Ajustando el volumen a ${amount}%`)
      .setColor('Blue');
    interaction.reply({ embeds: [successinteraction] });
  },
};