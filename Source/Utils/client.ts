import { Client, ClientOptions, Collection } from "discord.js";
import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import { env } from "../Interfaces/env.interface";
import { Command, Context, Event, Modal, UserContext } from '../Interfaces/client.interface';
const env = process.env as unknown as env;

(async () => {
    await mongoose.connect(env.mongodbUrl);
})();

export default class client extends Client {
    public token: string;
    public ownerId: string;
    public commands: Collection<String, Command>;
    public userContexts: Collection<String, UserContext>;
    public contexts: Collection<String, Context>;
    public modals: Collection<String, Modal>;
    constructor(options: ClientOptions) {
        super(options);
        this.token = env.token;
        this.ownerId = env.ownerId;
        this.commands = new Collection();
        this.contexts = new Collection();
        this.userContexts = new Collection();
        this.modals = new Collection();
        this.loadCommands();
        this.loadContexts();
        this.loadUserContexts();
        this.loadModals();
        this.loadEvents();
    };

    private loadCommands(): void {
        const commandFiles = readdirSync('./Commands/').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
        commandFiles.forEach(c => {
            const command = require('../Commands/' + c) as { default: Command };
            const commandName = c.replace(".js", "").replace(".ts", "");
            this.commands.set(commandName, command.default);
        });
    };

    private loadContexts(): void {
        const contextFiles = readdirSync('./ContextMenus/Messages').filter((f) => f.endsWith('.js') || f.endsWith(".ts"));
        contextFiles.forEach(c => {
            const context = require("../ContextMenus/Messages/" + c) as { default: Context };
            const commandName = c.replace(".js", "").replace(".ts", "");
            this.contexts.set(commandName, context.default);
        });
    };

    private loadUserContexts(): void {
        const contextFiles = readdirSync('./ContextMenus/Users').filter((f) => f.endsWith('.js') || f.endsWith(".ts"));
        contextFiles.forEach(c => {
            const context = require("../ContextMenus/Users/" + c) as { default: UserContext };
            const commandName = c.replace(".js", "").replace(".ts", "");
            this.userContexts.set(commandName, context.default);
        });
    };

    private loadModals(): void {
        const modalFiles = readdirSync('./Modals').filter((f) => f.endsWith('.js') || f.endsWith(".ts"));
        modalFiles.forEach(c => {
            const modal = require("../Modals/" + c) as { default: Modal };
            const commandName = c.replace(".js", "").replace(".ts", "");
            this.modals.set(commandName, modal.default);
        });
    };

    private loadEvents(): void {
        const eventFiles = readdirSync(`./Events`).filter(f => f.endsWith('.js') || f.endsWith('.ts'));
        for (let file of eventFiles) {
            if (file.replace(".js", "").replace(".ts", "") === "debug" && !env.debug) {
            } else {
                file = file.replace(".js", "").replace(".ts", "");
                const event = require(`../Events/${file}`) as { default: Event };
                if (event.default.once) {
                    this.once(file, (...args) => event.default.execute(this, ...args));
                } else {
                    this.on(file, (...args) => event.default.execute(this, ...args));
                };
            }
        };
    };
};

