import { Context } from "../../Interfaces/client.interface"

const command: Context = {
    run: (client, interaction) => {
        console.log(interaction.reply("test"));
    }
};

export default command;