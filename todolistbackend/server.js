// server.js
import express from 'express';
import cors from 'cors';
import { conToDb, db } from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the ToDoList App!' });
});

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await db.collection('authentication').insertOne({ Name:name, Email:email, Password:password });
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (e) {
    res.status(400).json({ message: 'Error during signup', error: e.message });
  }
});

// Signin route
app.post('/signin', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await db.collection('authentication').findOne({ name, email, password });
    if (user) {
      res.status(200).json({ message: 'User signed in successfully' });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (e) {
    res.status(400).json({ message: 'Error during signin', error: e.message });
  }
});

// Forget password route
app.post('/forgetpassword', async (req, res) => {
  const { name, email, newPassword } = req.body;
  try {
    const response = await db.collection('authentication').findOneAndUpdate(
      { name, email },
      { $set: { password: newPassword } },
      { returnOriginal: false }
    );
    if (response.value) {
      res.status(200).json({ message: 'Password updated successfully' });
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  } catch (e) {
    res.status(400).json({ message: 'Error during password update', error: e.message });
  }
});
//retrive datof tasks
app.post('/reterivetask', async (req, res) => {
  try {
    const user = await db.collection('task').find().toArray();
      res.status(200).json({ message: 'Retrive Data Successfully' ,data:user});
  } catch (e) {
    res.status(400).json({ message: 'Unable To Retrive Data', error: e.message });
  }
});
// Add task route
app.post('/addtask', async (req, res) => {
  const { title, detail } = req.body;
  try {
    await db.collection('task').insertOne({ title, detail });
    res.status(201).json({ message: 'Task added successfully' });
  } catch (e) {
    res.status(400).json({ message: 'Error adding task', error: e.message });
  }
});

// Update task route
app.post('/updatetask', async (req, res) => {
  const { id, title, detail } = req.body;
  try {
    const response = await db.collection('task').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { title, detail } },
      { returnOriginal: false }
    );
    if (response.value) {
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
  const { id } = req.body;
  try {
    const response = await db.collection('task').deleteOne({ _id: new ObjectId(id) });
    if (response.deletedCount === 1) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(400).json({ message: 'Task not found' });
    }
  } catch (e) {
    res.status(400).json({ message: 'Error deleting task', error: e.message });
  }
});

conToDb(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
