require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./slash-commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./slash-commands/${file}`);
    commands.push(command.data);
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: [] })
            .then(() => console.log('Successfully deleted all guild commands.'))
            .catch(console.error);

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
            .then(() => console.log('Successfully deleted all application commands.'))
            .catch(console.error);

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands })
            .then(() => console.log('Successfully reloaded application (/) commands for guild'))
                .catch(console.error);
    } catch (error) {
        console.error(error);
    }
})();