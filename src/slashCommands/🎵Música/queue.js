const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder} = require ('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription('Ver lista de reproducción.'),

    async execute (client, interaction, errorEmbedi) { 

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ embeds: [errorEmbedi(`¡No hay ninguna canción reproduciéndose!`)] });
        if (!interaction.member.voice?.channel) return interaction.reply({ embeds: [errorEmbedi(`¡Tienes que estar en un canal de voz para ejecutar este comando!`)] });
        if (interaction.guild.members.me.voice?.channel && interaction.member.voice?.channel.id != interaction.guild.members.me.voice?.channel.id) return interaction.reply({ embeds: [errorEmbedi(`¡Tienes que estar en el mismo canal de voz para ejecutar este comando!`)] });

        let listaqueue = []; 
        var maximascanciones = 10; 
        
        for (let i = 0; i < queue.songs.length; i += maximascanciones) {
            let canciones = queue.songs.slice(i, i + maximascanciones);
            listaqueue.push(canciones.map((cancion, index) => `**\`${i + ++index}\`** - [\`${cancion.name}\`](${cancion.url})`).join("\n "));
        }

        var limite = listaqueue.length;
        var embeds = [];
        
        for (let i = 0; i < limite; i++) {
            let desc = String(listaqueue[i]).substring(0, 2048); 
            
            let embed = new EmbedBuilder()
                .setTitle(`🎶 Cola de ${interaction.guild.name} - \`[${queue.songs.length} ${queue.songs.length > 1 ? "Canciones" : "Canción"}]\``)
                .setColor("#8400ff")
                .setDescription(desc)
            
            if (queue.songs.length > 1) embed.addFields([{name: `💿 Canción Actual`, value: `**[\`${queue.songs[0].name}\`](${queue.songs[0].url})**`}, ])
            await embeds.push(embed)
        }
        return paginacion();

        
        async function paginacion() {
            let paginaActual = 0;
            
            if (embeds.length === 1) return interaction.reply({ embeds: [embeds[0]] }).catch(() => { });
            
            let boton_atras = new ButtonBuilder().setStyle('Success').setCustomId('Atrás').setEmoji('929001012176507040').setLabel('Atrás')
            let boton_inicio = new ButtonBuilder().setStyle('Danger').setCustomId('Inicio').setEmoji('🏠').setLabel('Inicio')
            let boton_avanzar = new ButtonBuilder().setStyle('Success').setCustomId('Avanzar').setEmoji('929001012461707335').setLabel('Avanzar')
            
            let embedpaginas = await interaction.reply({
                content: `**Haz click en los __Botones__ para cambiar de páginas**`,
                embeds: [embeds[0].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })],
                components: [new ActionRowBuilder().addComponents([boton_atras, boton_inicio, boton_avanzar])]
            });
            
            const collector = embedpaginas.createMessageComponentCollector({ filter: i => i?.isButton() && i?.user && i?.user.id == interaction.user.id && i?.interaction.user.id == client.user.id, time: 180e3 });
            
            collector.on("collect", async b => {
                
                if (b?.user.id !== interaction.user.id) return b?.reply({ embeds: [errorEmbedi(`¡Solo la persona que ha escrito \`/queue\` puede cambiar de páginas!`)] });

                switch (b?.customId) {
                    case "Atrás": {
                        
                        collector.resetTimer();
                        
                        if (paginaActual !== 0) {
                            
                            paginaActual -= 1
                            
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        } else {
                            
                            paginaActual = embeds.length - 1
                            
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        }
                    }
                        break;

                    case "Inicio": {
                        
                        collector.resetTimer();
                        
                        paginaActual = 0;
                        await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                        await b?.deferUpdate();
                    }
                        break;

                    case "Avanzar": {
                        
                        collector.resetTimer();
                        
                        if (paginaActual < embeds.length - 1) {
                            
                            paginaActual++
                            
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        
                        } else {
                            
                            paginaActual = 0
                            
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        }
                    }
                        break;

                    default:
                        break;
                }
            });
            collector.on("end", () => {
                
                embedpaginas.components[0].components.map(boton => boton.disabled = true)
                embedpaginas.edit({content: `El tiempo ha expirado! escribe de nuevo \`/queue para volver a ver la cola de canciones!\``, embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
            });
        }
    }


}