import BaseModel from "./base";
import UserInterface from "@/interfaces/user";

export default class User extends BaseModel<UserInterface> {
    protected static collectionName = "users";
}