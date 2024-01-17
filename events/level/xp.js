const { database } = require("../../config/firebaseConfig");

async function getAllUsersRankedByMessageCount() {
    try {
        const usersSnapshot = await database.ref(`rankMessage`).once('value');
        const allUsers = usersSnapshot.val();

        // Convert to array and sort by MessageCount
        const sortedUsers = Object.values(allUsers).sort((a, b) => b.MessageCount - a.MessageCount);

        return sortedUsers;
    } catch (err) {
        console.error('Error getting users ranked by MessageCount:', err);
        return null;
    }
}

async function getUserRankPositionByMessageCount(userId) {
    try {
        const allUsers = await getAllUsersRankedByMessageCount();
        if (!allUsers) {
            console.error('Error getting users ranked by MessageCount.');
            return null;
        }

        const userPosition = allUsers.findIndex(user => user.User_ID === userId) + 1;
        return userPosition;
    } catch (err) {
        console.error('Error getting user position in the ranking:', err);
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
        let rankObject;
        let nonEmptyArray = [];

        if (userData && userData.rank) {
            const rankName = userData.rank;
            nonEmptyArray = allRanks.filter(item => item !== undefined);
            rankObject = nonEmptyArray.find(rank => rank && rank.name === rankName);
        }

        let initialXP;
        let level = 0;

        if (rankObject) {
            initialXP = rankObject.xp;
            level = rankObject.level;
        }

        const messageCount = userData && userData.MessageCount ? userData.MessageCount : 0;
        const currentXP = (messageCount + 1) * 10;  // Adjust as needed
        let nextRank = nonEmptyArray.find(rank => rank.xp > currentXP);

        if (!nextRank) {
            nextRank = currentXP;
        } else {
            nextRank = nextRank.xp;
        }

        return {
            initialXP: initialXP,
            currentXP: currentXP,
            level: level,
            nextRankXP: nextRank
        };
    } catch (error) {
        console.error("Erro ao processar dados de classificação:", error);
        // Trate o erro conforme necessário
    }
}

module.exports = {
    calculateXPLevel,
    getUserRank,
    getUserRankPositionByMessageCount
};
