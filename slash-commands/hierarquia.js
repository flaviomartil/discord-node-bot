const {EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    run: async ({ interaction }) => {
        const member = interaction.member;

        if (interaction.channel) {
            const guild = await interaction.guild.members.fetch();
            const roleIds = [
                "1143271758913347635",
                "1143271758913347634",
                "1143271758896562246",
                "1143271758896562245",
                "1155254436176875530",
                "1143271758896562244",
                "1143271758896562243",
                "1143629488371019856"
            ];

            const roleIndex = [];
            const roleMembers = {};
            const embedFields = [];
            let embed;

            roleIds.forEach(roleId => {
                const role = interaction.guild.roles.cache.get(roleId);
                if (role) {
                    roleIndex.push(role.name);
                    roleMembers[role.name] = role.members.map(m => m.user.id);
                }
            });


            for (let i = 0; i < roleIndex.length; i++) {
                const roleName = roleIndex[i];
                const members = roleMembers[roleName];

                const field = {
                    name: `Cargo: ${roleName}`,
                    value: members.map(memberId => {
                        const member = interaction.guild.members.cache.get(memberId);
                        return `- ${member.user.toString()}`;
                    }).join('\n'),
                    inline: false
                };

                embedFields.push(field);
            }

            //
             if (embedFields) {
                 embed = new EmbedBuilder()
                    .setTitle('Hierarquia romanov')
                   .setColor(0xFF0000)
                    .addFields(embedFields
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
        name: 'hierarquia',
        description: 'Comando para ver hierarquia nova',
    },
};