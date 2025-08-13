module.exports = {
    DESCRIPTION: "Envias un mensaje como el bot.",
    OWNER: true,

    async execute (client, message, args, prefix) {
        const sayMessage = args.join(" ");
            message.channel.send(sayMessage);
            return message.delete()
      }
}