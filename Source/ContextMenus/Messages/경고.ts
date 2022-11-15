import { ModalBuilder } from "@discordjs/builders";
import { ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Context } from "../../Interfaces/client.interface"
import { getMember, getMessageInfo } from "../../Utils/utils";

const command: Context = {
    manage: true,
    run: async (client, interaction) => {

        const m = await getMessageInfo(interaction.channel!, interaction.targetId);
        const member = getMember(interaction.guild!, m.author.id);

        const text = new TextInputBuilder({
            label: "경고 사유",
            customId: "reason",
            placeholder: "경고 사유를 적어주세요.",
            required: true,
            style: TextInputStyle.Short
        });

        const modal = new ModalBuilder()
            .setTitle((member?.nickname ?? m.author.username) + "에게 경고")
            .setCustomId("warn " + m.author.id)
            .addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(text))
        interaction.showModal(modal);
    }
};

export default command;