const {EmbedBuilder} = require("discord.js");
const { PermissionsBitField } = require('discord.js');
module.exports = {
  run: async ({ interaction }) => {
    try {
      if (interaction.channel) {
        const member = interaction.member;

        if (!member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
          interaction.reply('Você não pode usar esse comando.');
          return;
        }

        const guild = await interaction.guild.members.fetch();
        const role = interaction.guild.roles.cache.find(role => role.id !== "1196479865575178340" && role.id != "1143271758896562238")
        const totalMember = role.members.map(m => m.user.toString())
        const chunkSize = 30;

        const chunks = [];
        for (let i = 0; i < totalMember.length; i += chunkSize) {
          chunks.push(totalMember.slice(i, i + chunkSize));
        }

        if (!totalMember) {
          interaction.reply('Não temos membros no momento');
          return;
        }

        await chunks.forEach((part, index) => {
          let members = part.join('\n ');
          const embed = new EmbedBuilder()
              .setTitle('Listando todos os membros romanov')
              .setColor(0xFFD700)
              .addFields({name: 'Membros:', value: members, inline: false}
              );

          interaction.channel.send({embeds: [embed]});
        });

        interaction.reply('Essa é nossa lista atualizada');

      } else {
        interaction.reply('Esse comando só pode ser usado no servidor');
        return;
      }
    } catch (err) {
      console.error('Erro ao listar membros', err);
      return null;
    }
  },

  data: {
    name: 'listarmembros',
    description: 'Lista membros atuais romanov',
  },
};
