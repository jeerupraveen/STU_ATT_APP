// server.js
import express from 'express'; // Use import for express
import cors from 'cors'; // Use import for cors
import { conToDb, db } from './db.js';
import dotenv from "dotenv"; // Correctly import your db module
import  { MongoClient, ObjectId } from 'mongodb'
dotenv.config()
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Attendance App!' }); // Respond with a JSON object
});
app.post("/insert",async(req,res)=>{
    
})
conToDb(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});