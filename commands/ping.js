const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping'],
           ratelimit: 1
        });
    }

    exec(message) {
        return message.lineReply('Pong!');
    }
}

module.exports = PingCommand;