const {EmbedBuilder} = require('discord.js');

module.exports = {
    run: async ({ interaction }) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'parceria') {
        // Create the modal
        const embed = new EmbedBuilder()
            .setTitle('Parceiros Romanov')
            .setColor(0xFF0000)
            .addFields(
                {name: 'Mecânica', value: 'Bennys'},
                {name: 'Drogas', value: 'Yakuza 2'},
                {name: 'Desmanche', value: 'Hells'},
            );

        interaction.reply('Listando parceiros:');
        if (interaction.channel) {
            interaction.channel.send({ embeds: [embed] });
        } else {
            interaction.user.send({embeds: [embed]});
        }
    }
},
    data: {
    name: 'parceria',
        description: 'Comando para ver parcerias atualizadas da fac',
},
};