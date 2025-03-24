import Icon from '@/models/icon'
import Stream from 'stream';
export default class iconController{
    static async store(file: Buffer, name: string ): Promise<String | null> {
        return await Icon.create(file, name);
    }
    static async show(objNameValue: string): Promise<Stream.Readable | null> {
        const obj = await Icon.find(objNameValue);
        if(obj){
            //console.log('si hay');
            return obj;
        }else{
            return null;
        }
    }
} 