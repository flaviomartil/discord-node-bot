const {EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    run: async ({ interaction }) => {
        const member = interaction.member;
        const guild = await interaction.guild.members.fetch();
        const role = interaction.guild.roles.cache.find(role => role.name === "Meta semanal paga")
        const totalFarm = role.members.map(m => m.user.toString())
        const farmMembers = totalFarm.join('\n ');

        if (!member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            if (interaction.channel) {
                interaction.reply('Você não pode usar esse comando.');
            } else {
                interaction.reply('Você não pode usar esse comando.');
            }
        }

        const embed = new EmbedBuilder()
            .setTitle('Membros com farm semanal pago')
            .setColor(0x00FF00)
            .addFields({ name: 'Membros:', value: farmMembers, inline: false }
            );

        interaction.reply('Listando:');
        if (interaction.channel) {
            interaction.channel.send({ embeds: [embed] });
        } else {
            interaction.user.send({embeds: [embed]});
        }
    },
    data: {
        name: 'farmsemanal',
        description: 'Comando para ver quem pagou farm semanal',
    },
};