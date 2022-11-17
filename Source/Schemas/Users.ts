import { Schema, model } from "mongoose";

export const UserData = new Schema({
    id: String,
    memo: String
});

export const UserDataModel = model("Users", UserData);