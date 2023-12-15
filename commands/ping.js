const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'ping',
        description: 'Replies with Pong',
    },
    async execute(interaction) {
        const botLatency = Math.round(interaction.client.ws.ping);
        const embedColor = parseInt('00FT00',16); // Replace with your desired embed color

        await interaction.reply(
            {
                ephemeral: true,
                embeds: [{
                    color: embedColor,
                    description: `Pong! Bot latency is ${botLatency}ms.`,
                }],
            }
        );
    },
};
