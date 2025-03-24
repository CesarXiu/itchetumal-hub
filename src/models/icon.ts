import { minioClient } from '@/minio';
import Stream from 'stream';
import { v4 as uuidv4 } from 'uuid';

export default class Icons {
    private static BUCKET = 'icons';
    static async create(file: Buffer, name: string): Promise<String | null> {
        if(await Icons.exists() && file) {
            const extension = name.split('.').pop();
            const uniqueFileName = `${uuidv4()}.${extension}`;
            const contentType = Icons.getContentType(name);

        try {
            await minioClient.putObject(Icons.BUCKET, uniqueFileName, file, file.length, {
                'Content-Type': contentType
            });
        } catch (e) {
            console.error('Error uploading file', e);
            return null;
        } finally {
            return uniqueFileName;
        }
        }else{
            console.error('Bucket does not exist');
            return null;
        }
    }
    static async find(objNameValue: string): Promise< Stream.Readable | null> {
        let dataStream = null;
        try{
            dataStream = await minioClient.getObject(Icons.BUCKET, objNameValue);
        }catch(e){
            console.error('Error downloading file', e);
            return null;
        }finally{
            //console.log(typeof dataStream);
            console.log(objNameValue);
            return dataStream;
        }
    }

    private static exists = async (): Promise<boolean> => await minioClient.bucketExists(Icons.BUCKET);
    private static getContentType = (filename:String) => {
        if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
        if (filename.endsWith('.png')) return 'image/png';
        if (filename.endsWith('.svg')) return 'image/svg+xml';
        return 'application/octet-stream'; // Fallback
    };
}

