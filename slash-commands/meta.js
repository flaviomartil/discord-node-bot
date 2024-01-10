const {EmbedBuilder} = require('discord.js');

module.exports = {
    run: async ({ interaction }) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'meta') {
        // Create the modal
        const embed = new EmbedBuilder()
            .setTitle('Meta semanal Romanov')
            .setColor(0xFFD700)
            .addFields(
                { name: '𝗠𝗘𝗧𝗔 𝗦𝗘𝗠𝗔𝗡𝗔𝗟', value: '1.500 AÇOS', inline: false },
                { name: '✦𝗣𝗔𝗚𝗔𝗠𝗘𝗡𝗧𝗢✦', value: '𝗣𝗔𝗚𝗔𝗠𝗘𝗡𝗧𝗢 𝗦𝗘𝗠𝗔𝗡𝗔𝗟: 5 FIVES OU 500.000 DINHEIRO LIMPO', inline: false }
            );
        interaction.reply('Listando meta semanal:');
        interaction.channel.send({ embeds: [embed] });
    }
},
    data: {
    name: 'meta',
        description: 'Comando para ver a meta da facção',
},
};