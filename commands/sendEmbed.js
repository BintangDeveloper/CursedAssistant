const { PermissionsBitField } = require('discord.js');
const { Colors, message } = require('../main.js');

module.exports = {
    data: {
        name: 'sendembed',
        description: 'Send an embedded message to a specific channel.',
        options: [
        {
            name: 'channel',
            type: 7,
            description: 'The channel where the message will be sent.',
            required: true,
        },
        {
            name: 'title',
            type: 3,
            description: 'The title of the embedded message.',
            required: true,
        },
        {
            name: 'description',
            type: 3,
            description: 'The description of the embedded message.',
            required: true,
        },
        {
            name: 'image',
            type: 3,
            description: 'The URL of the image.',
            required: false,
        },
        {
            name: 'footer',
            type: 3,
            description: 'The footer of the embedded message.',
            required: false,
        },
        {
            name: 'color',
            type: 3,
            description: 'The color of the embed.',
            required: false,
        },
        ],
        defaultPermission: false
    },
    async execute(interaction) {
        const member = interaction.member; // Get the member object
        const channel = interaction.options.getChannel('channel');
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const image = interaction.options.getString('image') || null;
        const footer = interaction.options.getString('footer') || null;
        const color = interaction.options.getString('color') || "FFFFFF";

        const requiredPermissions = [
        PermissionsBitField.Flags.Administrator
        ];

        if (!member.permissions.has(requiredPermissions)) {
            return interaction.reply(
                {
                    ephemeral: true,
                    embeds: [{
                        color: Colors.error,
                        description: message().NeedPermission()
                    }]
                }
            );
        }

        const sendEmbed = {
            color: parseInt(color, 16),
            title: title,
            description: description,
            image: {
                url: image
            },
            footer: {
                text: footer,
            },
        };

        try {
            await channel.send(
                {
                    embeds: [sendEmbed]
                }
            );
            await interaction.reply(
                {
                    ephemeral: true,
                    embeds: [{
                        color: Colors.success,
                        description: message().success("Embed sent successfully")
                    }]
                }
            );
        } catch (error) {
            console.error('Error sending embed message:', error);
        }
    },
};
