const mongoose = require('mongoose');
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;
const router = require('./routes/course.js');

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://ashishmohan625:X5uDL_BFA4yX3!q@cluster0.qqdbp01.mongodb.net/course", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Schemas and Models
const { Schema } = mongoose;

const userSchema = new Schema({
    id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const courseSchema = new Schema({
    id: { type: String, default: uuidv4 },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
    user_id: { type: String, default: uuidv4 }
});

const userModel = mongoose.model("users", userSchema);
const courseModel = mongoose.model("courses", courseSchema);

// Test Route to Insert Sample Data
app.get('/test', async (req, res) => {
    try {
        // Insert a sample user
        const user = new userModel({
            name: "Test User",
            email: "test@example.com",
            password: await bcrypt.hash("password123", 10), // Hash password
        });
        await user.save();

        // Insert a sample course
        const course = new courseModel({
            title: "Introduction to Programming",
            description: "Learn the basics of programming.",
            price: 49.99,
            image: "https://example.com/course-image.jpg",
            user_id: user.id,
        });
        await course.save();

        // Fetch the data to confirm it was saved
        const users = await userModel.find();
        const courses = await courseModel.find();

        res.json({
            message: "Sample data inserted successfully!",
            users,
            courses,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error inserting sample data');
    }
});

// Course Routes
app.use('/course', router);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});