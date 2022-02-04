const { Command } = require('discord-akairo');

const uwuChannelID = ""             // channel ID for uwu channel goes here

class uwuCommand extends Command {
    constructor() {
        super('uwu', {
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