import Icon from '@/models/icon'
import Stream from 'stream';
export default class iconController{
    static async store(file:File): Promise<Boolean> {
        return await Icon.create(file);
    }
    static async show(objNameValue: string): Promise<Stream.Readable | null> {
        return await Icon.find(objNameValue);
    }
}