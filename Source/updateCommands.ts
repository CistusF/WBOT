require("dotenv").config({ path: "../Config/.env" });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./Commands').filter((f: string) => f.endsWith('.js') || f.endsWith('.ts'));
const userContextFiles = fs.readdirSync('./ContextMenus/Users').filter((f: string) => f.endsWith('.js') || f.endsWith('.ts'));
const contextFiles = fs.readdirSync('./ContextMenus/Messages').filter((f: string) => f.endsWith('.js') || f.endsWith('.ts'));

const interactions = [{ dir: "./Commands/", files: commandFiles }, { dir: "./ContextMenus/Users/", files: userContextFiles }, { dir: "./ContextMenus/Messages/", files: contextFiles }];

for (const interactionFiles of interactions) {
	for (const file of interactionFiles.files) {
		const command = require(interactionFiles.dir + file).default;
		if (interactionFiles.files == userContextFiles) {
			command.type = 2;

		} else if (interactionFiles.files == contextFiles) {
			command.type = 3;
		};
		if (command.manage) {
			command.default_member_permissions = 8
		}

		command.name = file.replace(".js", "").replace(".ts", "");
		delete command.run;
		delete command.manage;
		commands.push(command);
	};
};

const rest = new REST({ version: '9' }).setToken(process.env.token);

(async () => {
	try {
		await rest.put(
			Routes.applicationCommands(process.env.clientId),
			{ body: commands },
		);
		console.log('Updated');
	} catch (error) {
		console.error(error);
	}
})();