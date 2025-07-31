"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.List = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const url = process.env.MONGODB_URL;
if (!url) {
    throw new Error("DB url Invalid");
}
mongoose_1.default.connect(url).then(() => {
    console.log("DB connected successfully");
}).catch(() => {
    console.log("Connection FAiled");
});
const userSchema = new mongoose_1.default.Schema({
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
const taskSchema = new mongoose_1.default.Schema({
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
const listSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User", // references the User model by _id
        required: true,
    },
    listName: {
        type: String,
        required: true,
    },
    tasks: [taskSchema], // array of tasks
});
exports.List = mongoose_1.default.model("List", listSchema);
exports.user = mongoose_1.default.model("user", userSchema);
