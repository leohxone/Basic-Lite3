const {EmbedBuilder} = require('discord.js');

module.exports = {
    DESCRIPTION: "Elimina mensajes en un canal.",
    ALIASES: "delete",
    PERMISSIONS: ["ManageMessages"],

    async execute (client, message, args, prefix, errorEmbed) {

        let amount = parseInt(args[0]);
        const channel = message.channel;
        
        if (!amount) return await message.reply({ embeds: [errorEmbed('¡Por favor especifica la cantidad de mensajes que quieres eleminar!')] });

        if (isNaN(amount) || amount < 1 || amount > 100) return await message.reply({ embeds: [errorEmbed('¡Por favor utiliza números del 1 al 100!')] });

        try {
            const messages = await channel.messages.fetch({ limit: amount });
            await channel.bulkDelete(messages);
            await channel.send({
              embeds: [
                new EmbedBuilder()
                  .setTitle(":white_check_mark: Mensajes borrados con éxito")
                  .setDescription(`Se han eliminado ${amount} mensajes en este canal.`)
                  .setColor("Blue"),
              ],
            }).then((msg) => setTimeout(() => msg.delete(), 5000));
          } catch (error) {
            await message.reply({ embeds: [errorEmbed("Ha ocurrido un error al intentar eliminar los mensajes.")] });
          }
        },
      };