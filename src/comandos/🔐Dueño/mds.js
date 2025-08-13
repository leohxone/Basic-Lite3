const {EmbedBuilder} = require ('discord.js');

module.exports = {
    DESCRIPTION: "Envia un mensaje privado a un usuario",
    ALIASES: "md",
    OWNER: true,
    
    async execute (client, message, args, prefix, errorEmbed) {
        
        const user = message.mentions.members.first() || message.guild.members.cache.get(userID)
        const ingreso = args.slice().join(" ")
        const mensaje = ingreso.replace(user, "");

        message.delete();
        if(!mensaje) return message.reply({ embeds: [errorEmbed("Es necesario un texto.")] });

        if(!user) return message.reply({ embeds: [errorEmbed("Es necesario una mención del usuario al que se le quiera enviar el md.")] });

        user.send({
            embeds: [
                new EmbedBuilder()
                .setTitle('**Te ha llegado un md!** :envelope_with_arrow:')
                .setDescription(`> **${mensaje}**`)
                .setColor('Blue')
                .setTimestamp()
                .setFooter({ text: `Enviado por: ${message.author.tag} `})
        ]})

        await message.channel.send({ 
            embeds: [
                new EmbedBuilder()
                .setTitle(':incoming_envelope: **Mensaje enviado con éxito!**')
                .setDescription(`> Mensaje enviado a ${user}. :white_check_mark:`)
                .setColor('Green')
                .setTimestamp()
        ]})
    }
}