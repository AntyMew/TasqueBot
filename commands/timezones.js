const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Listener } = require('discord.js');
const { Command } = require('discord-akairo');
const discordTime = require('@discordjs/builders').time;
const redis = require('redis');
const moment = require('moment-timezone');
const mainOptions = JSON.parse(JSON.stringify(require('../resources/mainOptions.json')));
const dateFormat = "D MMMM Y h:mm A"

const redisClient = redis.createClient();   //my shitty implimentation of getting this shit to work

async function redisServer(){
    await redisClient.connect()
        .then(()=> {
        console.log("redis client connected!")
    });
    redisClient.on('error', (err) => console.log("An error has occured in the Redis client!", err));
}

redisServer()

class tzCommand extends Command {
    constructor() {
        super('tz', {
            aliases: ['tz'],
            args: [
                {
                    id: 'configOption',
                    match: 'flag',
                    flag: ['-s', '-c', '-configure', '--set', '--setup', 'config', 'configure', 'set', 'setup']
                },
                {
                    id: 'getOption', 
                    match: 'flag',
                    flag: ['-g', '--get', 'get']
                },
                {
                    id: 'input',
                    type: 'string',
                    match: 'text'
                }
            ]
        });
    }
    
exec(message, args) {
// ################################################################################################################                 tz list
        if (args.configOption) {
            
            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('main')
                        .setPlaceholder('Please choose one...')
                        .addOptions(mainOptions)
                );
            
            return message.reply({
                content: "Please select your timezone's region: ",
                components: [row],
                allowedMentions: {
                    repliedUser: false
                }
            });
        }           //actually choosing timezones is handled in listeners/selectmenulistener.js

// ################################################################################################################                 tz get

        if (args.getOption) {

// ##################################                 Message embed definition
            // console.log(retrieveUserDBInfo(message.author.id));
            // console.log(String(retrieveUserDBInfo(message.author.id)));      //debugging shit
            
            async function sendUserTZInfo() {
                var userTZ = await redisClient.GET((String(message.author.id))).then(() => {
                console.log(message.author.id);
                console.log(userTZ);
                        const tzEmbed = new MessageEmbed()
                            .setColor('#4edde4')
                            .setTitle('01110100 01101001 01101101 01100101')
                            .addFields(
                                //{ name: 'Current time UTC', value: moment(Date.now()).tz("UTC")},
                                { name: 'Current time', value: discordTime((Math.round(Date.now() / 1000)), 'f')},
                                { name: 'Local time for ' + message.author.username, value: moment(Date.now()).tz("Australia/Sydney").format(dateFormat)}
                                );
                //handle pinging other users
                if (message.mentions.members.first()) {            // maybe check if mentioned has a timezone? perhaps nest another if check?
                    if (message.mentions.members.first().user.id != message.author.id ){
                        testEmbed.addFields({ name: 'Local time for ' + message.mentions.members.first().user.username + " (" + placeholderVar + ")", value: '{time} {day} {timezone}'});
                    }
                }
                return message.reply({ embeds: [tzEmbed] });
            });
            };
// ##################################                 the rest of the stuff 

        }
    
    else {
        redisClient.set('bar2', 'foo3', (err, reply) => {
            if (err) throw err;
            console.log(reply);
        });
        return message.reply({
            content: "redis test in progress....", //please specify an option! \n Options are: \n -s / -c / set / configure \n -g / get. \n To get another users timezone, use !tz get @user.
            allowedMentions: {
                repliedUser: false
            }
        })
    }
    }
}

module.exports = tzCommand

