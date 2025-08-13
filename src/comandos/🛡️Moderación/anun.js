const {EmbedBuilder} = require ('discord.js');

module.exports = {
    DESCRIPTION: "Envia un anuncio por medio del bot.",
    PERMISSIONS: ["ManageMessages"],

    async execute (client, message, args, prefix) {
      const sayMessage = args.join(" ");
      message.channel.send({ 
        embeds: [
          new EmbedBuilder()
          .setTitle(`**ANUNCIO**`)
          .setDescription(`${sayMessage}`)
          .setColor('0x008f39')
          .setTimestamp()
                ]
            })
            return message.delete()
      }
}