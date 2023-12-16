const { PermissionsBitField } = require('discord.js');
const { Colors, message } = require('../main.js');

module.exports = {
    data: {
        name: 'xsend',
        description: 'You should dont know',
        options: [
        {
            name: 'channel',
            type: 7,
            description: 'The channel where the message will be sent.',
            required: true,
        },
        {
            name: 'json',
            type: 3,
            description: 'The json of the embedded message.',
            required: true,
        },
        ]
    },
    async execute(interaction) {
        const member = interaction.member; // Get the member object
        const channel = interaction.options.getChannel('channel');
        const jsonString = interaction.options.getString('json');
        
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
        
        let parsedJSON;
        try {
            parsedJSON = JSON.parse(jsonString);
        } catch (error) {
            return interaction.reply({
                ephemeral: true,
                content: 'Invalid JSON format. Please provide valid JSON.'
            });
        }
        
        try {
            await channel.send(parsedJSON);
            await interaction.reply({
                ephemeral: true,
                content: 'Embed sent successfully!'
            });
        } catch (error) {
            console.error('Error sending embed message:', error);
        }
        
    },
};
