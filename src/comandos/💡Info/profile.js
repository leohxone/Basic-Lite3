const {EmbedBuilder} = require ('discord.js');

module.exports = {
    DESCRIPTION: "Muestra información sobre un usuario.",
    ALIASES: "perfil",

    async execute (client, message, args, prefix) {
    const authorcmd = message.author;
    const target = message.mentions.users.first() || authorcmd;
    const member = message.guild.members.cache.get(target.id);
    await target.fetch({ force: true}); // Banner

    const filteredRoles = member.roles.cache.filter(role => role.id != message.guild.id);
    const listedRoles = filteredRoles.sort((a, b) => b.position - a.position).map(role => role.toString());
    
    const embed = new EmbedBuilder()
    .setColor('Blue')
    .setAuthor({ name: `${target.username}`, iconURL: `${target.displayAvatarURL({dynamic: true})}`})
    .setThumbnail(`${target.displayAvatarURL({dynamic: true})}`)
    .setImage(target.bannerURL({ size: 512}))
    .addFields(
        {
            name: `Información General`, 
            value: `**ID:** ${target.id} \n **Nametag:** ${target.tag}`
        },
        {
            name: `Cuenta Creada`, 
            value: `<t:${parseInt(target.createdTimestamp / 1000)}:R>`, 
            inline: true
        },
        {
            name: `Se unió al Servidor`, 
            value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, 
            inline: true
        },
        {
            name: `Roles en el Servidor`, 
            value: `${listedRoles.join(", ")}`
        },
        {
            name: `Banner del Usuario`, 
            value: target.bannerURL() ? "** **" : "Este Usuario no tiene un Banner."
        },
    )
    .setFooter({ text:`Pedido por ${message.author.tag}`, iconURL: authorcmd.displayAvatarURL() });
    
    message.channel.send({ embeds: [embed] });
    }
}