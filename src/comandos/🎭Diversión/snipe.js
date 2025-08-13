const { EmbedBuilder } = require('discord.js');

module.exports = {
  DESCRIPTION: "Muestra el último mensaje eliminado en el canal.",

  snipedMessages: new Map(),

  async execute(client, message, args, prefix, errorEmbed) {
    const channel = message.channel;

    if (!this.snipedMessages.has(channel.id)) {
      return await message.reply({ embeds: [errorEmbed("No hay mensajes para mostrar en este canal.")] });
    }

    const snipedMessage = this.snipedMessages.get(channel.id);

    const embed = new EmbedBuilder()
      .setTitle("Último mensaje eliminado:")
      .setDescription(snipedMessage.content)
      .setFooter(`Autor: ${snipedMessage.author} | Fecha: ${new Date(snipedMessage.timestamp).toLocaleString()}`)
      .setColor("Blue");

    await message.channel.send({ embeds: [embed] });
  },

  onMessageDelete(message) {
    this.snipedMessages.set(message.channel.id, {
      content: message.content,
      author: message.author.tag,
      timestamp: message.createdTimestamp,
    });
  },
};
