const Client = require('discord.js');
const dotenv = require('dotenv');
const fs = require('node:fs');

dotenv.config();

const client = new Client.Client
({
    partials:
    [
        "CHANNEL"
    ],
    intents:
    [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING"
    ]
});

client.commands = new Client.Collection();

const prefix = 'dana!';

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (file of commandFiles) 
{
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
};

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
        message.reply('Yes, my child?')
    }

    if (message.content.toLowerCase().match('god dana') !== null)
    {
        message.reply('I hear my name.')
    }

    if (message.content.toLowerCase().match('tiu') !== null && !message.author.bot)
    {
        message.reply('The almighty Messiah Tiu')
    }

    if (message.content.toLowerCase().match('imgg') !== null && !message.author.bot)
    {
        message.reply('iJSD BEST ORG')
    }

    const file = message.attachments.first()?.url;
    
    if (message.guild === null && !message.author.bot)
    {
        client.commands.get('DM').execute(client, message);
    }

    if(message.content.startsWith(prefix)) 
    {
        const [cmd, ...args] = message.content
        .trim()
        .substring(prefix.length)
        .split(/\s+/);

        client.commands.get(cmd).execute(prefix, client, message, args);
    }
})

client.login(process.env.TOKEN)