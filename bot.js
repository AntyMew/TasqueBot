const { AkairoClient, CommandHandler } = require("discord-akairo");
const { Intents } = require("discord.js");
const { token } = require("./secret.json");

class TasqueClient extends AkairoClient {
    constructor() {
        super({
            ownerID: "119926342111330304"
        }, {
            disableMentions: "everyone",
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
        });

        this.commandHandler = new CommandHandler(this, {
            directory: "./commands/",
            prefix: "!",
            defaultCooldown: 1000
        });
    }

    init() {
        this.commandHandler.loadAll();
        client.login(token);
    }
}

const client = new TasqueClient();
client.init();
