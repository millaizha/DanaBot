const Client = require('discord.js');

module.exports =
{
    name: 'submission',
    description: 'Module to forward all submitted source codes and let officers check',

    execute(client, username, message, fileURL, args)
    {
        const fileForward = new Client.MessageEmbed()
            .setColor("BLUE")
            .setTitle('New submission')
                    
            .addFields
            ({
                name: 'Discord Name',
                value: '@' + username.tag
            },
            {
                name: 'Message',
                value: '' + message.content
            },
            {
                name: 'File URL',
                value: '' + fileURL
            },
            {
                name: 'React',
                value: '✅: correct\n⛔: wrong'
            });
        
        const fileCorrect = new Client.MessageEmbed()
            .setColor("GREEN")
            .setTitle('Correct submission')
                    
            .addFields
            ({
                name: 'Discord Name',
                value: '@' + username.tag
            },
            {
                name: 'Message',
                value: '' + message.content
            },
            {
                name: 'File URL',
                value: '' + fileURL
            });
        
        const fileWrong = new Client.MessageEmbed()
            .setColor("RED")
            .setTitle('Wrong submission')
                    
            .addFields
            ({
                name: 'Discord Name',
                value: '@' + username.tag
            },
            {
                name: 'Message',
                value: '' + message.content
            },
            {
                name: 'File URL',
                value: '' + fileURL
            });  
        
        let status = '';
                
        client.channels.cache.get(process.env.CHECK_CHANNEL)
            .send({ embeds: [fileForward] }).then(m =>
            {
                m.react('✅').then(() => m.react('⛔'));

                const filter = (reaction, user) => 
                {
                    return ['✅','⛔'].includes(reaction.emoji.name) && user.id === process.env.PRES || user.id === process.env.VPE || user.id === process.env.VPI || user.id === process.env.SEC || user.id === process.env.TRES || user.id === process.env.PRO;
                }

                m.awaitReactions
                ({
                    filter,
                    max: 1
                })
                .then(collected =>
                    {
                        const reaction = collected.first();

                        if(reaction.emoji.name === '✅')
                        {
                            m.edit({ embeds: [fileCorrect] });
                            status = 'correct'
                        }
                        else if(reaction.emoji.name === '⛔')
                        {
                            m.edit({ embeds: [fileWrong] });
                            status = 'wrong'
                        }

                    client.commands.get('send-submission-stat').execute(client, username, message, status, args);
                    });
            });
    }
}