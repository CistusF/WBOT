import { Modal } from "../Interfaces/client.interface";
import { getGuildData } from "../Utils/utils";

const command: Modal = {
    run: async (client, interaction) => {
        const guildData = await getGuildData(interaction.guildId!);
        const memberId = interaction.customId.split(" ")[1];
        var member = guildData.warns.find(i => i.id === memberId);
        if (!member) {
            guildData.warns.push({ id: memberId, reasons: [] });
            member = guildData.warns.find(i => i.id === memberId);
        };
        const reason = interaction.fields.fields.find(i => i.customId === "reason")?.value;

        member?.reasons.push(reason ?? "No reason specified");
        await interaction.reply({ content: "경고가 지급되었습니다.", ephemeral: true });
        await guildData.save();
    }
};

export default command;