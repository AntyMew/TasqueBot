const { AkairoClient, CommandHandler } = require('discord-akairo');
const { Intents } = require('discord.js');
require('discord-reply');
const { token } = require('./secret.json');

class TasqueClient extends AkairoClient {
    constructor() {
        super({
            ownerID: '119926342111330304'
        }, {
            disableMentions: 'everyone',
            intents: [Intents.FLAGS.GUILDS]
        });

        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: '!',
            defaultCooldown: 1000
        });

        this.commandHandler.loadAll();
    }
}

const client = new TasqueClient();
client.login(token);