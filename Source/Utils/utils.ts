import { Guild, GuildMember, Message, TextBasedChannel, TextChannel } from "discord.js";
import client from "./client";


export const getMember = (guild: Guild, userId: string): GuildMember => {
    return guild.members.cache.get(userId)!;
}

export const getMessageInfo = async (channel: TextBasedChannel, targetId: string): Promise<Message<boolean>> => {
    const message = await channel.messages.fetch(targetId);

    return message;
}