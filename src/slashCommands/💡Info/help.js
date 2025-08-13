const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ComponentType} = require ('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Muestra información sobre los comandos del bot."),

    async execute (client, message, args, prefix) {
        const emojis = {
            Configuración: "⚙️",
            Diversion: "🎭",
            Música: "🎵",
            Info: "💡",
            General: "📖",
            Moderación: "🛡️"
        };

        const categories = new Map();

    client.commands.forEach((command) => {
      const category = command.CATEGORY || 'general';
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category).push(command);
    });

            const embed = new EmbedBuilder()
            .setDescription('Por favor selecciona una categoría de comandos.')

            const components = (state) => [
                new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                    .setCustomId("Help menu")
                    .setPlaceholder("Por favor selecciona una categoría")
                    .setDisabled(state)
                    .addOptions(
                        categories.map(([category, commands]) => ({
                        label: `${emojis[category] || ''} ${category}`,
                        value: category,
                        }))
                        )
            )
        ]
        
        const initialMessage = await message.reply({
            embeds: [embed],
            components: components(false),
        });

        const filter = (message) => 
        message.author.id === message.member.id;

        const collector = message.channel.createMessageComponentCollector({
            filter,
            componentType: ComponentType.SelectMenu,
        });

        collector.on('collect', async () => {
            const category = message.values[0];
            const commands = categories.get(category);

        const categoryEmbed = new EmbedBuilder()
            .setTitle(`${category} comandos`)
            .setDescription(`Una lista de todos los comandos categorizados en ${category}`)
            .addFields(
                commands.map((cmd) => ({
                    name: `\`${cmd.NAME}\``, value: `\`${cmd.DESCRIPTION}\`` || 'No hay descripción disponible',
                    inline: true,
                }))
                );

            message.update({ embeds: [categoryEmbed] });
        });

        collector.on("end", () => {
            message.edit({ components: components(true) });
        });
    },
};