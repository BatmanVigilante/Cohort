const express = require("express");
const app = express();
const port = 3001;
const router = require('./routes/course.js');

app.use('/course', router);

app.listen(port, () => {
    console.log("https://localhost:3001");
});