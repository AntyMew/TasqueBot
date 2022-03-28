

//hey so uh. can we not like, do the funny bully thing if my code is bad I'm actually really self conscious about it, ty 


const { Listener } = require('discord-akairo');
const { SelectMenuInteraction, MessageActionRow, MessageSelectMenu } = require('discord.js');
const moment = require('moment-timezone');

const africaData = JSON.parse(JSON.stringify(require('../resources/Africa.json')));
const antarcticaData = JSON.parse(JSON.stringify(require('../resources/Antarctica.json')));
const asiaData = JSON.parse(JSON.stringify(require('../resources/Asia.json')));
const atlanticData = JSON.parse(JSON.stringify(require('../resources/Atlantic.json')));
const carribeanData = JSON.parse(JSON.stringify(require('../resources/Carribean.json')));
const centralAsiaData = JSON.parse(JSON.stringify(require('../resources/CentralAsia.json')));
const europeData = JSON.parse(JSON.stringify(require('../resources/Europe.json')));
const northAmericaData = JSON.parse(JSON.stringify(require('../resources/NorthAmerica.json')));
const oceanaData = JSON.parse(JSON.stringify(require('../resources/Oceana.json')));
const pacificData = JSON.parse(JSON.stringify(require('../resources/Pacific.json')));
const southAmericaData = JSON.parse(JSON.stringify(require('../resources/SouthAmerica.json')));

class SelectMenuListener extends Listener {
    constructor() {
        super('selectMenuEvent', {
            emitter: 'client',
            event: 'interactionCreate'
        });
    }
    async exec(SelectMenuInteraction, jsonList) {
        if (!SelectMenuInteraction.isSelectMenu()) return;
        if (SelectMenuInteraction.customId === "main") {
            switch(String(SelectMenuInteraction.values)) {

                case "AfricaTZs":
                    var row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('AfricaList')
                        .setPlaceholder('Africa Timezones')
                        .addOptions(africaData)
                    )
                    SelectMenuInteraction.reply({ content: 'Please select a timezone', ephemeral: true, components: [row]});
                break;

                    case "AntarcticaTZs":
                        var row = new MessageActionRow()
                        .addComponents(
                            new MessageSelectMenu()
                            .setCustomId('AntarcticaList')
                            .setPlaceholder('Antarctica Timezones')
                            .addOptions(antarcticaData))
                    SelectMenuInteraction.reply({ content: 'Please select a timezone', ephemeral: true, components: [row]});
                    break;

                case "AsiaTZs":
                    var row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('AsiaList')
                        .setPlaceholder('Asia Timezones')
                        .addOptions(asiaData)
                    )
                    SelectMenuInteraction.reply({ content: 'Please select a timezone', ephemeral: true, components: [row]});
                break;

                case "AtlanticTZs":
                    var row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('AtlanticList')
                        .setPlaceholder('Atlantic Timezones')
                        .addOptions(atlanticData)
                    )
                    SelectMenuInteraction.reply({ content: 'Please select a timezone', ephemeral: true, components: [row]});
                break;

                case "CarribeanTZs":
                    var row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('CarribeanList')
                        .setPlaceholder('Carribean Timezones')
                        .addOptions(carribeanData)
                    )
                    SelectMenuInteraction.reply({ content: 'Please select a timezone', ephemeral: true, components: [row]});
                break;

                case "CentralAsiaTZs":
                    var row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('CentralAsiaList')
                        .setPlaceholder('Central Asia Timezones')
                        .addOptions(centralAsiaData)
                    )
                    SelectMenuInteraction.reply({ content: 'Please select a timezone', ephemeral: true, components: [row]});
                break;

                    case "EuropeTZs":
                    var row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('EuropeList')
                        .setPlaceholder('Europe Timezones')
                        .addOptions(europeData)
                    )
                    SelectMenuInteraction.reply({ content: 'Please select a timezone', ephemeral: true, components: [row]});
                break;

                case "NorthAmericaTZs":
                    var row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('NorthAmericaList')
                        .setPlaceholder('North America Timezones')
                        .addOptions(northAmericaData)
                    )
                    SelectMenuInteraction.reply({ content: 'Please select a timezone', ephemeral: true, components: [row]});
                break;

                case "OceanaTZs":
                    var row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('OceanaList')
                        .setPlaceholder('Oceana Timezones')
                        .addOptions(oceanaData)
                    )
                    SelectMenuInteraction.reply({ content: 'Please select a timezone', ephemeral: true, components: [row]});
                break;

                case "PacificTZs":
                    var row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('PacificList')
                        .setPlaceholder('Pacfic Timezones')
                        .addOptions(pacificData)
                    )
                    SelectMenuInteraction.reply({ content: 'Please select a timezone', ephemeral: true, components: [row]});
                break;

                case "SouthAmericaTZs":
                    var row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('SouthAmericaList')
                        .setPlaceholder('South American Timezones')
                        .addOptions(southAmericaData)
                    )
                    SelectMenuInteraction.reply({ content: 'Please select a timezone', ephemeral: true, components: [row]});
                break;
            }
        }
        if (SelectMenuInteraction.customId.includes("List")){
            SelectMenuInteraction.reply({ content: 'you have chosen ' + SelectMenuInteraction.values + " as your timezone!", ephemeral: true})
            console.log(moment.tz(String(SelectMenuInteraction.values)))
        }
    }
}
module.exports = SelectMenuListener;