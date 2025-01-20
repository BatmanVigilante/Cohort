const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {UserModel,TodoModel} =require("./db.js");
const { auth, JWT_SECRET } = require("./auth");
const bcrypt = require("bcrypt");
const {z} = require("zod");


await mongoose.connect("mongodb+srv://ashishmohan625:X5uDL_BFA4yX3!q@cluster0.qqdbp01.mongodb.net/todo-app");

app.use(express.json());


app.post("/signup",async(req,res)=>{
const email = req.body.email;
const name = req.body.name;
const password = req.body.password;

await UserModel.create({
    email:email,
    name:name,
    password:password
});

res.json({
    message:"User created successfully"
})

})

app.post("/signin",async(req,res)=>{
const email = req.body.email;
const password = req.body.password;
const user = await UserModel.findOne({
    email:email,
    password:password,

})
if(!user){
    res.json({
        message:"Invalid email or password"
        })
        }else{
            const token = jwt.sign({
                id:user._id
                },JWT_SECRET)
                res.json({
                    message:"User logged in successfully",
                    token:token
                    })
                    }
})

app.post("/todos",async (req,res)=>{

    const token = req.header("token");
    const decoded = jwt.verify(token,JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if(!user){
        res.json({
            message:"Invalid token"
            })
            }else{
                const todo = await TodoModel.create({
                    title:req.body.title,
                    user:user._id.toString(),
                    done:false
                    })
                    res.json({
                        message:"Todo created successfully",
                        todo:todo
                        })
                        }
})

app.get("/todos", (req, res) => {

})

app.listen(4002,()=>{
    console.log(`localhost:4000/`);
})