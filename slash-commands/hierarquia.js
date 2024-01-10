const {EmbedBuilder} = require('discord.js');

module.exports = {
    run: async ({ interaction }) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hierarquia') {
        // Create the modal
        const embed = new EmbedBuilder()
            .setTitle('Hierarquia')
            .setColor(0xFF0000)
            .addFields(
            { name: 'Líder Darak', value: '@『00』Darak | 100', inline: false },
            { name: 'Líder Klaus', value: '@『00』Klaus | 78', inline: false },
            { name: 'Sub-líder Mia', value: '@『SUB-LIDER』꧁༒☬𝖒𝖎𝖆☬༒꧂| 14852', inline: false },
            { name: 'Gerente de Vendas Noah', value: '@『GER-VED』Noah | 63', inline: false },
            { name: 'Gerente de Vendas TarcisioI', value: '@『GER-VED』TarcisioI 13564', inline: false },
            { name: 'Gerente de Ação Chrisfps', value: '@Chrisfps| 33058', inline: false },
            { name: 'Gerente de Ação Gusta', value: '@『GER-AÇÃO』Gusta| 29566', inline: false },
            { name: 'Gerente de Ação Nofvck do Japa', value: '@『GER-AÇÃO』Nofvck do Japa | 26012', inline: false },
            { name: 'Gerente de Recrutamentos Joao Xavier', value: '@『GER-REC』Joao Xavier| 31703', inline: false },
            { name: 'Gerente de Recrutamentos 𝕃𝕦𝕒𝕙', value: '@『GER-REC』𝕃𝕦𝕒𝕙| 15492', inline: false },
            { name: 'Gerente de Recrutamentos Cherry', value: '@『GER-REC』Cherry| 15988', inline: false }
        );
        interaction.reply('Listando nossa hierarquia:');
        if (interaction.channel) {
            interaction.channel.send({ embeds: [embed] });
        } else {
            interaction.user.send({embeds: [embed]});
        }
    }
},
    data: {
    name: 'hierarquia',
        description: 'Comando para ver hierarquia atualizada da fac',
},
};