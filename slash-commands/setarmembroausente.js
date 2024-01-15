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
        
        member.roles.add("1196421763265994835");

        interaction.user.send(`${interaction.user} setou o membro ${user} como ausente`);
        return interaction.reply('Sucesso');
        } else {
            interaction.reply('Esse comando só pode ser usado no servidor');
        }
    },

    data: new SlashCommandBuilder()
        .setName('setarmembroausente')
        .setDescription('Adiciona o cargo de membro ausente')
        .addUserOption((option) => option.setName('membro').setDescription('Seleciona o membro').setRequired(true))
};
