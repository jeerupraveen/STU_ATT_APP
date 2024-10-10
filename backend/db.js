// db.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

let db;

async function conToDb(cb) {
    const url = process.env.MONGO_URL; // Ensure your .env file has this variable
    const client = new MongoClient(url);
    await client.connect();
    db = client.db('ATTENDENCE_APP');
    db.collection("userdata").createIndex({ email: 1 }, { unique: true })
    cb();
}

// Export the connection function and the db variable
export { conToDb, db };
