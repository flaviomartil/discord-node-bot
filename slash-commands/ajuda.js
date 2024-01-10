const {EmbedBuilder} = require('discord.js');

module.exports = {
    run: async ({ interaction }) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ajuda') {
        // Create the modal
        const embed = new EmbedBuilder()
            .setTitle('FAQ')
            .setDescription('Faq de comandos do bot')
            .setColor(0x0000FF)
            .addFields(
                { name: 'Comando de Parcerias', value: '`/parceria` - Mostra informações sobre os parceiros Romanov', inline: false },
                { name: 'Comando de Hierarquia', value: '`/hierarquia` - Mostra informações sobre os líderes e gerentes Romanov', inline: false },
                { name: 'Comando de Preços', value: '`/preco` - Exibe a tabela de preços para algumas armas no jogo', inline: false },
                { name: 'Comando de Metas', value: '`/meta` - Apresenta a meta semanal atualizada', inline: false }
            );
        interaction.reply('Listando FAQ:');
        interaction.channel.send({ embeds: [embed] });
    }
},
    data: {
    name: 'ajuda',
        description: 'Faq de comandos do bot',
},
};