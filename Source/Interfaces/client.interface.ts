import { Awaitable, ApplicationCommandOption, CommandInteraction, MessageContextMenuCommandInteraction, ContextMenuCommandInteraction, ModalSubmitInteraction } from 'discord.js';
import client from '../Utils/client';

export type Command = {
    [key: string]: string | any;
    name?: string;
    description: string;
    options?: ApplicationCommandOption[];
    default_permission?: boolean | undefined;
    type?: number;
    guildId?: string;
    run: (client: client, interaction: CommandInteraction) => void;
}

export type UserContext = {
    name?: string;
    manage?: boolean;
    type?: ApplicationCommandType;
    run: (client: client, interaction: ContextMenuCommandInteraction) => void;
}

export type Context = {
    name?: string;
    manage?: boolean;
    type?: ApplicationCommandType;
    run: (client: client, interaction: MessageContextMenuCommandInteraction) => void;
}

export type Event = {
    once: boolean;
    execute: (client: client, ...args: any) => Awaitable<void>;
};

export type Modal = {
    name?: string;
    type?: ApplicationCommandType;
    run: (client: client, interaction: ModalSubmitInteraction) => void;
}

enum ApplicationCommandType {
    User = 2,
    Message = 3
}