const Client = require('discord.js');
const {evaluate} = require('mathjs');

module.exports = 
{
    name: 'math',
    description: 'Solves math equations',

    execute(prefix, client, message, args)
    {
        try
        {
            message.reply('Answer: ' + evaluate(args.join(" ")))
        }
        catch (error)
        {
            message.reply("Your equation is not valid.");
            console.log(error)
        }
    }
}