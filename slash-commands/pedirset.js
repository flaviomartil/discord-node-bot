const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder   } = require('discord.js');

module.exports = {
    run: async ({ interaction }) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'pedirset') {
        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId('myModal')
            .setTitle('Faça pedido do set')
        ;

        // Add components to modal

        // Create the text input components
        const nomeNaCidade = new TextInputBuilder()
            .setCustomId('nomeNaCidade')
            .setLabel("NOME NA CIDADE?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);
        const passaporte = new TextInputBuilder()
            .setCustomId('passaporte')
            .setLabel("INSIRA SEU PASSAPORTE")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);
        const telCidade = new TextInputBuilder()
            .setCustomId('telCidade')
            .setLabel("TELEFONE NA CIDADE")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);
        const nomeRecrutador = new TextInputBuilder()
            .setCustomId('nomeRecrutador')
            .setLabel("NOME DO RECRUTADOR")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);


        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(nomeNaCidade);
        const secondActionRow = new ActionRowBuilder().addComponents(passaporte);
        const thirdActionRow = new ActionRowBuilder().addComponents(telCidade);
        const fourActionRow = new ActionRowBuilder().addComponents(nomeRecrutador);

        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow,thirdActionRow, fourActionRow,);
        await interaction.showModal(modal);
       const filter = (interaction) => interaction.customId === 'myModal';

       interaction
           .awaitModalSubmit({filter, time: 30_000})
           .then((modalInteraction) => {
               const nomeNaCidadeValue = modalInteraction.fields.getTextInputValue('nomeNaCidade');
               const passaporteValue = modalInteraction.fields.getTextInputValue('passaporte');
               const telCidadeValue = modalInteraction.fields.getTextInputValue('telCidade');
               const nomeRecrutadorValue = modalInteraction.fields.getTextInputValue('nomeRecrutador');
               let embed = new EmbedBuilder()
                   .setTitle('Pedindo set !')
                   .setDescription(`
        Nome na cidade: ${nomeNaCidadeValue}
        Passaporte: ${passaporteValue}
        Telefone na cidade: ${telCidadeValue}
        Nome do recrutador: ${nomeRecrutadorValue}
    `).setColor(0x7289DA);

               modalInteraction.reply({ embeds: [embed] });
           }).catch((err) => {
          console.log('Error' + err);
        })

    }
},
    data: {
    name: 'pedirset',
        description: 'Abre uma telinha pra você pedir o set',
},
};