const randomstring = require('randomstring');
const { database } = require('../../config/firebaseConfig');
const { calculateXPLevel, getUserRank } = require('../level/xp');
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
async function initializeRanks() {
    try {
        const ranksRef = database.ref('/ranks');
        await ranksRef.set({
            1: { name: 'Novato', messages: 0, xp: 0, level: 1 },
            2: { name: 'Recruta', messages: 10, xp: 100, level: 2 },
            3: { name: 'Prospecto', messages: 20, xp: 200, level: 3 },
            4: { name: 'Executor', messages: 50, xp: 500, level: 4 },
            5: { name: 'Capitão', messages: 100, xp: 1000, level: 5 },
            6: { name: 'Tenente', messages: 200, xp: 2000, level: 6 },
            7: { name: 'Sargento', messages: 300, xp: 3000, level: 7 },
            8: { name: 'Vice-Presidente', messages: 500, xp: 5000, level: 8 },
            9: { name: 'Presidente', messages: 1000, xp: 10000, level: 9 },
        });
    } catch (err) {
        console.log(err);
    }
}
async function updateRank(oldRanks,currentCount) {
    try {
        const allRanks = await getRanks();
        let rankAtual = oldRanks ? oldRanks : 'Novato';
        const exactMatchRank = Object.entries(allRanks).find(([rank, data]) => currentCount === data.messages);
        const rankName = exactMatchRank ? exactMatchRank[1].name : rankAtual
        return rankName;
    } catch (err) {
        console.error('Erro ao atualizar o rank:', err);
        return null;
    }
}
async function logMessage(message, route) {
    try {
        const id = message.author.id;
        const userRef = database.ref(route + id);
        const userSnapshot = await userRef.once('value');

        const currentCount = userSnapshot.exists() ? userSnapshot.val().MessageCount || 0 : 0;
        const oldRank = userSnapshot.exists() ? userSnapshot.val().Rank : null;
        const newCount = currentCount + 1;
        const playerRank = await updateRank(oldRank,newCount);
        const userData = await getUserRank(id);
        const xpLevel = await calculateXPLevel(userData);

        if (playerRank !== oldRank) {
            message.reply(`${message.author.username} está agora no rank: ${playerRank}`);
        }

        const updateData = {
            LastMessage: message.content,
            User: message.author.username,
            User_ID: id,
            MessageCount: newCount,
            Rank: playerRank,
            Xp: xpLevel.currentXP
        };

        if (userSnapshot.exists()) {
            await userRef.update(updateData);
        } else {
            await userRef.set(updateData);
        }
    } catch (err) {
        console.error('Erro ao processar mensagem:', err);
    }
}

async function logForms(route, objectLog) {
    try {
        let id = randomstring.generate(7);
        const interactionRoute = route + id;
        const formRef = database.ref(interactionRoute);
        await formRef.set(objectLog);
    } catch (err) {
        console.log(err);
    }
}

async function logCommand(interaction, route) {
    try {
        let id = interaction.user.id;
        let command = interaction.command.name;
        const userRef = database.ref(route + id +  '-' + command);
        const userSnapshot = await userRef.once('value');
        const currentCount = userSnapshot.val() ? userSnapshot.val().usages || 0 : 0;
        const newCount = currentCount + 1;
        let userName = interaction.member.nickname;

        await database.ref(route + id +  '-' + command).set({
            userName: userName,
            usages: newCount,
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = { logMessage, logCommand, logForms };