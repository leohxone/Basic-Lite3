const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const ms = require('ms');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Mute a cualquier usuario mencionado.")
    .addUserOption(option => option.setName('usuario').setDescription('Usuario mencionado.').setRequired(true))
    .addStringOption(option => option.setName('tiempo').setDescription('Tiempo de restricción.').setRequired(true))
    .addStringOption(option => option.setName('razon').setDescription('Razon correspondiente.').setRequired(false)),
    PERMISSIONS: ["MuteMembers"],

    async execute (client, interaction, errorEmbedi) {

    const authorcmd = interaction.user;
    const usermute = interaction.options.getUser(`usuario`);
    const member = await interaction.guild.members.fetch(usermute.id);
    const settime = interaction.options.getString('tiempo');
    const razon = interaction.options.getString(`razon`) || "No ha especificado la razon";

    const errorinteractions = [];

            if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                errorinteractions.push(`> ¡No se puede actuar sobre ${usermute.username} ya que tienen un rol superior!`);
            }

            if (usermute.id === client.user.id) {
                errorinteractions.push('> ¡No puedo silenciarme a mí mismo!');
            }

            if (usermute.id === authorcmd.id) {
                errorinteractions.push('> ¡No puedes silenciarte a ti mismo!');
            }

            if (!member){
                errorinteractions.push('> ¡No he encontrado a ese miembro!');
            }

            if (member.isCommunicationDisabled()){
                errorinteractions.push('> ¡Ese miembro ya esta asilado!');
            }

            if (!settime) {
                errorinteractions.push('> ¡No se ha especificado un tiempo válido!');
            } else {
                const muteTime = ms(settime);

                if (!muteTime) {
                    errorinteractions.push('> ¡No se ha especificado un tiempo válido!');
                } else {
                    await member.timeout(muteTime, razon);
                }
            }

            if (errorinteractions.length > 0) {
                return interaction.reply({ embeds: [errorEmbedi(errorinteractions.join('\n\n'))] });
            }

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle(`:name_badge: Usuario muteado correctamente :mute:`)
            .setDescription(`¡El usuario ha sido aislado con éxito! :white_check_mark:`)
            .setTimestamp()
            .addFields(
              { name: "Usuario", value: `${usermute}`, inline: true },
              { name: "Tiempo", value: `${settime}`, inline: true },
              { name: "Razón", value: `${razon}`, inline: true },
              { name: "Moderador", value: `${authorcmd}`, inline: true },
        );

        await interaction.reply({ embeds: [embed] });
    }
}