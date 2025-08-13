const {EmbedBuilder} = require ('discord.js');

module.exports = {
    DESCRIPTION: "Sirve para reproducir una canción",
    ALIASES: "p",

    async execute (client, message, args, prefix) { 
        const songName = args.join(' ');

        if (!songName) {
          const noSongNameError = new EmbedBuilder()
            .setTitle(':x: No se especificó ninguna canción.')
            .setDescription('¡Especifica el nombre de una canción para reproducir!')
            .setColor('Red');
        return message.channel.send({ embeds: [noSongNameError] });
        };

        if (!message.member.voice.channel) {
            const noVoiceChannelError = new EmbedBuilder()
            .setTitle(':x: No estás en un canal de voz.')
            .setDescription('Debes estar en un canal de voz para reproducir música.')
            .setColor('Red');
        return message.channel.send({ embeds: [noVoiceChannelError] });
        };

        if (message.guild.members.me.voice?.channel && message.member.voice?.channel.id != message.guild.members.me.voice?.channel.id) {
            const differentVoiceChannelError = new EmbedBuilder()
            .setTitle(':x: Estás en un canal de voz diferente al mío.')
            .setDescription('Debes estar en el mismo canal de voz que yo para reproducir música.')
            .setColor('Red');
        return message.channel.send({ embeds: [differentVoiceChannelError] });
        };

        client.distube.play(message.member.voice?.channel, songName, {
            member: message.member,
            textChannel: message.channel,
            message
        });
        message.reply(`🔎 **Buscando \`${songName}\`...**`);
    }
}