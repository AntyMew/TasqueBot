const { Listener } = require('discord-akairo');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const moment = require('moment-timezone');

const timezoneData = require("../resources/timezones.json")

class InteractionListener extends Listener {
    constructor() {
        super('selectMenuEvent', {
            emitter: 'client',
            event: 'interactionCreate'
        });
    }

    async exec(interaction) {
        if (!interaction.isSelectMenu())
            return;

        if (interaction.customId === "timezoneRegion") {
            const region = interaction.values[0];
            var row = new MessageActionRow({
                components: new MessageSelectMenu({
                    customId: "timezoneSubregion",
                    placeholder: `${region} timezones`,
                    options: timezoneData[region]
                })
            });

            interaction.reply({ content: "Please select a timezone", ephemeral: true, components: [row]});
        }

        if (interaction.customId === "timezoneSubregion"){
            interaction.reply({ content: "you have chosen " + interaction.values + " as your timezone!", ephemeral: true})
            console.log(moment.tz(interaction.values[0]))
        }
    }
}

module.exports = InteractionListener;
