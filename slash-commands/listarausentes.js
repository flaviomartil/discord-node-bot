const {EmbedBuilder} = require("discord.js");
const { PermissionsBitField } = require('discord.js');
module.exports = {
  run: async ({ interaction }) => {
    try {
    const member = interaction.member;
    const guild = await interaction.guild.members.fetch();
    const role = interaction.guild.roles.cache.find(role => role.name === "⭐")
    const totalAway = role.members.map(m => m.user.toString())
    const afkMembers = totalAway.join('\n ');

    if (!member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      if (interaction.channel) {
        interaction.reply('Você não pode usar esse comando.');
      } else {
        interaction.reply('Você não pode usar esse comando.');
      }
    }

    if (!afkMembers) {
      interaction.reply('Não temos membros com o cargo de ausentes por enquanto, para definir coloque o cargo ⭐');
      return;
    }

    const embed = new EmbedBuilder()
        .setTitle('Esses são os membros ausentes')
        .setColor(0xFFD700)
        .addFields({ name: 'Usuários ausentes', value: afkMembers, inline: false }
        );


    interaction.reply('Listando:');
    if (interaction.channel) {
      interaction.channel.send({ embeds: [embed] });
    } else {
      interaction.user.send({embeds: [embed]});
    }

    } catch (err) {
      console.error('Erro ao listar ausentes', err);
      return null;
    }
  },

  data: {
    name: 'listarausentes',
    description: 'Lista membros inativos',
  },
};
