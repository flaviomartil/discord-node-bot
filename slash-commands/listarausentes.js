const {EmbedBuilder} = require("discord.js");
const { PermissionsBitField } = require('discord.js');
module.exports = {
  run: async ({ interaction }) => {
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
  },

  data: {
    name: 'listarausentes',
    description: 'Lista membros inativos',
  },
};
