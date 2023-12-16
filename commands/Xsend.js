const { Permissions } = require('discord.js');

module.exports = {
    data: {
        name: 'xsend',
        description: 'Send a message JSON to the channel.',
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
                description: 'The JSON format of the message.',
                required: true,
            }
        ]
    },
    async execute(interaction) {
        const member = interaction.member;
        const channel = interaction.options.getChannel('channel');
        const jsonString = interaction.options.getString('json');

        let parsedJSON;
        try {
            parsedJSON = JSON.parse(jsonString);
        } catch (error) {
            return interaction.reply({
                ephemeral: true,
                content: 'Invalid JSON format. Please provide valid JSON.'
            });
        }

        const requiredPermissions = Permissions.FLAGS.ADMINISTRATOR;

        if (!member.permissions.has(requiredPermissions)) {
            return interaction.reply({
                ephemeral: true,
                content: 'You need administrator permissions to use this command.'
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
