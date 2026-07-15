// ============================================================
// MongoDB Connection Singleton
// ============================================================

import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = "portfolio-blog";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not defined. Please add it to your .env.local file."
    );
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return db;
}

export async function getClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;
  await getDb();
  return cachedClient!;
}
