const Client = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports =
{
    name: 'translate',

    execute(prefix, client, message, args)
    {
        const text = args.join(' ');
        let language = " ";

        if (!text)
            return message.reply("Please put a text to translate");

        message.reply('Choose a language:').then(m =>
            {
                m.react('🇬🇧').then(() => m.react('🇫🇷')).then(() => m.react('🇪🇸')).then(() => m.react('🇩🇪')).then(() => m.react('🇯🇵')).then(() => m.react('🇰🇷'));

                const filter = (reaction, user) => 
                {
                    return ['🇬🇧','🇫🇷','🇪🇸','🇩🇪','🇯🇵','🇰🇷'].includes(reaction.emoji.name) && user.id === message.author.id;
                }

                m.awaitReactions
                ({
                    filter,
                    max: 1
                })
                .then(collected =>
                    {
                        const reaction = collected.first();

                        if(reaction.emoji.name === '🇬🇧')
                        {
                            language = 'en';
                        }
                        else if(reaction.emoji.name === '🇫🇷')
                        {
                            language = 'fr'
                        }
                        else if(reaction.emoji.name === '🇪🇸')
                        {
                            language = 'es'
                        }
                        else if(reaction.emoji.name === '🇩🇪')
                        {
                            language = 'de'
                        }
                        else if(reaction.emoji.name === '🇯🇵')
                        {
                            language = 'ja'
                        }
                        else if(reaction.emoji.name === '🇰🇷')
                        {
                            language = 'ko'
                        }
                
                        translate(text, { to: language }).then(m =>
                        {
                            message.reply(m.text);
                        })
                    });
            });
        
    }
}