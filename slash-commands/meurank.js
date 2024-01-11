const {EmbedBuilder} = require('discord.js');
const { database } = require('../config/firebaseConfig');
module.exports = {
    run: async ({ interaction }) => {

    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'meurank') {
        const userId = interaction.user.id;
        const userRankSnapshot = await database.ref(`rankMessage/${userId}`).once('value');
        const userRank = userRankSnapshot.val();

        if (!userRank) {
            interaction.reply("Parece que você ainda não tem um rank");
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(`Rank Atual de ${interaction.user.displayName.toString()}`)
            .setColor(0x00FF00)
            .setDescription(`Aqui estão os detalhes do seu rank atual:`)
            .addFields(
                { name: 'Rank', value: `${userRank.Rank}`, inline: true },
            );

        interaction.reply('Enviando Rank:');
        if (interaction.channel) {
            interaction.channel.send({ embeds: [embed] });
        } else {
            interaction.user.send({embeds: [embed]});
        }
    }
},
    data: {
    name: 'meurank',
        description: 'Comando para ver o seu rank',
},
};