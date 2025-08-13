const { DisTube } = require('distube');
const { YouTubePlugin } = require('@distube/youtube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    console.log(`(!) Cargando Modulo de Música`.red)

    client.distube = new DisTube(client, {
        emitNewSongOnly: false,
        savePreviousSongs: true,
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false,
        nsfw: false,
        plugins: [
            new SpotifyPlugin({
                api: {
                    topTracksCountry: "US",
                },
            }),
            new SoundCloudPlugin(),
            new YouTubePlugin(),
        ],
    });

    client.distube.on("playSong", (queue, song) => {
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
            .setTitle(`Reproduciendo \`${song.name}\` - \`${song.formattedDuration}\``)
            .setThumbnail(song.thumbnail)
            .setURL(song.url)
            .setColor(process.env.COLOR)
            .setFooter({text: `Añadida por ${song.user.tag}`, iconURL: song.user.displayAvatarURL({dynamic: true})})
            ]
        })
    })

    client.distube.on("addSong", (queue, song) => {
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
            .setTitle(`✅ Añadido \`${song.name}\` - \`${song.formattedDuration}\``)
            .setThumbnail(song.thumbnail)
            .setURL(song.url)
            .setColor(process.env.COLOR)
            .setFooter({text: `Añadida por ${song.user.tag}`, iconURL: song.user.displayAvatarURL({dynamic: true})})
            ]
        })
    });

    client.distube.on("initQueue", (queue) => {
        queue.autoplay = true;
    });

    client.distube.on("error", (e, queue, song) => {
        if (queue) {
            queue.textChannel.send(`An error encountered: ${e}`);
        } else {
            console.error(e);
        }
    });

    client.distube.on("finish", (queue) => {
        queue.voice.leave(); 
    });

    client.distube.on("empty", (queue) => {
        queue.voice.leave();  
    });

    client.distube.on("stop", (queue) => {
        queue.voice.leave();  
    });
};
