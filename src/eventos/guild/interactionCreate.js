const {EmbedBuilder} = require("discord.js");

function errorEmbedi(interaction) {
    return new EmbedBuilder()
        .setTitle('❌ **¡Error! no se pudo ejecutar el comando**')
        .setDescription(`${interaction}`)
        .setColor('Red');
}

module.exports = async (client, interaction) => {
    if(!interaction.guild || !interaction.channel) return;

    const COMANDO = client.slashCommands.get(interaction?.commandName);

    console.log(`Comando /${interaction.commandName} ejecutado por ${interaction.user.tag}`);

    if(COMANDO){
        if(COMANDO.OWNER) {
            const DUEÑOS = process.env.OWNER_IDS.split(" ");
            if(!DUEÑOS.includes(interaction.user.id)) return interaction.reply({
                embeds: [
                new EmbedBuilder()
                    .setTitle('❌ **Solo el dueño del bot puede ejecutar este comando!**')
                    .setDescription(`**Dueño del bot: ${DUEÑOS.map(DUEÑO => `<@${DUEÑO}>**`).join(". ")}`)
                    .setColor('Red')
            ]
        })
        }

        if(COMANDO.BOT_PERMISSIONS) {
            if(!interaction.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return interaction.reply({
                embeds: [
                new EmbedBuilder()
                    .setTitle('❌ **Necesito permisos para ejecutar este comando**')
                    .setDescription(`Permisos necesarios: ${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\`` ).join(". ")}`)
                    .setColor('Red')
            ]
        })
        }

        if(COMANDO.PERMISSIONS) {
            if(!interaction.member.permissions.has(COMANDO.PERMISSIONS)) return interaction.reply({
                embeds: [
                new EmbedBuilder()
                    .setTitle('❌ **Necesitas permisos para ejecutar este comando**')
                    .setDescription(`Permisos necesarios: ${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\`` ).join(". ")}`)
                    .setColor('Red')
            ]
        })
        }

        try {
            COMANDO.execute(client, interaction, errorEmbedi, "/");
        } catch (e){
            interaction.reply({embeds: [
                new EmbedBuilder()
                    .setTitle('❌ **Ha ocurrido un error al ejecutar el comando!**')
                    .setDescription('*Mira la consola para más detalles!.*')
                    .setColor('Red')
            ]
        });
            console.log(e)
            return;
        }
    }
}