const {EmbedBuilder, PermissionsBitField} = require('discord.js');
const {database} = require("../config/firebaseConfig");
async function resetCurrentFarmForAllUsers() {
    try {
        const interactionRoute = '/rankMessage/';
        const usersRef = database.ref(interactionRoute);
        const usersSnapshot = await usersRef.once('value');
        const users = usersSnapshot.val();

        for (const userId in users) {
            if (users.hasOwnProperty(userId)) {
                    const userRef = database.ref(`${interactionRoute}${userId}`);
                    await userRef.update({CurrentFarm: 0});
            }
        }

        console.log('currentFarm definido como 0 para todos os usuários com sucesso.');
    } catch (error) {
        console.error('Erro ao definir currentFarm como 0 para todos os usuários:', error);
    }
}

module.exports = {

    run: async ({ interaction }) => {
        const member = interaction.member;

        if (interaction.channel) {
            if (!member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                interaction.reply('Você não pode usar esse comando.');
                return;
            }

            const guild = await interaction.guild.members.fetch();
            const role = interaction.guild.roles.cache.find(role => role.name === "Meta semanal paga")
            await resetCurrentFarmForAllUsers();
             role.members.forEach((member, i) => {
                 setTimeout(() => {
                     member.roles.remove(role);
                 }, i * 1000);
             });

            const embed = new EmbedBuilder()
                .setTitle('Todos os membros foram removidos do cargo farm semanal pago, que comece a nova semana.')
                .setColor(0x00FF00);

            interaction.reply('Listando:');
            interaction.channel.send({ embeds: [embed] });

        } else {
            interaction.reply('Esse comando só pode ser usado no servidor');
            return;
        }
    },
    data: {
        name: 'novasemanafarm',
        description: 'Comando para ver quem pagou farm semanal',
    },
};