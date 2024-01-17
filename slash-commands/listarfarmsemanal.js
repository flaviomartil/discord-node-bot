const {EmbedBuilder, PermissionsBitField} = require('discord.js');
const {database} = require("../config/firebaseConfig");

module.exports = {
    run: async ({ interaction }) => {
        const member = interaction.member;

        if (interaction.channel) {
            try {
                const guild = await interaction.guild.members.fetch();
                const role = interaction.guild.roles.cache.find(role => role.name === "Meta semanal paga");

                if (!role) {
                    return interaction.reply('O cargo "Meta semanal paga" não foi encontrado no servidor.');
                }

                const farmMembers = [];
                const promises = role.members.map(async (m) => {
                    const userId = m.user.id;
                    const userRef = database.ref(`/rankMessage/${userId}`);
                    const userSnapshot = await userRef.once('value');
                    const currentFarm = userSnapshot.exists() ? userSnapshot.val().CurrentFarm || 0 : 0;

                    farmMembers.push({ user: m.user.toString(), farm: currentFarm });
                });

                await Promise.all(promises);

                if (!member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                    return interaction.reply('Você não pode usar esse comando.');
                }

                let embed = new EmbedBuilder()
                    .setTitle('Nenhum membro pagou o farm essa semana')
                    .setColor(0x00FF00);

                if (farmMembers.length > 0) {
                    const formattedFarmMembers = farmMembers.map(({ user, farm }) => `${user}: ${farm} farm`);
                    embed = new EmbedBuilder()
                        .setTitle('Membros com farm semanal pago')
                        .setColor(0x00FF00)
                        .addFields({ name: 'Membros:', value: formattedFarmMembers.join('\n'), inline: false });
                }

                return interaction.channel.send({ embeds: [embed] });
            } catch (error) {
                console.error('Erro ao obter informações do banco de dados:', error);
                return interaction.reply('Ocorreu um erro ao processar a solicitação.');
            }
        } else {
            return interaction.reply('Esse comando só pode ser usado no servidor');
        }
    },
    data: {
        name: 'listarfarmsemanal',
        description: 'Comando para ver quem pagou farm semanal',
    },
};