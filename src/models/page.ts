import { connectDB } from "@/db";
import { ObjectId } from "mongodb";
import type Page from "@/interfaces/page";

class PageModel {
  private static collectionName = "pages";

  static async all(): Promise<Page[]> {
    const db = await connectDB();
    return (await db.collection(this.collectionName).find().toArray()) as Page[];
  }
  static async create(data: Page): Promise<Page> {
    const db = await connectDB();
    const result = await db.collection(this.collectionName).insertOne(data);
    return { ...data, _id: result.insertedId } as Page;
  }
  static async find(id: string): Promise<Page | null> {
    const db = await connectDB();
    let query = {_id: new ObjectId(id)};
    let result = await db.collection(this.collectionName).findOne(query);
    return result as Page | null;
  }
}

export default PageModel;