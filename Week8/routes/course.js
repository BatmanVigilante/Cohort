const express = require("express");
const router = express.Router();

router.post('/purchase',(req,res)=>{
    res.json({
        message:"Purchase Successful"
    })
});

router.get('/preview',(req,res)=>{
    res.json({
        message:"Preview Successful"
        })
});

module.exports = {
    router
}