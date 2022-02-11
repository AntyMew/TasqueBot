const { time, userMention } = require("@discordjs/builders");
const { Command } = require("discord-akairo");
const chrono = require("chrono-node");
const Bull = require("bull");

async function jobHandler(job) {
    const data = job.data;
    const channel = await this.channels.fetch(data.channelId);
    channel.messages.fetch(data.messageId)
        .then(async message => await message.reply(`${data.reminder}!`))
        .catch(async () => await channel.send(`${userMention(data.authorId)}, ${data.reminder}!`));
}

class RemindCommand extends Command {
    constructor() {
        super("remind", {
           aliases: ["remind", "remindme"],
           args: [
               {
                   id: "input",
                   type: "string",
                   match: "content"
               }
           ],
           ratelimit: 1
        });
    }

    load() {
        this.queue = new Bull("reminders", { redis: this.client.dbOptions });
        this.queue.process(jobHandler.bind(this.client));
    }

    exec(message, args) {
        if (!args.input)
            return message.reply("What do you want to be reminded about and when?");

        const results = chrono.parse(args.input, Date.now(), { forwardDate: true });

        if (!results || !results[0])
            return message.reply("Could not parse time!");

        const result = results[0];
        const reminder = args.input.replace(result.text, "").trim();
        const date = result.date();

        if (!reminder)
            return message.reply("What do you want to be reminded about?");

        var data = {
            channelId: message.channelId,
            messageId: message.id,
            authorId: message.author.id,
            reminder: reminder
        };

        const delay = Math.max(date.getTime() - Date.now(), 0);
        this.queue.add(data, { delay: delay });
        return message.reply(`"${reminder}" ${time(date, "R")}`);
    }
}

module.exports = RemindCommand;