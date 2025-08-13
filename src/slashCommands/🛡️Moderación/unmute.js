const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Mute a cualquier usuario mencionado.")
    .addUserOption(option => option.setName('usuario').setDescription('Usuario mencionado.').setRequired(true)),
    PERMISSIONS: ["MuteMembers"],

    async execute (client, interaction, errorEmbedi) {

    const authorcmd = interaction.user;
    const userunmute = interaction.options.getUser(`usuario`);
    const member = await interaction.guild.members.fetch(userunmute.id);

    const errorinteractions = [];

        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            errorinteractions.push(`> ¡No se puede actuar sobre ${userunmute.username} ya que tienen un rol superior!`);
        }

        if (userunmute.id === client.user.id) {
            errorinteractions.push('> ¡No puedo silenciarme a mí mismo!');
        }

        if (userunmute.id === authorcmd.id) {
            errorinteractions.push('> ¡No puedes silenciarte a ti mismo!');
        }

        if (!member){
            errorinteractions.push('> ¡No he encontrado a ese miembro!');
        }

        if (errorinteractions.length > 0) {
            return interaction.reply({ embeds: [errorEmbedi(errorinteractions.join('\n\n'))] });
        }

    if (member.isCommunicationDisabled()) {
        await member.timeout(null);
    } else {
        return interaction.reply({ embeds: [errorEmbedi('¡Este miembro no se encuentra asilado!')] });
    }

    const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(`:white_check_mark: Usuario desmuteado correctamente :loud_sound:`)
        .setDescription(`Se ha removido el aislante con éxito! :white_check_mark:`)
        .setTimestamp()
        .addFields(
          { name: "Usuario", value: `${userunmute}`, inline: true },
          { name: "Moderador", value: `${authorcmd}`, inline: true },
    );

    await interaction.reply({ embeds: [embed] });
}
}