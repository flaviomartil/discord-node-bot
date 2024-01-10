const {EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    run: async ({ interaction }) => {

    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'limparcanal') {
        const member = interaction.member;
        if (member.permissions.has("ADMINISTRATOR")) {
            const channel = interaction.channel;
            const messageManager = channel.messages;
            const messages = await messageManager.channel.messages.fetch({limit: 99});
            channel.bulkDelete(messages, true);
            interaction.reply({
                ephemeral: true,
                content: `Canal limpo com sucesso.`,
            });
        } else {
            interaction.reply({
                ephemeral: true,
                content: `Somente administradores podem usar o comando limparcanal`,
            });
        }
    }
},
    data: {
    name: 'limparcanal',
        description: 'Comando para limpar canal',
},
};