const { Command } = require('discord-akairo');

const uwuChannelID = "898605369411133472"

class uwuCommand extends Command {
    constructor() {
        super('uwu', {
            aliases: ['uwu'],
        });
    }

    condition(message){
        if(message.channel.id == uwuChannelID && message.content.includes("uwu")){  
            return true;
        }
    }

    exec(message) {
        return message.lineReply("uwu");
    }
}

module.exports = uwuCommand;