const express = require("express");
const app = express();
const port = 3000;
const courseRouter = require('./routes/course.js');

app.use('/course',courseRouter);

app.listen(port,()=>{
    console.log(`https://localhost:3000`);
})