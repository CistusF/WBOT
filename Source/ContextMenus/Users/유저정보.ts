import { EmbedBuilder, GuildMember } from "discord.js";
import { UserContext } from "../../Interfaces/client.interface"
import { getMember } from "../../Utils/utils";
import moment from "moment-timezone";

const command: UserContext = {
    run: (client, interaction) => {
        const member = getMember(interaction.guild!, interaction.targetId);

        const embed = new EmbedBuilder()
            .setTitle(member.nickname ?? member.user.username + "님의 정보")
            .setDescription("실제 정보와 다를 수 있습니다.")
            .setAuthor({
                name: member.nickname ?? member.user.username,
                iconURL: member.displayAvatarURL()!
            })
            .setThumbnail(member.displayAvatarURL())
            .setColor(member.displayHexColor)
            .addFields([
                {
                    name: "태그",
                    value: "#" + member.user.discriminator
                },
                {
                    name: "유저아이디",
                    value: member.user.id
                },
                {
                    name: "디스코드 가입일",
                    value: moment(member.user.createdAt).tz("America/Los_Angeles").format("YYYY-MM-DD HH:mm:ss")
                },
                {
                    name: "서버 가입일",
                    value: moment(member.joinedAt).tz("America/Los_Angeles").format("YYYY-MM-DD HH:mm:ss")
                }
            ]);

        interaction.reply({ embeds: [embed] });
    }
};

export default command;