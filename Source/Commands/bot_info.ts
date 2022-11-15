import { EmbedBuilder } from "@discordjs/builders";
import { Colors } from "discord.js";
import { Command } from "../Interfaces/client.interface";

const command: Command = {
    description: "Show WBOT's information",
    run: (client, interaction) => {
        const embed = new EmbedBuilder()
            .setTitle("WBOT")
            .setDescription("Create by CistusF")
            .setColor(Colors.DarkPurple)
            .setURL("https://github.com/CistusF/WBOT")
            .addFields([
                {
                    name: "개발자 블로그",
                    value: "https://hi-cistusf.vercel.app"
                },
                {
                    name: "WBOT Web",
                    value: "https://wbot.vercel.app"
                },
                {
                    name: "개발언어",
                    value: "Typescript"
                }
            ]);
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
};

export default command;