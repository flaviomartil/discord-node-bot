const {PermissionsBitField, SlashCommandBuilder, Client, IntentsBitField} = require("discord.js");
const {database} = require("../config/firebaseConfig");

module.exports = {
    run: async ({ interaction }) => {
        const user = interaction.options.getUser('membro');
        const number = interaction.options.getNumber('numero');
        const interactionRoute = '/rankMessage/';
        const userRef = database.ref(interactionRoute + user.id);
        const userSnapshot = await userRef.once('value');
        const currentFarm = userSnapshot.exists() ? userSnapshot.val().CurrentFarm || 0 : 0;
        const newCount = currentFarm + number;
        const updateData = {
            User_ID: user.id,
            CurrentFarm: newCount
        };

        if (userSnapshot.exists()) {
            await userRef.update(updateData);
        } else {
            await userRef.set(updateData);
        }


        if (interaction.channel) {
            const guild = await interaction.guild.members.fetch();
            const member = guild.find((m) => m.id === user.id);
            let memberUsedCommand = interaction.member;

        if (!memberUsedCommand.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply('Você não pode usar esse comando.');
        }

        member.roles.add("1189235770322587648");

        return interaction.reply(`${interaction.user} setou o farm semanal do membro ${user} como pago, ele está com ${newCount} farmas pagos essa semana.`)
        } else {
            return interaction.reply('Esse comando só pode ser usado no servidor');
        }
    },

    data: new SlashCommandBuilder()
        .setName('setarfarmpago')
        .setDescription('Adiciona o cargo de farm pago para o membro')
        .addUserOption((option) => option.setName('membro').setDescription('Seleciona o membro').setRequired(true))
        .addNumberOption((option) => option.setName('numero').setDescription('número de farms entregues').setRequired(true))
};
