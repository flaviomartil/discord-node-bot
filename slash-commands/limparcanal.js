const {PermissionsBitField, SlashCommandBuilder} = require("discord.js");

module.exports = {
    run: async ({ interaction }) => {
        const number = interaction.options.getNumber('numero');

        if (interaction.channel) {
            let memberUsedCommand = interaction.member;

            if (!memberUsedCommand.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                return interaction.reply('Você não pode usar esse comando.');
            }

            const channel = interaction.channel;
            const messageManager = channel.messages;
            const messages = await messageManager.channel.messages.fetch(
                {
                    limit: number,
                });

            channel.bulkDelete(messages, true);
            return interaction.reply({
                ephemeral: true,
                content: `Foram limpas ${number} mensagens.`,
            });

        } else {
            return interaction.reply('Esse comando só pode ser usado no servidor');
        }
    },

    data: new SlashCommandBuilder()
        .setName('limparcanal')
        .setDescription('limpa o número escolhido de mensagens')
        .addNumberOption((option) => option.setName('numero').setDescription('número de mensagens a limpar').setRequired(true))
};
