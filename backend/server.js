// server.js
import express from 'express'; // Use import for express
import cors from 'cors'; // Use import for cors
import { conToDb, db } from './db.js';
import dotenv from "dotenv"; // Correctly import your db module
import  { MongoClient, ObjectId } from 'mongodb'
dotenv.config()
const PORT = process.env.PORT || 3000;

export const app = express();
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Attendance App!' }); // Respond with a JSON object
});
app.post('/insertdata', async (req, res) => {
    try {
        const { name, branch, regno, year, attendance_streak, phone_number, email, password } = req.body;

        const result = await db.collection('attendence').insertOne({
            name: name || "",
            branch: branch || "",
            regno: regno || "",
            year: year || 0,
            attendance_streak: attendance_streak || 0,
            phone_number: phone_number || "",
            email: email || "",
        });

        const userData = await db.collection('userdata').insertOne({
            email,
            password
        });

        res.status(201).json({
            message: 'Data inserted successfully',
            attendanceData: result,
            userData: userData
        });
    } catch (e) {
        if (e.code === 11000) {
            res.status(409).json({
                error: 'Duplicate key error',
                details: e.keyValue
            });
        } else {
            console.log(e);
            res.status(500).json({
                error: 'An error occurred',
                details: e.message
            });
        }
    }
});

// Connect to the database and start the server
app.post("/update", async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log incoming request body

        const { id, attendance_streak } = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID is required" });
        }

        // Update the attendance streak in the database
        const response = await db.collection("attendence").findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { attendance_streak: attendance_streak+1 } },
        );
        console.log(response)

        if (!response) {
            return res.status(404).json({ error: "Attendance record not found" });
        }
        res.status(200).json({
            message: "Attendance streak updated successfully",
            updatedDocument: response
        });
    } catch (error) {
        console.error("Error updating attendance:", error); // Log the error
        res.status(500).json({
            error: "An error occurred",
            details: error.message
        });
    }
});
// Endpoint to update profile
app.post("/updateprofile", async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { _id, name, phone_number, year, branch,regno } = req.body;

        if (!_id) {
            return res.status(400).json({ error: "ID is required" });
        }

        // Update the profile in the database
        const response = await db.collection("attendence").findOneAndUpdate(
            { _id: new ObjectId(_id) },
            { $set: { name:name, phone_number:phone_number, year:year, branch:branch ,regno:regno} },
            { returnDocument: 'after' } // Use 'after' to return the updated document
        );

        console.log("respone " ,response);

        if (!response) {
            return res.status(404).json({ error: "Student record not found" });
        }
        res.status(200).json({
            message: "Profile updated successfully",
            updatedDocument: response.value
        });
    } catch (error) {
        console.error("Error updating profile:", error); // Log the error
        res.status(500).json({
            error: "An error occurred",
            details: error.message
        });
    }
});


app.post("/retrieveAll", async (req, res) => {
    try {
        // Retrieve all attendance records
        const response = await db.collection("attendence").find().toArray();


        // Check if any records were retrieved
        if (response.length === 0) {
            return res.status(404).json({ message: 'No attendance records found' });
        }

        // Send a successful response with the retrieved records
        res.status(200).json({ message: 'Retrieved successfully', response });
    } catch (error) {
        // Handle any errors that occurred during the database operation
        res.status(500).json({
            error: 'An error occurred while retrieving records',
            details: error.message
        });
    }
});
app.post("/retriveuser", async (req, res) => {
    try {
        const {email}=req.body;
        const response = await db.collection("attendence").findOne({email:email});

        // Send a successful response with the retrieved records
        res.status(200).json({ message: 'Retrieved successfully', response });
    } catch (error) {
        // Handle any errors that occurred during the database operation
        res.status(500).json({
            error: 'An error occurred while retrieving records',
            details: error.message
        });
    }
});

//signin
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await db.collection("userdata").findOne({email: email });
      if (!user) {
        return res.status(401).json({ code: 401, message: 'Invalid email or password' });
      }

      if (password !== user.password) {
        return res.status(401).json({ code: 401, message: 'Invalid email or password' });
      }
      res.status(200).json({ code: 2004, message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ code: 500, message: 'Internal server error', error: error.message });
    }
  });

app.post('/updatepassword', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;

    try {
        const user = await db.collection("userdata").findOneAndUpdate(
            { email:email },
            { $set: { password:password} },
        );
         console.log(user)
        if (!user) {
            return res.status(401).json({ code: 401, message: 'Invalid email' });
        }

        res.status(200).json({ code: 2004, message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Internal server error', error: error.message });
    }
});


conToDb(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});