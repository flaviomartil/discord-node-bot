const {EmbedBuilder} = require('discord.js');

module.exports = {
    run: async ({ interaction }) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'preco') {
        // Create the modal
        const embed = new EmbedBuilder()
            .setTitle('Preços Armas Romanov')
            .setColor(0x00FF00)
            .addFields(
                { name: 'G3', value: '**Custo:** 472.000\n**Valor MÍNIMO:** 637.200\n**Valor MÁXIMO:** 708.000', inline: false },
                { name: 'M-TAR', value: '**Custo:** 355.000\n**Valor MÍNIMO:** 479.250\n**Valor MÁXIMO:** 532.500', inline: false },
                { name: 'AK-47', value: '**Custo:** 400.000\n**Valor MÍNIMO:** 540.000\n**Valor MÁXIMO:** 600.000', inline: false },
                { name: 'M60', value: '**Custo:** 273.000\n**Valor MÍNIMO:** 368.550\n**Valor MÁXIMO:** 409.500', inline: false },
                { name: 'FIVE SEVEN', value: '**Custo:** 182.000\n**Valor MÍNIMO:** 245.700\n**Valor MÁXIMO:** 273.000', inline: false },
                { name: 'DESERT EAGLE', value: '**Custo:** 150.000\n**Valor MÍNIMO:** 202.500\n**Valor MÁXIMO:** 225.000', inline: false },
                { name: 'HK P7M10', value: '**Custo:** 123.000\n**Valor MÍNIMO:** 166.050\n**Valor MÁXIMO:** 184.500', inline: false }
            );
        interaction.reply('Listando ultimos preços de armas:');
       interaction.channel.send({ embeds: [embed] });
    }
},
    data: {
    name: 'preco',
        description: 'Comando para ver os preços das armas',
},
};