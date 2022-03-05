const Client = require('discord.js');

module.exports =
{
    name: 'send-submission-stat',
    description: 'Announce members who got a problem set correct or DM them if they\'re wrong',

    execute(client, username, message, status, args)
    {
        if(status === 'correct')
        {
            message.reply('✅ **Hi there! Your submission is correct!**\n+1 leaderboard point!\nCongratulations, have a cookie and a mountain dew! 🍪🥤');
            message.react('🎉');
            message.react('🍪');
            message.react('🥤');

            const announcement = '✅ **Submission of <@' + username.id + '> is correct!**\n+1 leaderboard point!\nCongratulations, have a cookie and a mountain dew! 🍪🥤\n\n*_Others may still submit for checking_*';

            client.channels.cache.get(process.env.POST_CHANNEL)
                .send(announcement).then(m =>
                    {
                        m.react('🎉').then(() => m.react('🍪')).then(() => m.react('🥤'));
                    });
        }
        else if(status === 'wrong')
        {
            message.reply
            ({
                content: 'Hi there! It seems like you are incorrect on this problem set 😟\n\nDon\'t worry, you can still try answering it and submit another one!\n\nIf you want to consult, please type `!ask` and an officer will DM you soon. ',
            });
        }
    }
}