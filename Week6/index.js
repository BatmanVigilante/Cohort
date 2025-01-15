const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "VISCA BARCA";

app.use(express.json());

const users = []; // To store user data

// Signup route
app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    if (users.find((u) => u.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    // Add user to the list
    users.push({
        username: username,
        password: password,
    });

    res.json({
        message: "User created successfully",
    });

    console.log(users);
});

// Signin route
app.post("/signin", (req, res) => {
    const { username, password } = req.body;

    // Check if username and password match
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        // Generate a token and assign it to the user
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: "1h" });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

// Protected route to get user details
app.get("/me", (req, res) => {
    const token = req.headers.authorization; // Use lowercase header key

    if (!token) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    try {
        // Decode and verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find the user using the decoded username
        const user = users.find((u) => u.username === decoded.username);

        if (user) {
            return res.json({
                username: user.username,
            });
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err) {
        // Handle invalid or expired tokens
        return res.status(401).json({ message: "Invalid token" });
    }
});

// Start the server
app.listen(3002, () => {
    console.log("Server running on http://localhost:3001");
});