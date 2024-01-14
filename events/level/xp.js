const {database} = require("../../config/firebaseConfig");


async function getAllUsersRankedByMessageCount() {
    try {
        const usersSnapshot = await database.ref(`rankMessage`).once('value');
        const allUsers = usersSnapshot.val();

        // Convertendo para array e ordenando por MessageCount
        const sortedUsers = Object.values(allUsers).sort((a, b) => b.MessageCount - a.MessageCount);

        return sortedUsers;
    } catch (err) {
        console.error('Erro ao obter usuários classificados por MessageCount:', err);
        return null;
    }
}

async function getUserRankPositionByMessageCount(userId) {
    try {
        const allUsers = await getAllUsersRankedByMessageCount();
        if (!allUsers) {
            console.error('Erro ao obter usuários classificados por MessageCount.');
            return null;
        }

        const userPosition = allUsers.findIndex(user => user.User_ID === userId) + 1;
        return userPosition;
    } catch (err) {
        console.error('Erro ao obter posição do usuário no ranking:', err);
        return null;
    }
}
async function getUserRank(userId) {
    const userRankSnapshot = await database.ref(`rankMessage/${userId}`).once('value');
    const userRank = userRankSnapshot.val();

    if (userRank) {
        return userRank;
    }
    return null;
}
async function getRanks() {
    try {
        const ranksRef = database.ref('/ranks');
        const ranksSnapshot = await ranksRef.once('value');
        return ranksSnapshot.val();
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function calculateXPLevel(userData) {
    try {
        const allRanks = await getRanks();
        const rankName = userData.Rank;
        const arraySemVazios = allRanks.filter(item => item !== undefined);
        const rankObject = arraySemVazios.find(rank => rank && rank.name === rankName);
        const messageCount = userData.MessageCount;
        const xpAtual = (messageCount + 1) * 10;  // Ajuste conforme necessário
        let proximoRank = arraySemVazios.find(rank => rank.xp > xpAtual);

        if (!proximoRank) {
            proximoRank = xpAtual;
        } else {
            proximoRank = proximoRank.xp;

        }

        return {
            xp: xpAtual,
            level: rankObject.level,
            proximoRankXp: proximoRank
        };
    } catch (err) {
        console.error('Erro ao calcular XP:', err);
        return null;
    }
}


module.exports = {
    calculateXPLevel,
    getUserRank,
    getUserRankPositionByMessageCount
};
