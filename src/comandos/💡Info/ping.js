const {EmbedBuilder} = require ('discord.js');

module.exports = {
    DESCRIPTION: "Sirve para ver el ping del bot",

    async execute(client, message, args, prefix){
        const pingEmbed1 = new EmbedBuilder()
        .setTitle("Calculando... :hourglass_flowing_sand:")
        .setColor("#fb644c");

        const pingMsg = await message.channel.send({ embeds: [pingEmbed1], fetchReply: true });

        const pingEmbed2 = new EmbedBuilder()
        .setTitle(':ping_pong:  Pong!')
        .setDescription(
        `⌛ **Latencia:** \`${Math.floor(
        pingMsg.createdTimestamp - message.createdTimestamp,
        )}ms\`\n⏲️ **Bot:** \`${Math.round(client.ws.ping)}ms\``,
        )
        .setFooter({
        text: `Pedido por: ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL(),
  })
        .setColor('Green');
        await pingMsg.edit({ embeds: [pingEmbed2] });
    }
}