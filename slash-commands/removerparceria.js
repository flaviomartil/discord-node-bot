const {PermissionsBitField, SlashCommandBuilder, Client, IntentsBitField} = require("discord.js");
const {database} = require("../config/firebaseConfig");

module.exports = {
    run: async ({ interaction }) => {
        const fac = interaction.options.getString('fac');
        const capitalizeFirstLetter = (string) => {
            return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
        };

        const interactionRoute = '/partner/';
        const partnerRef = database.ref(interactionRoute + capitalizeFirstLetter(fac));
        const partnerSnapshot = await partnerRef.once('value');

        if (partnerSnapshot.exists()) {
            await partnerRef.remove();
            return interaction.reply(`${interaction.user} deletou a parceria com a fac ${fac}.`);
        } else {
            return interaction.reply(`Não foi encontrada nenhuma parceria com a fac ${fac}.`);
        }
    },

    data: new SlashCommandBuilder()
        .setName('removerparceria')
        .setDescription('Remove a parceria a lista de parcerias')
        .addStringOption((option) => option.setName('fac').setDescription('Escreva o nome da facção').setRequired(true))
};
