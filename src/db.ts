import { MongoClient, Db } from "mongodb";
import "dotenv/config";

const MONGO_URI = process.env.DB_URI || "";
const MONGO_DB = process.env.DB_NAME || "";

const client = new MongoClient(MONGO_URI);
let db: Db;

export async function connectDB(): Promise<Db> {
  if (!db) {
    try {
      await client.connect();
      db = client.db(MONGO_DB);
      console.log("✅ Conectado a MongoDB");
    } catch (error) {
      console.error("❌ Error conectando a MongoDB:", error);
      process.exit(1);
    }
  }
  return db;
}

export { client }; // Exportamos el cliente por si queremos cerrarlo en otro lugar
