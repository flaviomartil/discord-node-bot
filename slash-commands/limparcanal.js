const {EmbedBuilder} = require('discord.js');

module.exports = {
    run: async ({ interaction }) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'limparcanal') {
        const channel = interaction.channel;
        const messageManager = channel.messages;
        const messages = await messageManager.channel.messages.fetch({ limit: 99 });
        channel.bulkDelete(messages,true);
    }
},
    data: {
    name: 'limparcanal',
        description: 'Comando para limpar canal',
},
};