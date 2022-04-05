const { Command } = require("discord-akairo");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { Redis } = require("ioredis");
const discordTime = require("@discordjs/builders").time;
const moment = require("moment-timezone");
const mainOptions = require("../resources/mainOptions.json");

class TimezoneCommand extends Command {
    constructor() {
        super("tz", {
            aliases: ["tz"],
            args: [
                {
                    id: "configOption",
                    match: "flag",
                    flag: ["config", "configure", "set", "setup"]
                },
                {
                    id: "getOption", 
                    match: "flag",
                    flag: ["get"]
                }
            ]
        });
    }

    load() {
        this.database = new Redis(this.client.dbOptions);
    }
    
    exec(message, args) {
        if (args.configOption) {
            
            const row = new MessageActionRow({
                components: new MessageSelectMenu({
                    customId: "timezoneRegion",
                    placeholder: "Please choose one...",
                    options: mainOptions
                })
            });
            
            return message.reply({
                content: "Please select your timezone's region: ",
                components: [row],
                allowedMentions: {
                    repliedUser: false
                }
            });
        }

        if (args.getOption) {
            var userTZ = await this.database.get(message.author.id, () => {
                console.log(message.author.id);
                console.log(userTZ);

                const tzEmbed = new MessageEmbed({
                    color: "#4edde4",
                    title: "01110100 01101001 01101101 01100101",
                    fields: [
                        { name: 'Current time', value: discordTime((Math.round(Date.now() / 1000)), 'f')},
                        { name: 'Local time for ' + message.author.username, value: moment(Date.now()).tz("Australia/Sydney").format("D MMMM Y h:mm A")}
                    ]
                });

                //handle pinging other users
                if (message.mentions.members.first()) {
                    // maybe check if mentioned has a timezone? perhaps nest another if check?
                    if (message.mentions.members.first().user.id != message.author.id ){
                        testEmbed.addFields({ name: 'Local time for ' + message.mentions.members.first().user.username + " (" + placeholderVar + ")", value: '{time} {day} {timezone}'});
                    }
                }
                return message.reply({ embeds: [tzEmbed] });
            });
        }
    }
}

module.exports = TimezoneCommand
