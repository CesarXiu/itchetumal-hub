import { connectDB } from '../db';
import { ObjectId } from 'mongodb';
import type BaseModelInterface from '@/interfaces/base';

export default abstract class BaseModel<T> {
    protected static collectionName: string;
    static async all<T>(): Promise<T[]> {
        const db = await connectDB();
        return (await db.collection(this.collectionName).find().toArray()) as T[];
    }
    static async create<T extends BaseModelInterface>(data: T): Promise<T> {
        const db = await connectDB();
        const result = await db.collection(this.collectionName).insertOne(data);
        return { ...data, _id: result.insertedId } as T;
    }
    static async find<T>(id: string): Promise<T | null> {
        const db = await connectDB();
        const query = { _id: new ObjectId(id) };
        const result = await db.collection(this.collectionName).findOne(query);
        return result as T | null;
    }
    static async findOne<T>(query: any): Promise<T | null> {
        const db = await connectDB();
        const result = await db.collection(this.collectionName).findOne(query);
        return result as T | null;
    }
    static async update<T extends BaseModelInterface>(data: Partial<T> & { _id: string }): Promise<T> {
        const db = await connectDB();
        const query = { _id: new ObjectId(data._id) };
        const updateData = { ...data };
        //delete updateData._id; // Ensure _id is not included in the update
        await db.collection(this.collectionName).updateOne(query, { $set: updateData });
        const updatedDocument = await db.collection(this.collectionName).findOne(query);
        return updatedDocument as T;
    }
}