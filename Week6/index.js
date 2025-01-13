const express = require("express");
const app = express();

app.use(express.json());

const users =[];

function generateToken() {
    const tokenLength = 16; // Length of the token
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }

    return token;
}



app.post("/signup",(req,res)=>{
    const {username,password} = req.body;

    if(users.find(u=> u.username === username)){
        return res.status(400).json({message:"Username already exists"});
    }

    users.push({
        username:username,
        password:password
    })
    
    res.json({
        message:"User created successfully"
    })

    console.log(users);
});

app.post("/signin",(req,res)=>{
    const { username, password } = req.body;

    const user = users.find(u=>u.username === username && u.password === password);

    if(user){
        const token = generateToken();
        user.token = token;
        res.json({token});
    }

    console.log(users);
});

app.listen(3001);