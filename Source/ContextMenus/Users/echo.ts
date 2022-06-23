import { UserContext } from "../../Interfaces/client.interface"

const command: UserContext = {
    run: (client, interaction) => {
        interaction.reply("Your name is " + interaction?.targetUser.username)
    }
};

export default command;