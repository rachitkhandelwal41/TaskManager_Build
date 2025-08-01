import mongoose from "mongoose";
require("dotenv").config();

const url=process.env.MONGODB_URL;
if(!url){
  throw new Error("DB url Invalid");
}

  mongoose.connect(url).then(()=>{
    console.log("DB connected successfully")
  }).catch(()=>{
    console.log("Connection FAiled")
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});


const taskSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    required: true,
  },
  hasCompleted: {
    type: Boolean,
    default: false,
  },
});

const listSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // references the User model by _id
    required: true,
  },
  listName: {
    type: String,
    required: true,
  },
  tasks: [taskSchema], // array of tasks
});

export const List = mongoose.model("List", listSchema);


export const user = mongoose.model("user", userSchema);
