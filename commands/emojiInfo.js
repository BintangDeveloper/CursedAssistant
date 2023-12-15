const { PermissionsBitField } = require('discord.js');
const { Colors, message } = require('../main.js');
module.exports = {
    data: {
        name: 'emojiinfo',
        description: 'Get information of emoji',
        options: [{
            name: 'emoji_name',
            type: 3,
            description: 'Emoji name in this server.',
            required: true
        }]
    },
    async execute(interaction) {
        const member = interaction.member;
        const {
            options
        } = interaction;
        
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

            const emojiName = options.getString('emoji_name');

            const emoji = interaction.guild.emojis.cache.find(
                emoji => emoji.name === emojiName
            );

    if (emoji) {
        const emojiFormat = emoji.animated ?
            `<a:${emoji.name}:${emoji.id}>` :
            `<:${emoji.name}:${emoji.id}>`;

        /*
        const embed = new MessageEmbed()
          .setTitle('Informasi Emoji')
          .setColor('#00ff00')
          .setDescription(`Preview: ${emojiFormat}\nName: ${emoji.name}\nID: ${emoji.id}\nFormat: ${emojiFormat}`);
        */

        await interaction.reply(
            {
                ephemeral: true,
                embeds: [
                        {
                            description: 'Emoji Info:'
                },
                        {
                            title: 'Preview',
                            description: emojiFormat
                },
                        {
                            title: 'Format',
                            description: `\\${emojiFormat}`
                },
                        {
                            description: `Preview: ${emojiFormat}\nName: ${emoji.name}\nID: ${emoji.id}\nFormat: \\${emojiFormat}`
                }
                        ]
            }
        );
    } else {
        await interaction.reply(
            {
                ephemeral: true,
                embeds: [{
                    color: Colors.error,
                    description: 'Emoji not found.'
                }]
            }
        );
    }
        
    },
};
