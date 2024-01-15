const {EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    run: async ({ interaction }) => {
        const member = interaction.member;

        if (interaction.channel) {
            const guild = await interaction.guild.members.fetch();
            const role = interaction.guild.roles.cache.find(role => role.name === "Meta semanal paga")
            const totalFarm = role.members.map(m => m.user.toString())
            const farmMembers = totalFarm.join('\n ');

            if (!member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                interaction.reply('Você não pode usar esse comando.');
            }

            let embed = new EmbedBuilder()
                .setTitle('Nenhum membro pagou o farm essa semana')
                .setColor(0x00FF00);

            if (farmMembers) {
                embed = new EmbedBuilder()
                    .setTitle('Membros com farm semanal pago')
                    .setColor(0x00FF00)
                    .addFields({name: 'Membros:', value: farmMembers, inline: false}
                    );
            }


        interaction.reply('Listando:');
            interaction.channel.send({ embeds: [embed] });

        } else {
            interaction.reply('Esse comando só pode ser usado no servidor');
            return;
        }
    },
    data: {
        name: 'listarfarmsemanal',
        description: 'Comando para ver quem pagou farm semanal',
    },
};