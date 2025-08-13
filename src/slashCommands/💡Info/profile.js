const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Muestra información sobre un usuario.")
    .addUserOption(option => option.setName('usuario').setDescription('Usuario mencionado').setRequired(false)),

    async execute (client, interaction) {

    const authorcmd = interaction.user;
    const target = interaction.options.getUser(`usuario`) || authorcmd;
    const member = interaction.guild.members.cache.get(target.id);
    await target.fetch({ force: true}); //Banner

    const filteredRoles = member.roles.cache.filter(role => role.id != interaction.guild.id);
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
    .setFooter({ text:`Pedido por ${authorcmd.tag}`, iconURL: authorcmd.displayAvatarURL() });
    
    interaction.reply({ embeds: [embed] });
    }
}