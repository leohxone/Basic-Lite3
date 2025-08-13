const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Sirve para ver el ping del bot"),

    async execute(client, interaction){
        const pingEmbed1 = new EmbedBuilder()
        .setTitle("Calculando... :hourglass_flowing_sand:")
        .setColor("#fb644c");

        const pingMsg = await interaction.reply({ embeds: [pingEmbed1], fetchReply: true });

        const pingEmbed2 = new EmbedBuilder()
        .setTitle(':ping_pong:  Pong!')
        .setDescription(
        `⌛ **Latencia:** \`${Math.floor(
        pingMsg.createdTimestamp - interaction.createdTimestamp,
        )}ms\`\n⏲️ **Bot:** \`${Math.round(client.ws.ping)}ms\``,
        )
        .setFooter({
        text: `Pedido por: ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
  })
        .setColor('Green');
        await pingMsg.edit({ embeds: [pingEmbed2] });
    }
}