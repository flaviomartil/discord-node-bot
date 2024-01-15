const {EmbedBuilder} = require('discord.js');

module.exports = {
    run: async ({ interaction }) => {

        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'farm') {
            // Create the modal
            const embed = new EmbedBuilder()
                .setTitle('Meta semanal Romanov')
                .setColor(0xFFD700)
                .addFields(
                    { name: '𝗠𝗘𝗧𝗔 𝗦𝗘𝗠𝗔𝗡𝗔𝗟', value: '1.000 AÇOS', inline: false },
                    { name: '✦𝗣𝗔𝗚𝗔𝗠𝗘𝗡𝗧𝗢✦', value: '𝗣𝗔𝗚𝗔𝗠𝗘𝗡𝗧𝗢 𝗦𝗘𝗠𝗔𝗡𝗔𝗟: 3 FIVES OU 300.000 DINHEIRO LIMPO', inline: false }
                );
            interaction.reply('Listando meta semanal:');
            if (interaction.channel) {
                interaction.channel.send({ embeds: [embed] });
            } else {
                interaction.user.send({embeds: [embed]});
            }
        }
    },
    data: {
        name: 'farmsemanal',
        description: 'Comando para ver quem pagou farm semanal',
    },
};