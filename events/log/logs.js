const randomstring = require('randomstring');
const { database } = require('../../config/firebaseConfig');
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
            NOVICE: { name: 'Novato', messages: 0 },
            ROOKIE: { name: 'Recruta', messages: 10 },
            PROSPECT: { name: 'Prospecto', messages: 20 },
            ENFORCER: { name: 'Executor', messages: 50 },
            CAPTAIN: { name: 'Capitão', messages: 100 },
            LIEUTENANT: { name: 'Tenente', messages: 200 },
            SERGEANT: { name: 'Sargento', messages: 300 },
            VICE_PRESIDENT: { name: 'Vice-Presidente', messages: 500 },
            PRESIDENT: { name: 'Presidente', messages: 1000 },
        });
    } catch (err) {
        console.log(err);
    }
}
async function updateRank(currentCount) {
    try {
        const allRanks = await getRanks();

        for (const [rank, data] of Object.entries(allRanks)) {
            if (currentCount >= data.messages) {
                return data.name;
            }
        }

        return null;
    } catch (err) {
        console.error('Error updating rank:', err);
        return null;
    }
}

async function logMessage(message, route) {
    try {
        const id = message.author.id;
        const userRef = database.ref(route + id);
        const userSnapshot = await userRef.once('value');
        const currentCount = userSnapshot.val() ? userSnapshot.val().MessageCount || 0 : 0;
        const oldRank = userSnapshot.val().Rank;
        const newCount = currentCount + 1;
        const playerRank = await updateRank(newCount);

        if (playerRank != oldRank) {
            message.reply(`${message.author.username} está agora no rank: ${playerRank}`);
        }

        await userRef.set({
            LastMessage: message.content,
            User: message.author.username,
            User_ID: id,
            MessageCount: newCount,
            Rank: playerRank
        });
    } catch (err) {
        console.log(err);
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

        await database.ref(route + id +  '-' + command).set({
            userName: interaction.user.displayName.toString(),
            usages: newCount,
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = { logMessage, logCommand, logForms };