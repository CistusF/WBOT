import { Client, ClientOptions, Collection } from "discord.js";
import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import { env } from "../Interfaces/env.interface";
import { Command, Context, event, UserContext } from '../Interfaces/client.interface';
const env = process.env as unknown as env;

async () => {
    await mongoose.connect(env.mongodbUrl);
};

export default class client extends Client {
    public token: string;
    public ownerId: string;
    public commands: Collection<String, Command>;
    public userContexts: Collection<String, UserContext>;
    public contexts: Collection<String, Context>;
    constructor(options: ClientOptions) {
        super(options);
        this.token = env.token;
        this.ownerId = env.ownerId;
        this.commands = new Collection();
        this.userContexts = new Collection();
        this.contexts = new Collection();
        this.loadCommands();
        this.loadContexts();
        this.loadUserContexts();
        this.loadEvents();
    };

    private loadCommands(): void {
        let commandFiles = readdirSync('./Commands/').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
        commandFiles.forEach(c => {
            const command = require('../Commands/' + c) as { default: Command };
            const commandName = c.replace(".js", "").replace(".ts", "");
            this.commands.set(commandName, command.default);
        });
    };

    private loadUserContexts(): void {
        const ContextFiles = readdirSync('./ContextMenus/Users').filter((f) => f.endsWith('.js') || f.endsWith(".ts"));
        ContextFiles.forEach(c => {
            const context = require("../ContextMenus/Users/" + c) as { default: UserContext };
            const commandName = c.replace(".js", "").replace(".ts", "");
            this.userContexts.set(commandName, context.default);
        });
    };

    private loadContexts(): void {
        const ContextFiles = readdirSync('./ContextMenus/Messages').filter((f) => f.endsWith('.js') || f.endsWith(".ts"));
        ContextFiles.forEach(c => {
            const context = require("../ContextMenus/Messages/" + c) as { default: Context };
            const commandName = c.replace(".js", "").replace(".ts", "");
            this.contexts.set(commandName, context.default);
        });
    };

    private loadEvents(): void {
        const eventFiles = readdirSync(`./Events`).filter(f => f.endsWith('.js') || f.endsWith('.ts'));
        for (let file of eventFiles) {
            if (file.replace(".js", "").replace(".ts", "") === "debug" && !env.debug) {
            } else {
                file = file.replace(".js", "").replace(".ts", "");
                const event = require(`../Events/${file}`) as { default: event };
                if (event.default.once) {
                    this.once(file, (...args) => event.default.execute(this, ...args));
                } else {
                    this.on(file, (...args) => event.default.execute(this, ...args));
                };
            }
        };
    };
};

