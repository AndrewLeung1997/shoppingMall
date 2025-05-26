import { Collection, Db, MongoClient } from "mongodb";
import { Product } from "~/interfaces/Product";
import { User } from "~/interfaces/User";
let client: MongoClient;
let db: Db;
const root: any = this;

export async function connectMongo() {
  client = new MongoClient(process.env.MONGODB_URL);
  await client.connect();
  db = client.db(process.env.DB_NAME);
}

class MongoCollection<T = any> {
  constructor(
    public name: string,
    public indexDef?: (col: Collection<T>) => Promise<any>
  ) {}

  async createIndex() {
    if (!this.indexDef) {
      return;
    } else {
      await this.indexDef(this.collection());
    }
  }

  collection(): Collection<T> {
    return db?.collection(this.name);
  }
}

function allCollections() {
  return Object.values(root).filter(
    (v) => v instanceof MongoCollection
  ) as MongoCollection<any>[];
}

export async function createMongoIndexes() {
  await Promise.all(allCollections().map((col) => col.createIndex()));
}
export const mUser = new MongoCollection<User>("user", (col) =>
  col.createIndex({ userId: 1, userName: 1 })
);
export const mProduct = new MongoCollection<Product>("prodcut", (col) =>
  col.createIndex({ productId: 1, categoryId: 1 })
);
