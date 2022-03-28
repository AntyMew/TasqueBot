const { Command } = require("discord-akairo");

class PingCommand extends Command {
    constructor() {
        super("ping", {
            aliases: ["ping"],
            ratelimit: 1
        });
    }

    exec(message) {
        return message.reply({
            content: "Pong!",
            allowedMentions: {
                repliedUser: false
            }
        });
    }
}

module.exports = PingCommand;