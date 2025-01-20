// ./routes/course.js
const express = require('express');
const router = express.Router();

// Define your routes
router.get('/', (req, res) => {
    res.send('Welcome to the Course API!');
});

router.get('/details', (req, res) => {
    res.send('Course details');
});

// Export the router
module.exports = router;