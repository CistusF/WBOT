import { Command } from "../Interfaces/client.interface";

const command: Command = {
    description: "Check Bot's Ping",
    run: (client, interaction) => {
        interaction.reply("Pong");
    }
};

export default command;