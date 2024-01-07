import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const { DB_URI } = process.env;

const client = new MongoClient(DB_URI, {
    serverApi: ServerApiVersion.v1
});

export const connectDB = async () => {
    await client.connect();
    return client.db(process.env.DB_NAME);
};
