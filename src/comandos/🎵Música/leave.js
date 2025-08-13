const {EmbedBuilder} = require ('discord.js');

module.exports = {
    DESCRIPTION: "Detiene la reproducción de canciones",

    async execute (client, message, args, prefix) {
        const queue = client.distube.getQueue(message);

        if (!queue) {
            const noQueueError = new EmbedBuilder()
              .setTitle(':x: No hay ninguna canción reproduciéndose')
              .setDescription('No puedo saltar a la siguiente canción si no hay ninguna reproduciéndose.')
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

        client.distube.stop(message);
        const disconnectedEmbed = new EmbedBuilder()
            .setTitle(':stop_button: Desconectado!')
            .setColor('Green');
        message.reply({ embeds: [disconnectedEmbed] });
    }
}