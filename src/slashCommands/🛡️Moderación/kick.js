const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Kickea a cualquier usuario mencionado")
    .addUserOption(option => option.setName('usuario').setDescription('Usuario mencionado.').setRequired(true))
    .addStringOption(option => option.setName('razon').setDescription('Razon correspondiente.').setRequired(false)),
    PERMISSIONS: ["KickMembers"],

    async execute (client, interaction, errorEmbedi) {

        const authorcmd = interaction.user;
        const userkick = interaction.options.getUser(`usuario`);
        const reason = interaction.options.getString(`razon`) || "No ha especificado la razon";
        const member = await interaction.guild.members.fetch(userkick.id);

        const errorinteractions = [];

            if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                errorinteractions.push(`> ¡No se puede actuar sobre ${userkick.username} ya que tienen un rol superior!`);
            }

            if (userkick.id === client.user.id) {
                errorinteractions.push('> ¡No puedes kickearme!');
            }

            if (userkick.id === authorcmd.id) {
                errorinteractions.push('> ¡No puedes kickearte a ti mismo!');
            }

            if (errorinteractions.length > 0) {
                return interaction.reply({ embeds: [errorEmbedi(errorinteractions.join('\n\n'))] });
            }

        const embed2 = new EmbedBuilder()
            .setColor("Green")
            .setTitle(`:name_badge: Te han kickeado de: ${interaction.guild.name}`)
            .setDescription(`¡**${authorcmd.username}** te ha kickeado! \n\n **Razón:** ${reason}`)
            .setTimestamp()

        try {
            await userkick.send({ embeds: [embed2] });
            } catch (error) {
            return interaction.reply({ embeds: [errorEmbedi('¡No hay usuario mencionado!')] });
        }

        await member.kick(reason)

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle(":name_badge: Usuario kickeado correctamente :mechanical_leg:")
            .setDescription(`¡El usuario ha sido pateado con éxito! :x:`)
            .setTimestamp()
            .addFields(
                { name: `Usuario`, value: `${userkick}`, inline: true },
                { name: `Razón`, value: `${reason}`, inline: true },
                { name: "Moderador", value: `${authorcmd}`, inline: true },
            )

        await interaction.reply({ embeds: [embed] })

    }
}