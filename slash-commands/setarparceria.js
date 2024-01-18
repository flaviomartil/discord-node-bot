const {PermissionsBitField, SlashCommandBuilder, Client, IntentsBitField} = require("discord.js");
const {database} = require("../config/firebaseConfig");

module.exports = {
    run: async ({ interaction }) => {
        const fac = interaction.options.getString('fac');
        const capitalizeFirstLetter = (string) => {
            return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
        };
        const partnerType = interaction.options.getString('tipo');
        const areaRisk = interaction.options.getNumber('area');

        const interactionRoute = '/partner/';
        const partnerRef = database.ref(interactionRoute + capitalizeFirstLetter(fac));
        const partnerSnapshot = await partnerRef.once('value');

        const updateData = {
            PartnerType: partnerType,
            AreaRisk: areaRisk
        };

        if (partnerSnapshot.exists()) {
            await partnerRef.update(updateData);
        } else {
            await partnerRef.set(updateData);
        }


        if (interaction.channel) {
            let memberUsedCommand = interaction.member;

        if (!memberUsedCommand.permissions.has("ADMINISTRATOR")) {
            return interaction.reply('Você não pode usar esse comando.');
        }

        return interaction.reply(`${interaction.user} setou a parceria com a fac ${fac} que é do tipo ${partnerType}.`)
        } else {
            return interaction.reply('Esse comando só pode ser usado no servidor');
        }
    },

    data: new SlashCommandBuilder()
        .setName('setarparceria')
        .setDescription('Adiciona a parceria a lista de parcerias')
        .addStringOption((option) => option.setName('fac').setDescription('Escreva o nome da facção').setRequired(true))
        .addStringOption((option) => option.setName('tipo').setDescription('Escreva o tipo da facção').setRequired(true))
        .addNumberOption((option) => option.setName('area').setDescription('Area de risco').setRequired(false))
};
