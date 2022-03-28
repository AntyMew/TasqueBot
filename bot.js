
const { AkairoClient, CommandHandler, ListenerHandler } = require("discord-akairo");
const { Intents } = require("discord.js");
const { database, token } = require("./secret.json");

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
        }).on("load", (command, isReload) => {
            if (typeof command.load === "function")
                command.load(isReload);
        });
        this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        });

        this.dbOptions = database;
    }

    init() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
        this.login(token);
    }
}


const client = new TasqueClient();
client.init();

function exit() {
    client.destroy();
    process.exit();
}

process.on("SIGINT", exit);
process.on("SIGTERM", exit);
