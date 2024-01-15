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
        const role = interaction.guild.roles.cache.find(role => role.id !== "1196479865575178340")
        const totalAway = role.members.map(m => m.user.toString())
        const afkMembers = totalAway.join('\n ');

        if (!afkMembers) {
          interaction.reply('Não temos membros no momento');
          return;
        }

        const embed = new EmbedBuilder()
            .setTitle('Listando todos os membros romanov')
            .setColor(0xFFD700)
            .addFields({ name: 'Membros:', value: afkMembers, inline: false }
            );

        interaction.reply('Listando:');
          interaction.channel.send({ embeds: [embed] });
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
