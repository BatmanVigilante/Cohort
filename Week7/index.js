const mongoose = require("mongoose");
const express = require("express");
const app = express();
const {Schema} = mongoose;

app.listen(4000,()=>{
    console.log(`localhost:4000/`);
})