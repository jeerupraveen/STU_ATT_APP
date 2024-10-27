// server.js
import express from 'express';
import cors from 'cors';
import { conToDb, db } from './db.js';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Attendance App!' });
});

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    await db.collection('authentication').insertOne({ Name: name, Email: email, Password: password });
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (e) {
    if (e.code === 11000) { // Duplicate key error
      res.status(400).json({ message: 'Duplicate Error', error: 'A user with this email already exists' });
    } else {
      res.status(400).json({ message: 'Error during signup', error: e.message });
    }
  }
});


// Signin route
app.post('/signin', async (req, res) => {
  const {email, password } = req.body;
  // console.log(req.body)
  try {
    const user = await db.collection('authentication').findOne({ Email:email, Password:password });
    if (user) {
      res.status(200).json({ message: 'User signed in successfully', userId: user._id,userData:user});
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (e) {
    res.status(400).json({ message: 'Error during signin', error: e.message });
  }
});

// Forget password route
app.post('/forgetpassword', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const response = await db.collection('authentication').findOneAndUpdate(
      { Email:email },
      { $set: { Password: password } },
      { returnOriginal: false }
    );
    if (response) {
      res.status(200).json({ message: 'Password updated successfully' });
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  } catch (e) {
    res.status(400).json({ message: 'Error during password update', error: e.message });
  }
});


app.post('/addtask', async (req, res) => {
  const { title, detail,UserId} = req.body;
 const id=new ObjectId(UserId)
 console.log(id)
  console.log(req.body)
  try {
    await db.collection('task').insertOne({
      Title: title,
      Detail: detail,
      UserId:id
    });
    
    res.status(201).json({ message: 'Task added successfully' });
  } catch (e) {
    res.status(400).json({ message: 'Error adding task', error: e.message });
  }
});

// Update task route
app.post('/updatetask', async (req, res) => {
  const { title, detail,id} = req.body;
  console.log(req.body)
  try {
    const response = await db.collection('task').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { Title:title, Detail:detail} },
      { returnOriginal: false }
    );
    if (response) {
      res.status(200).json({ message: 'Task updated successfully' });
    } else {
      res.status(400).json({ message: 'Task not found' });
    }
  } catch (e) {
    res.status(400).json({ message: 'Error updating task', error: e.message });
  }
});

// Delete task route
app.post('/deletetask', async (req, res) => {
  console.log(req.body)
  const { id } = req.body;
  try {
    const response = await db.collection('task').deleteOne({ _id:ObjectId.createFromHexString(id)});
    if (response.deletedCount === 1) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(400).json({ message: 'Task not found' });
    }
  } catch (e) {
    res.status(400).json({ message: 'Error deleting task', error: e.message });
  }
});
app.post("/retrivetask", async (req, res) => {
  console.log(req.body);
  try {
    const { userid } = req.body; // Get the userid from request body
    const response = await db.collection("task").find({ UserId: new ObjectId(userid) }).toArray(); // Ensure you are querying correctly
    console.log(response);
    
    if (response.length > 0) {
      res.status(200).json(response); // Return tasks if found
    } else {
      res.status(404).json({ message: "No tasks found for this user." });
    }
  } catch (e) {
    res.status(400).json({ message: "Error retrieving tasks", error: e.message });
  }
});


conToDb(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
