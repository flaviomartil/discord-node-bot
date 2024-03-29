const {Font,RankCardBuilder,RankCardUserStatus,BuiltInGraphemeProvider} = require('canvacord');
const { calculateXPLevel, getUserRank,getUserRankPositionByMessageCount } = require('../events/level/xp');
module.exports = {
    run: async ({ interaction }) => {
        Font.loadDefault();
        const userId = interaction.user.id;
        const rank = await getUserRankPositionByMessageCount(userId);
        const userData = await getUserRank(userId);
        const xpLevel = await calculateXPLevel(userData);
        const progress = Math.floor((xpLevel.currentXP - xpLevel.initialXP) / (xpLevel.nextRankXP - xpLevel.initialXP) * 100);
        let avatarURL = interaction.user.avatarURL();

        let avatar = "https://cdn.discordapp.com/embed/avatars/0.png?size=256";

        if (!avatarURL.endsWith(".gif")) {
            avatar = avatarURL;
        }

        const card = new RankCardBuilder()
            .setDisplayName(interaction.member.nickname)
            .setUsername(userData.Rank)
            .setAvatar(avatar)
            .setCurrentXP(xpLevel.currentXP)
            .setRequiredXP(xpLevel.nextRankXP)
            .setProgressCalculator(() => {
                return progress;
            })
            .setLevel(xpLevel.level)
            .setRank(rank)
            .setOverlay(90)
            .setBackground("https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg")
            .setStatus(interaction.user.status)
            .setGraphemeProvider(BuiltInGraphemeProvider.FluentEmojiFlat);

        const image = await card.build({
            format: "png",
        });
        interaction.reply('Enviando Rank:');
        if (interaction.channel) {
            interaction.channel.send({ files: [{ attachment: image }] });
        } else {
            interaction.user.send({ files: [{ attachment: image }] });
        }
    },


    data: {
        name: 'meurank',
        description: 'Mostra seu rank atual no servidor',
    },
};
