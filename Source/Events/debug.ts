import {Event} from "../Interfaces/client.interface";
import chalk from "chalk";

const Event:Event = {
    once: true,
    execute: (client, log) => {
        console.log(chalk.green(log));
    }
};

export default Event;