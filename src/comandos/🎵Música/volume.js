const { EmbedBuilder } = require('discord.js');

module.exports = {
  DESCRIPTION: "Ajusta el volumen de la música",
  ALIASES: ["volumen", "vol"],

  async execute(client, message, args, prefix) {
    const queue = client.distube.getQueue(message);

    if (!queue) {
      const noQueueError = new EmbedBuilder()
        .setTitle(':x: No hay ninguna canción reproduciéndose')
        .setDescription('No puedo ajustar el volumen si no hay ninguna reproduciéndose.')
        .setColor('Red');
      return message.channel.send({ embeds: [noQueueError] });
    };

    if (!message.member.voice?.channel) {
      const notInVoiceChannelError = new EmbedBuilder()
        .setTitle(':x: No estás en un canal de voz')
        .setDescription('Para ejecutar este comando tienes que estar en un canal de voz.')
        .setColor('Red');
      return message.channel.send({ embeds: [notInVoiceChannelError] });
    };

    if (message.guild.members.me.voice?.channel && message.member.voice?.channel.id !== message.guild.members.me.voice?.channel.id) {
      const notInSameVoiceChannelError = new EmbedBuilder()
        .setTitle(':x: No estamos en el mismo canal de voz')
        .setDescription('Para ejecutar este comando tienes que estar en el mismo canal de voz que yo.')
        .setColor('Red');
      return message.channel.send({ embeds: [notInSameVoiceChannelError] });
    };

    const currentVolume = queue.volume;
    const requestedVolume = args[0] ? parseInt(args[0], 10) : null;

    if (!requestedVolume) {
      const currentVolumeMessage = new EmbedBuilder()
        .setTitle(`🔊 El volumen actual es ${currentVolume}%`)
        .setColor('Blue');
      return message.channel.send({ embeds: [currentVolumeMessage] });
    }

    if (isNaN(requestedVolume) || requestedVolume < 0 || requestedVolume > 200) {
      const invalidArgsError = new EmbedBuilder()
        .setTitle(':x: El argumento no es un número válido')
        .setDescription(`Especifica el volumen en un número entre 0 y 200.\nEjemplo: ${process.env.PREFIX}volumen 50`)
        .setColor('Red');
      return message.channel.send({ embeds: [invalidArgsError] });
    }

    client.distube.setVolume(message, requestedVolume);
    const successMessage = new EmbedBuilder()
      .setTitle(`🔊 Ajustando el volumen a ${requestedVolume}%`)
      .setColor('Blue');
    message.channel.send({ embeds: [successMessage] });
  },
};