const {EmbedBuilder} = require ('discord.js');

module.exports = {
    DESCRIPTION: "Envia un mensaje por medio del bot.",

    async execute (client, message, args, prefix) {
      const sayMessage = args.join(" ");
      message.channel.send({ 
        embeds: [
          new EmbedBuilder()
          .setTitle('Mensaje:')
          .setDescription(`${sayMessage}`)
          .setColor('0x119ad9')
          .setTimestamp()
          .setFooter({ text: `Enviado por: ${message.author.username} `})
                ]
            })
            return message.delete()
      }
}