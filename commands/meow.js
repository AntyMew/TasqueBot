const { Command } = require('discord-akairo');

class AddCommand extends Command {
    constructor() {
        super('meow', {
            aliases: ['meow'],
            args: [
                {
                    id: 'input',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    exec(message, args) {
        var reply = '';

        if (!args.input)
            reply = 'meow';

        var input = new TextEncoder().encode(args.input);
        input.forEach(x => {
            for (var i = 0; i < 8; i++) {
                reply += (x & 0x80) ? 'ow' : 'me';
                x <<= 1;
            }
            
            reply += ' ';
        });

        reply += `(${args.input})`;
        return message.lineReply(reply);
    }
}

module.exports = AddCommand;