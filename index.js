const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Discord.Client
({
    intents:
    [
        "GUILDS",
        "GUILD_MESSAGES",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING"
    ]
});

const prefix = 'dana!'

client.on("error", console.error);

client.on('ready', () => 
{
    console.log('Dana is ready');

    client.user?.setPresence
    ({
        activities: 
        [{
            name: 'dana!help',
            type: 'LISTENING'
        }]
    });
})

client.on('messageCreate', async (message) =>
{
    if (message.content.toLowerCase() === 'god dana')
    {
        message.reply
        ({
            content: 'Yes, my child?',
        })
    }
    
    if (message.channel.type === 'DM' && !message.author.bot)
    {
        message.reply
        ({
            content: 'Hi there! Your submission will be looked on by the officers now.'
        });
    }

    if(message.content.startsWith(prefix)) 
    {
        const [cmd, ...args] = message.content
        .trim()
        .substring(prefix.length)
        .split(/\s+/);
        console.log(cmd, args);


        if (cmd === 'help')
        {
            const helpEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Prefix: `dana!`')
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
            });

            message.reply({ embeds: [helpEmbed] });
        }
        else if (cmd === 'signofthecross') 
        {
            message.reply('In the name of SirTiu(), SirRaden(), and the iJSD(). Amen!')
        }

        else if (cmd === 'imgg')
        {
            message.reply('iJSD BEST ORG')
        }
        
        else if (cmd === 'submit')
        {
            message.author.send('You may send your submission here..')
        }
    }

})

client.login(process.env.TOKEN)