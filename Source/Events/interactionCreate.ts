import { event } from "../Interfaces/client.interface";
import chalk from "chalk";
import { CacheType, CommandInteraction, Collection, MessageContextMenuCommandInteraction, Interaction, SelectMenuInteraction, ContextMenuCommandInteraction } from "discord.js";

const Event: event = {
    once: false,
    execute: (client, interaction: Interaction) => {
        var interactionInfo;
        var command;

        var runCommand = (commands: Collection<String, { [key: string]: any }>, name: string, Interaction: CommandInteraction | MessageContextMenuCommandInteraction | SelectMenuInteraction) => {
            command = commands.get(name);
            if (!command) return Interaction.reply({ content: "This command is not available", ephemeral: true });
            command.run(client, interaction);
        };

        switch (true) {
            case interaction.isMessageContextMenuCommand():
                interactionInfo = interaction as MessageContextMenuCommandInteraction;
                runCommand(client.contexts, interactionInfo.commandName, interactionInfo);
                break;
            case interaction.isContextMenuCommand():
                interactionInfo = interaction as ContextMenuCommandInteraction;
                runCommand(client.userContexts, interactionInfo.commandName, interactionInfo);
                break;
            case interaction.isCommand():
                interactionInfo = interaction as CommandInteraction<CacheType>
                runCommand(client.commands, interactionInfo.commandName, interactionInfo);
                break;
            // case interaction.isButton():
            //     interactionInfo = interaction as ButtonInteraction<CacheType>
            //     runCommand(client.commands, interactionInfo.commandName, interactionInfo);
            //     break;
            // case interaction.isSelectMenu():
            //     interactionInfo = interaction as SelectMenuInteraction<CacheType>;
            //     runCommand(client.contexts, interactionInfo.commandName, interactionInfo);
            //     break;
        }
    }
};

export default Event;