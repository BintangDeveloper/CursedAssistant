const { 
    Client, 
    Collection, 
    Events, 
    GatewayIntentBits, 
    REST, 
    ActivityType,
} = require('discord.js');

const { Colors, Whitelisted, Emoji, message } = require('./main.js');

const fs = require('fs');
const path = require('path');
const { Routes } = require('discord-api-types/v9');

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

function web(e)
{
    app.get(
        '/', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ status: "online", message: "Bot is online now!", data: e.user }, null, 2));
        }
    );
    app.listen(
        port, () => {
            console.log(`[INFO] Server is running on port ${port}`);
        }
    );
}

const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;
const token = process.env.TOKEN;

// Create a new client instance
const client = new Client(
    { 
        intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        ] 
    }
);

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '9' }).setToken(token);

async function deployCommands()
{
    try {
        const commands = client.commands.map(command => command.data);
        const guildIds = await client.guilds.fetch().then(guilds => guilds.map(guild => guild.id));

        console.log(`[INFO] Refreshing ${commands.length} application commands.`);

        for (const guildId of guildIds) {
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
        }

        console.log(`[INFO] Successfully reloaded ${commands.length} application commands.`);
    } catch (error) {
        console.error(error);
    }
}

// Function to handle guild create event
async function handleGuildCreate(guild)
{
    console.log(`[INFO] Bot joined a new server with ID: ${guild.id}`);
    await deployCommands();
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(
    Events.ClientReady, c => {
    console.log(`[INFO] Ready! Logged in as ${c.user.tag}`);
    client.user.setPresence(
            {
            activities: [{
                name: `The user's`,
                type: ActivityType.Watching
            }],
            status: 'idle',
            }
        );
    web(c);
    deployCommands(); // Deploy commands when the bot starts
    }
);

client.on(Events.GuildCreate, handleGuildCreate);

client.on(
    Events.InteractionCreate, async interaction => {
    console.log(interaction);
    console.log(`[INFO] Received interaction: ${interaction.commandName}`);
    if (!interaction.isCommand()) {
        console.log('[INFO] Not a command interaction. Exiting...');
        return;
    }
    const { commandName } = interaction;
    const command = client.commands.get(commandName);
    if (!command) {
        console.error(`[ERROR] No command matching ${commandName} was found.`);
        await interaction.reply(
        {
            embeds: [{
                color: Colors.inv,
                description: `${Emoji.error} No command matching ${commandName} was found.`
            }],
            ephemeral: true 
        }
        );
        return;
    }
    try {
        console.log(`[INFO] Executing command: ${commandName}`);
        await command.execute(interaction);
    } catch (error) {
            console.error(error);
            await interaction.reply(
        {
                embeds: [{
                    color: Colors.inv,
                    description: `${Emoji.error} There was an error while executing the ${interaction.commandName} command!`
                }],
                ephemeral: true 
                    }
            );
    }
    }
);

// Log in to Discord with your client's token
client.login(token);
