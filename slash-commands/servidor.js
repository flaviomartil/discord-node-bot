const {EmbedBuilder} = require('discord.js');
const axios = require('axios');


module.exports = {
    run: async ({ interaction }) => {

    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'servidor') {
        const response = await axios.get('http://jogar.oceaniarp.com.br:30120/dynamic.json');
        const data = response.data;
        const clients = data.clients;
        const online = parseInt(clients) > 0 ? 'Online' : 'Offline';
        let hostname = data.hostname;
        hostname = hostname.replace(/\^4/g, '');
        const embed =  new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Informações do Servidor')
            .addFields(
                { name: 'Players Online', value: `${clients}`, inline: true },
                { name: 'Nome', value: `${hostname}`, inline: true },
                { name: 'Status', value: `${online}`, inline: true },
            );

        interaction.reply('Informações do servidor:');
        if (interaction.channel) {
            await interaction.channel.send({ embeds: [embed] });
        } else {
             await interaction.user.send({embeds: [embed]});
        }
    }
},
    data: {
    name: 'servidor',
        description: 'Comando para ver detalhes do servidor oceania roleplay',
},
};