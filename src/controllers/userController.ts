import User from '@/models/user';
import type UserInterface from '@/interfaces/user';
export default class UserController {
    static async index() {
        return await User.all();
    }
    static async store(data: UserInterface) {
        return await User.create(data);
    }
    static async show(id: string) {
        return await User.find(id);
    }
    static async update(data: Partial<UserInterface> & { _id: string }) {
        return await User.update(data);
    }
}