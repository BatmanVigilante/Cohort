const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET="VISCA BARCA";


app.use(express.json());

const users=[];

app.post("/signup",(req,res)=>{
    console.log("Start");
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username:username,
        password:password
    })
    console.log(users);
    res.send("User created");
})

app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find((user)=>{
        return user.username === username && user.password === password;
        })
    
        if(user){
            const token = jwt.sign({username},JWT_SECRET,{expiresIn:"1h"});
            res.json({token});
            }else{
                res.status(401).json({msg:"Invalid credentials"});
                }
})

app.get("/me",(req,res)=>{
    const token = req.headers.authorization;
    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err){
            res.status(401).json({msg:"Invalid token"});
            }else{
                res.json(user);
                }
            })
        })
        


app.listen(3009,()=>{
    console.log("server is running on port 3000");
})