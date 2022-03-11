const Client = require('discord.js');

module.exports = 
{
    name: 'help',
    description: 'Lists all available commands',

    execute (prefix, client, message, args)
    {
        const help = new Client.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Prefix: `dana!`')
            .setAuthor('Command List', message.author.displayAvatarURL())
            
            .addFields
            ({
                name: 'About this bot',
                value: 'A Dana Discord bot using JavaScript'
            },
            {
                name: 'Chat',
                value: '`signofthecross`'
            },
            {
                name: 'Game',
                value: '` `'
            },
            {
                name: 'Misc',
                value: '`math` | `translate`'
            },
            {
                name: 'Submit your problem set answer',
                value: '`submit`'
            });

        message.reply({ embeds: [help] });
    }
}