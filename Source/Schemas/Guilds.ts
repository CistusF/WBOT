import { Schema, model } from "mongoose";

export const GuildData = new Schema({
    id: String,
    warns: [{ id: String, reasons: [String] }],
    bonusPoints: Number,
    blacklisted: [String]
});

export const GuildDataModel = model("Guilds", GuildData);