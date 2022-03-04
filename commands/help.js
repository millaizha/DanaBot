const Discord = require('discord.js')

module.exports =
{
    name: "help",
    description: "Simple help command",

    async run (bot, message, args)
    {
        const help = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Prefix" `dana!`')
        .setAuthor('Command List', message.author.displayAvatarURL())

        .addFields
        ({
            name: 'About this bot',
            value: 'A Dana bot using JavaScript'
        },
        {
            name: 'Chat',
            value: '`imgg` | `signofthecross`'
        },
        {
            name: 'Submit your problem set answer',
            value: '`submit`'
        })

        message.channel.send(help)
    }
}