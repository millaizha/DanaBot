const Client = require('discord.js');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('node:fs');

module.exports = 
{
    name: 'DM',
    description: 'Functions of bot when DMed',

    async execute(client, message, args)
    {
        const file = message.attachments.first()?.url;
        
        const username = message.author;

        dotenv.config();

        if (!file)
        {
            if(message.content === '!ask')
            {
                message.reply('An officer will DM you soon.');
                return client.channels.cache.get(process.env.CHECK_CHANNEL).send('<@' + username.id + '> wants to ask about their submission');
            }
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
                let fileURL = '';

                if(message.content === '')
                {
                    return message.reply
                    ({
                        content: 'Please add a message along with your file using this format:\n\`\`Name | Problem Set Title\`\`\nhttps://imgur.com/ByzytNM'
                    });
                }

                message.attachments.forEach(attachments =>
                {
                    const url = attachments.url;
                    fileURL += url + '\n';
                });

                client.commands.get('submission').execute(client, username, message, fileURL, args);

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
}