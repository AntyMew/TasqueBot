const { Command } = require("discord-akairo");

class MeowCommand extends Command {
    constructor() {
        super("meow", {
            aliases: ["meow"],
            args: [
                {
                    id: "input",
                    type: "string",
                    match: "content"
                }
            ]
        });
    }

    exec(message, args) {
        var reply = "";

        if (!args.input)
            reply = "meow";

        var input = new TextEncoder().encode(args.input);
        input.forEach(x => {
            for (var i = 0; i < 8; i++) {
                reply += (x & 0x80) ? "ow" : "me";
                x <<= 1;
            }
            
            reply += " ";
        });

        return message.reply({
            content: reply,
            allowedMentions: {
                repliedUser: false
            }
        });
    }
}

module.exports = MeowCommand;