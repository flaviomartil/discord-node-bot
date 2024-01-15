const {PermissionsBitField, SlashCommandBuilder, Client, IntentsBitField} = require("discord.js");

module.exports = {
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('membro');

        if (interaction.channel) {
            const guild = await interaction.guild.members.fetch();
            const member = guild.find((m) => m.id === user.id);
        if (!member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                interaction.reply('Você não pode usar esse comando.');
        }
        
        member.roles.remove("1189235770322587648");

        interaction.user.send(`${interaction.user} removeu o membro ${user} da lista de farm pago`);
        return interaction.reply('Sucesso');
        } else {
            interaction.reply('Esse comando só pode ser usado no servidor');
        }
    },

    data: new SlashCommandBuilder()
        .setName('removerfarmpago')
        .setDescription('remove o cargo de farm pago')
        .addUserOption((option) => option.setName('membro').setDescription('Seleciona o membro').setRequired(true))
};
