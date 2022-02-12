const { Command } = require("discord-akairo");

class UwuCommand extends Command {
    constructor() {
        super("uwu");
        this.channels = {}
    }

    condition(message) {
        if (message.inGuild() && this.channels[message.guildId] === message.channelId) {
            return message.content.includes("uwu");
        }
    }

    exec(message) {
        return message.reply({
            content: "uwu",
            allowedMentions: {
                repliedUser: false
            }
        });
    }
}

module.exports = UwuCommand;