const discordTime = require("@discordjs/builders").time;
const { Command } = require("discord-akairo");
const chrono = require("chrono-node");

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

    exec(message, args) {
        if (!args.input)
            return message.reply("What do you want to be reminded about and when?");

        const results = chrono.parse(args.input, Date.now(), { forwardDate: true });

        if (!results || !results[0])
            return message.reply("Could not parse time!");

        const result = results[0];
        const reminder = args.input.replace(result.text, "").trim();
        const time = result.date();

        if (!reminder)
            return message.reply("What do you want to be reminded about?");

        return message.reply(`"${reminder}" ${discordTime(time, "R")}`);
    }
}

module.exports = RemindCommand;