// ============================================================
// MongoDB Connection Singleton (with globalThis for HMR safety)
// ============================================================

import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = "portfolio-blog";

const globalForMongo = globalThis as unknown as {
  _mongoClient: MongoClient | null;
  _mongoDb: Db | null;
};

globalForMongo._mongoClient = globalForMongo._mongoClient ?? null;
globalForMongo._mongoDb = globalForMongo._mongoDb ?? null;

export async function getDb(): Promise<Db> {
  if (globalForMongo._mongoDb) return globalForMongo._mongoDb;

  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not defined. Please add it to your .env.local file."
    );
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);

  globalForMongo._mongoClient = client;
  globalForMongo._mongoDb = db;

  return db;
}

export async function getClient(): Promise<MongoClient> {
  if (globalForMongo._mongoClient) return globalForMongo._mongoClient;
  await getDb();
  return globalForMongo._mongoClient!;
}
