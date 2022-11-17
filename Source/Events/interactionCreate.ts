import { Command, Context, Event, Modal, UserContext } from "../Interfaces/client.interface";
import { CacheType, CommandInteraction, Collection, MessageContextMenuCommandInteraction, Interaction, ContextMenuCommandInteraction, ModalSubmitInteraction } from "discord.js";

const Event: Event = {
    once: false,
    execute: (client, interaction: Interaction) => {
        type interactionInfoType = MessageContextMenuCommandInteraction | ContextMenuCommandInteraction | CommandInteraction | ModalSubmitInteraction;
        type commandType = Collection<String, Context | UserContext | Command | Modal>;

        var interactionInfo: interactionInfoType | null = null;
        var type: commandType | null = null;
        var name: string;
        var command;

        var runCommand = (commands: Collection<String, { [key: string]: any }>, name: string, Interaction: interactionInfoType) => {
            if (!commands && !Interaction) return;
            command = commands.get(name);
            if (!command) return Interaction!.reply({ content: "This command is not available", ephemeral: true });
            command.run(client, interaction);
        };

        switch (true) {
            case interaction.isModalSubmit():
                interactionInfo = interaction as ModalSubmitInteraction;
                type = client.modals;
                name = interactionInfo.customId;
                name = name.split(" ")[0];
                break;
            case interaction.isMessageContextMenuCommand():
                interactionInfo = interaction as MessageContextMenuCommandInteraction;
                type = client.contexts;
                name = interactionInfo.commandName;
                break;
            case interaction.isContextMenuCommand():
                interactionInfo = interaction as ContextMenuCommandInteraction;
                type = client.userContexts;
                name = interactionInfo.commandName;
                break;
            case interaction.isCommand():
                interactionInfo = interaction as CommandInteraction<CacheType>
                type = client.commands;
                name = interactionInfo.commandName;
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
        if (!interactionInfo && !type) return;
        runCommand(type!, name!, interactionInfo!);
    }
};

export default Event;