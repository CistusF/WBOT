import { Guild, GuildMember, Message, TextBasedChannel } from "discord.js";
import { GuildDataModel } from "../Schemas/Guilds";
import { UserDataModel } from "../Schemas/Users";

export const getMember = (guild: Guild, userId: string): GuildMember => {
    return guild.members.cache.get(userId)!;
}

export const getMessageInfo = async (channel: TextBasedChannel, targetId: string): Promise<Message<boolean>> => {
    const message = await channel.messages.fetch(targetId);

    return message;
}

export const getGuildData = async (guildId: String) => {
    var guildData = await GuildDataModel.findOne({ id: guildId });

    if (!guildData) {
        guildData = new GuildDataModel({
            id: guildId,
            blacklisted: [],
            warns: []
        });
        guildData.save();
    };

    return guildData;
};

export const getMemberData = async (memberId: String) => {
    var userData = await UserDataModel.findOne({ id: memberId });

    if (!userData) {
        userData = new UserDataModel({
            id: memberId,
            memo: null
        });
        userData.save();
    };

    return userData;
};