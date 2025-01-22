const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect("mongodb+srv://ashishmohan625:X5uDL_BFA4yX3!q@cluster0.qqdbp01.mongodb.net/course")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const ObjectId = Schema.ObjectId;

const user = new Schema({
    id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const admin = new Schema({
    id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const course = new Schema({
    id: { type: String, default: uuidv4 },
    title:{type:String},
    description:{type:String},
    price:{type:Number},
    image:{type:String},
    user_id:{type:String,default:uuidv4}
})

const purchases = new Schema({
    id: { type: String, default: uuidv4 },
    course_id:{type:String},
    user_id:{type:String},
})

const userModel = mongoose.model("users",user);
const adminModel = mongoose.model("admins",admin);
const courseModel = mongoose.model("courses",course);
const purchaseModel = mongoose.model("purchases",purchases);

module.exports({
    userModel,
    adminModel,
    courseModel,
    purchaseModel
})