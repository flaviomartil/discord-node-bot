const {EmbedBuilder} = require('discord.js');
const {database} = require("../config/firebaseConfig");

module.exports = {
    run: async ({ interaction }) => {
        const interactionRoute = '/partner/';
        const partnerRef = database.ref(interactionRoute);

        try {
            const partnerSnapshot = await partnerRef.once('value');
            const partnerData = partnerSnapshot.val();

            if (!partnerData) {
                interaction.reply('Nenhum parceiro encontrado.');
                return;
            }

            const fields = [];

            const capitalizeFirstLetter = (string) => {
                return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
            };

            // Itera sobre cada parceiro no banco de dados
            Object.keys(partnerData).forEach((fac) => {
                const facInfo = partnerData[fac];
                if (facInfo.AreaRisk) {
                    fields.push({
                        name: capitalizeFirstLetter(fac),
                        facInfo: capitalizeFirstLetter(facInfo.PartnerType),
                        AreaRisk: facInfo.AreaRisk
                    });
                } else {
                    fields.push({
                        name: capitalizeFirstLetter(fac),
                        facInfo: capitalizeFirstLetter(facInfo.PartnerType),
                    });
                }
            });

            const formattedFac = fields.map(({ name, facInfo, AreaRisk }) => {
                const areaRiskText = AreaRisk !== undefined ? `\n **Area de risco: ${AreaRisk} **` : '';
                return `\n**${facInfo}** \n ${name} ${areaRiskText}`;
            });

            const embed = new EmbedBuilder()
                .setTitle('Parceiros Romanov')
                .setColor('#9B59B6')
                .addFields({ name: 'Parceiros:', value: formattedFac.join('\n'), inline: false });

            interaction.reply('Listando parceiros:');
            if (interaction.channel) {
                interaction.channel.send({ embeds: [embed] });
            } else {
                interaction.user.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error('Erro ao acessar o banco de dados:', error);
            interaction.reply('Erro ao acessar o banco de dados.');
        }
},
    data: {
    name: 'parceria',
        description: 'Comando para ver parcerias atualizadas da fac',
},
};