// db.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

let db;

async function conToDb(cb) {
    try {
        const url = process.env.MONGO_URL; // Ensure your .env file has this variable
        const client = new MongoClient(url);
        
        // Connect to the MongoDB client
        await client.connect();
        
        // Select the database
        db = client.db('todo');

        // Create an index on the email field in the userdata collection
        // await db.collection('userdata').createIndex({ email: 1 }, { unique: true });

        console.log('Successfully connected to the database');

        // Execute the callback function
        cb();
    } catch (err) {
        console.error('Failed to connect to the database', err);
        process.exit(1); // Exit the process with failure
    }
}

// Export the connection function and the db variable
export { conToDb, db };
