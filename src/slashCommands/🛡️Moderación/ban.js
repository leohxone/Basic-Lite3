const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Banea a cualquier usuario mencionado")
    .addUserOption(option => option.setName('usuario').setDescription('Usuario mencionado.').setRequired(true))
    .addStringOption(option => option.setName('razon').setDescription('Razon correspondiente.').setRequired(false)),
    PERMISSIONS: ["BanMembers"],

    async execute (client, interaction, errorEmbedi) {

        const authorcmd = interaction.user;
        const userban = interaction.options.getUser(`usuario`);
        const reason = interaction.options.getString(`razon`) || "No ha especificado la razon";
        const member = await interaction.guild.members.fetch(userban.id);
        
        const errorinteractions = [];

            if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                errorinteractions.push(`> ¡No se puede actuar sobre ${userban.username} ya que tienen un rol superior!`);
            }

            if (userban.id === client.user.id) {
                errorinteractions.push('> ¡No puedes banearme!');
            }

            if (userban.id === authorcmd.id) {
                errorinteractions.push('> ¡No puedes banearte a ti mismo!');
            }

            if (errorinteractions.length > 0) {
                return interaction.reply({ embeds: [errorEmbedi(errorinteractions.join('\n\n'))] });
            }

        const embed2 = new EmbedBuilder()
            .setColor("Red")
            .setTitle(`:name_badge: Te han baneado de: ${interaction.guild.name}`)
            .setDescription(`¡**${authorcmd.username}** te ha baneado! \n\n **Razón:** ${reason}`)
            .setTimestamp()

        try {
            await userban.send({ embeds: [embed2] });
        } catch (error) {
            return interaction.reply({ embeds: [errorEmbedi('¡No hay usuario mencionado!')] });
        }

        await member.ban({ reason: reason });

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle(":name_badge: Usuario baneado correctamente :hammer:")
            .setDescription(`¡El usuario ha sido baneado con exito! :white_check_mark:`)
            .setTimestamp()
            .addFields(
                { name: `Usuario`, value: `${userban}`, inline: true },
                { name: `Razón`, value: `${reason}`, inline: true },
                { name: "Moderador", value: `${authorcmd}`, inline: true },
            )

        await interaction.reply({ embeds: [embed] })

    }
}