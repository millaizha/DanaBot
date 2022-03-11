const Client = require('discord.js');

module.exports = 
{
    name: 'submit',

    execute (prefix, client, message, args)
    {
        try
        {
            message.author.send('You may send your submission here..');
            message.delete(1000);
        }
        catch (DiscordAPIError)
        {
            console.log(DiscordAPIError)
            message.reply('It seems I can\'t DM you 😟. \n\nPlease allow DMs from server members by toggling it in your privacy settings')
        }
        
    }
}
