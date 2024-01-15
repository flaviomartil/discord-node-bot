const {PermissionsBitField, SlashCommandBuilder, Client, IntentsBitField} = require("discord.js");

module.exports = {
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('membro');

        if (interaction.channel) {
            const guild = await interaction.guild.members.fetch();
            const member = guild.find((m) => m.id === user.id);
            let memberUsedCommand = interaction.member;

            if (!memberUsedCommand.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                return interaction.reply('Você não pode usar esse comando.');
            }

        member.roles.add("1196479865575178340");
        member.roles.remove("1143271758896562239");

        return interaction.reply(`${interaction.user} setou o membro ${user} como ex-membro romanov`)
        } else {
            interaction.reply('Esse comando só pode ser usado no servidor');
        }
    },

    data: new SlashCommandBuilder()
        .setName('setarexmembro')
        .setDescription('Adiciona o cargo de ex membro para o membro.')
        .addUserOption((option) => option.setName('membro').setDescription('Seleciona o membro').setRequired(true))
};
