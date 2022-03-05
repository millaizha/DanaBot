const Client = require('discord.js');

module.exports = 
{
    name: 'submit',

    execute (prefix, client, message, args)
    {
        message.author.send('You may send your submission here..');
        message.delete(1000);
    }
}
