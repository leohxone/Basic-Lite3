const {SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Muestra información sobre el servidor."),

    async execute (client, interaction) {
        const { guild } = interaction;

        const {
            createdTimestamp,
            ownerId,
            description,
            members,
            memberCount,
            channels,
        } = guild;

        await guild.members.fetch();
        
        const botcount = guild.members.cache.filter((member) => member.user.bot).size;
        const getChannelTypeSize = (type) => channels.cache.filter((channel) => type.includes(channel.type)).size;

        const totalChannels = getChannelTypeSize([
            ChannelType.GuildText,
            ChannelType.GuildVoice,
            ChannelType.GuildStageVoice,
            ChannelType.GuildPublicThread,
            ChannelType.GuildPrivateThread,
            ChannelType.GuildForum,
            ChannelType.GuildNews,
            ChannelType.GuildCategory,
            ChannelType.GuildNewsThread,
        ]);

        const embed = new EmbedBuilder()
        .setColor(`Green`)
        .setImage(guild.bannerURL({size: 1024}))
        .setAuthor({name: guild.name, inconURL: guild.iconURL({dynamic: true})})
        .setThumbnail(guild.iconURL({dynamic: true}))
        .setFields(
            {
                name: `📜 **| Descripcion**`, 
                value: [`> ${guild.description || "No disponible."}`].join("\n"),
            },
            {
                name: `📘 **| Información General**`,
                value: [
                    `> 📃 **Nombre:** ${guild.name}`,
                    `> 🪪 **ID:** ${guild.id}`,
                    `> 📆 **Creado:** <t:${parseInt(createdTimestamp / 1000)}:R>`,
                    `> 👑 **Dueño:** <@${ownerId}>`,
                    `> 🔗 **URL:** ${guild.vanityURLCode || "No disponible."}`,
            ].join(`\n`),
            },
            {
                name: `👥 **| Miembros** (${guild.memberCount})`,
                value: [
                    `> 👤 **Usuarios:** ${guild.memberCount - botcount}`,
                    `> 🤖 **Bots:** ${botcount}`,
            ].join(`\n`),
            inline: true
            },
            {
                name: `💎 **| Mejoras en el servidor**`,
                value: [
                    `> 🎫 **Nivel:** ${guild.premiumTier}`,
                    `> 🛠 **Mejoras:** ${guild.premiumSubscriptionCount}`,
            ].join(`\n`),
            inline: true
            },
            {
                name: `📖 **| Canales** (${totalChannels})`,
                value: [
                    `> 📝 **Texto:** ${getChannelTypeSize([
                        ChannelType.GuildText,
                        ChannelType.GuildForum,
                        ChannelType.GuildNews
                    ])}`,
                    `> 🎙 **Voz:** ${getChannelTypeSize([
                        ChannelType.GuildStageVoice,
                        ChannelType.GuildVoice
                    ])}`,
                    `> 🧵 **Hilos:** ${getChannelTypeSize([
                        ChannelType.GuildPublicThread,
                        ChannelType.GuildPrivateThread,
                        ChannelType.GuildNewsThread
                    ])}`,
                    `> 📚 **Categorías:** ${getChannelTypeSize([
                        ChannelType.GuildCategory,
                    ])}`,
            ].join(`\n`),
            inline: true
            },
            {name: "🖼 **| Banner del Servidor**", value: guild.bannerURL() ? "** **" : "Este servidor no tiene ningun banner."}
        );

        await interaction.reply({embeds: [embed]})
    }
}