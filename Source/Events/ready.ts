import chalk from "chalk";
import { Event } from "../Interfaces/client.interface";

const Event: Event = {
    once: true,
    execute: (client) => {
        console.log(chalk.bgGreenBright("Bot is now connected to %s"), client.user?.tag);
    }
};

export default Event;