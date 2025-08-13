const {EmbedBuilder} = require("discord.js");

function errorEmbed(message) {
    return new EmbedBuilder()
        .setTitle('❌ **¡Error! no se pudo ejecutar el comando**')
        .setDescription(`${message}`)
        .setColor('Red');
}

module.exports = async (client, message) => {
    if (!message.guild || !message.channel || message.author.bot) return;

    if(!message.content.startsWith(process.env.PREFIX)) return;

    const ARGS = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const CMD = ARGS?.shift()?.toLowerCase();

    const COMANDO = client.commands.get(CMD) || client.commands.find(c => c.ALIASES && c.ALIASES.includes(CMD));

    console.log(`Comando -${COMANDO.NAME} ejecutado por ${message.author.tag}`);

    if(COMANDO){
        if(COMANDO.OWNER) {
            const DUEÑOS = process.env.OWNER_IDS.split(" ");
            if(!DUEÑOS.includes(message.author.id)) return message.reply({
                embeds: [
                new EmbedBuilder()
                    .setTitle('❌ **Solo el dueño del bot puede ejecutar este comando!**')
                    .setDescription(`**Dueño del bot: ${DUEÑOS.map(DUEÑO => `<@${DUEÑO}>**`).join(". ")}`)
                    .setColor('Red')
            ]
        })
        }

        if(COMANDO.BOT_PERMISSIONS) {
            if(!message.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return message.reply({
                embeds: [
                new EmbedBuilder()
                    .setTitle('❌ **Necesito los siguientes permisos para ejecutar este comando**')
                    .setDescription(`Permisos necesarios: ${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\`` ).join(". ")}`)
                    .setColor('Red')
            ]
        })
        }

        if(COMANDO.PERMISSIONS) {
            if(!message.member.permissions.has(COMANDO.PERMISSIONS)) return message.reply({
                embeds: [
                new EmbedBuilder()
                    .setTitle('❌ **Necesitas los siguientes permisos para ejecutar este comando**')
                    .setDescription(`Permisos necesarios: ${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\`` ).join(". ")}`)
                    .setColor('Red')
            ]
        })
        }

        try {
            COMANDO.execute(client, message, ARGS, process.env.PREFIX, errorEmbed);
        } catch (e){
            message.reply({embeds: [
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