const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Desbanea a cualquier usuario usando su id")
    .addStringOption(option => option.setName('userid').setDescription('Id del usuario.').setRequired(true)),
    PERMISSIONS: ["BanMembers"],

    async execute(client, interaction, errorEmbedi) {

        const authorcmd = interaction.user;
        const userId = interaction.options.getString(`userid`);

        if (isNaN(userId))
            return interaction.channel.send({ embeds: [errorEmbedi('Debes proporcionar un ID de usuario válido.')] });

        const bans = await interaction.guild.bans.fetch();
        const bannedUser = bans.get(userId);

        if (!bannedUser)
            return interaction.channel.send({ embeds: [errorEmbedi('El usuario con el ID proporcionado no está baneado.')] });

        const embed2 = new EmbedBuilder()
            .setColor("Green")
            .setTitle(`:name_badge: Has sido desbaneado de: ${interaction.guild.name}`)
            .setDescription(`¡**${authorcmd.username}** te ha desbaneado!`)
            .setTimestamp();

        try {
            await interaction.guild.members.unban(bannedUser.user.id);
            await client.users.cache.get(bannedUser.user.id).send({ embeds: [embed2] });
        } catch (error) {
            return interaction.reply({ embeds: [errorEmbedi('Ha ocurrido un error al intentar desbanear al usuario.')] });
        }

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle(":white_check_mark: Usuario desbaneado correctamente :scales:")
            .setDescription(`¡El usuario ha sido desbaneado con éxito!`)
            .setTimestamp()
            .addFields(
                { name: `Usuario`, value: `<@${userId}>`, inline: true },
                { name: `Moderador`, value: `${authorcmd.username}`, inline: true },
            );

        await interaction.reply({ embeds: [embed] });
    }
}
