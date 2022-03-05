const Discord = require('discord.js');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const client = new Discord.Client
({
    partials:
    [
        "CHANNEL"
    ],
    intents:
    [
        "GUILDS",
        "GUILD_MESSAGES",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING"
    ]
});

const prefix = 'dana!';

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
});

client.on('messageCreate', async (message) =>
{
    if (message.content.toLowerCase() === 'god dana')
    {
        message.reply
        ({
            content: 'Yes, my child?',
        })
    }

    if (message.content.toLowerCase().match('god dana') !== null)
    {
        message.reply
        ({
            content: 'I hear my name.',
        })
    }

    if (message.content.toLowerCase().match('tiu') !== null && !message.author.bot)
    {
        message.reply
        ({
            content: 'The almighty Messiah Tiu',
        })
    }

    const file = message.attachments.first()?.url;
    
    if (message.guild === null && !message.author.bot)
    {
        if (!file)
        {
            return message.reply
            ({
                content: 'This bot is for the **submission** of source codes. Please attach a file.\n\nIf you have any question regarding a problem set, feel free to use the inquiry channel in the iJSD Server.\n\nIf this message pops up even though you\'ve attached a file, please contact an officer at the iJSD server. Thank you.'
            });
        }

        try
        {
            message.reply
            ({
                content: 'Reading the file! Fetching data..'
            });

            const response = await fetch(file);
            const text = await response.text();

            if (!response.ok)
            {
                message.reply
                ({
                    content: 'There was an error with fetching the file. Please try again\n\nIf you think this is wrong, please contact an officer at the iJSD server. Thank you.'
                });
            }

            if (text)
            {
                const member = message.author.username;

                client.channels.cache.get(process.env.CHANNEL).send("Username: " + member);
                client.channels.cache.get(process.env.CHANNEL).send("Message: " + message.content);

                message.attachments.forEach(attachments =>
                {
                    const url = attachments.url;
                    client.channels.cache.get('949445939603599410').send("File: " + url);
                });

                message.reply
                ({
                    content: 'Thank you for your submission! It will be looked on by the officers now.'
                });
            }
        }
        catch (error)
        {
            console.log(error)
        }
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
            message.delete(1000);
        }
    }
})

client.login(process.env.TOKEN)