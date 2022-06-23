import chalk from "chalk";
import { event } from "../Interfaces/client.interface";

const Event: event = {
    once: true,
    execute: (client) => {
        console.log(chalk.bgGreenBright("Bot is now connected to %s"), client.user?.tag);
    }
};

export default Event;