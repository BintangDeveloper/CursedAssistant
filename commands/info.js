const { Discord, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Whitelisted, msToTime, Colors, message } = require('../main.js');

const { InteractionResponseType } = require('discord-api-types/v9');

const autoCorrectDictionary = {
    dvlp: 'developer',
    bbot: 'bot',
};

module.exports = {
    data: {
        name: 'info',
        description: 'Get information by type.',
        options: [
        {
            name: 'type',
            description: 'The type of information to display.',
            type: 3,
            required: false,
            choices: [
            {
                name: 'Developer',
                value: 'developer',
            },
            {
                name: 'Bot',
                value: 'bot',
                description: 'Information about this bot.'
            },
            ]
        }
        ]
    },
    async execute(interaction) {
        const webButton = new ButtonBuilder().setLabel('See the website').setURL('https://BintangDeveloper.eu.org/').setStyle(ButtonStyle.Link);
        const rowButtons = new ActionRowBuilder().addComponents(webButton);
        const bot = interaction.client.user;
        // Check if the 'type' option was provided
        const infoType = interaction.options.getString('type');

        let response = {
            title: '',
            description: '',
            color: parseInt("2B2D31", 16),
        };

        if (!infoType) {
            response.title = 'Developer Information';
            response.description = '>>> 🔒 The bot for private use.\nand can only be used on a specific servers or whitelisted servers, and not all users can use this bot only whitelisted users.';
        } else {
            // Auto-correct if applicable
            const correctedType = autoCorrectDictionary[infoType.toLowerCase()] || infoType;

            if (correctedType === 'developer') {
                response.title = 'Developer Information';
                response.description = '>>> 🔒 The bot for private use.\nand can only be used on a specific servers or whitelisted servers, and not all users can use this bot only whitelisted users.';
            } else if (correctedType === 'bot') {
                response.description = '';
                response.fields = [
                {
                    name: 'Bot Name',
                    value: bot.tag
                },
                {
                    name: 'Bot ID',
                    value: bot.id
                },
                {
                    name: 'Ping', 
                    value: `${interaction.client.ws.ping}ms`
                },
                {
                    name: 'Uptime', 
                    value: msToTime(interaction.client.uptime)
                }
                ];
            } else {
                response.description = `Type "${infoType}" is not recognized.`;
                response.color = Colors.error;
            }

            //response.title = correctedType;
        }

        response.footer = {
            text: `@${bot.username}`,
            icon_url: bot.avatarURL({ format: "png", dynamic: true, size: 256 }),
        };

        await interaction.reply(
            {
                embeds: [ response ],
                components: [ rowButtons ],
                ephemeral: true
            }
        );
    },
};
