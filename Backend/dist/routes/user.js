"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = comparePasswords;
const express_1 = require("express");
const zod_1 = require("zod");
const db_1 = require("../db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const auth_1 = require("../auth");
const userRouter = (0, express_1.Router)();
const signupSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
const signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        return bcryptjs_1.default.hash(password, salt);
    });
}
function comparePasswords(password, hashed) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, hashed);
    });
}
function userExists(username, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield db_1.user.findOne({
            $or: [{ username }, { email }],
        });
        return !!existingUser;
    });
}
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body.userData;
    const validation = signupSchema.safeParse(userData);
    if (!validation.success) {
        return res.status(411).json({
            message: "Incorrect inputs",
        });
    }
    const { username, email, password } = userData;
    if (yield userExists(username, email)) {
        return res.status(411).json({
            message: "Email or Username already taken",
        });
    }
    const hashedPassword = yield hashPassword(password);
    const userD = yield db_1.user.create({
        username,
        email,
        password: hashedPassword,
    });
    if (userD) {
        const token = jsonwebtoken_1.default.sign({ userId: userD._id }, config_1.JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).json({ token });
    }
    return res.status(500).json({
        message: "Error while creating user",
    });
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body.userData;
    const parsed = signinSchema.safeParse(userData);
    if (!parsed.success) {
        return res.status(411).json({
            message: "Invalid Inputs"
        });
    }
    ;
    try {
        const p = yield db_1.user.findOne({
            email: userData.email,
        });
        if (!p) {
            return res.status(411).json({
                message: "Invalid Email"
            });
        }
        const isPasswordValid = yield comparePasswords(userData.password, p.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: p._id }, config_1.JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).json({
            token: token
        });
    }
    catch (err) {
        console.error("Signin error:", err);
        return res.status(500).json({
            message: "Something bad happened"
        });
    }
}));
userRouter.get("/home", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lists = yield db_1.List.find({ userId: req.userId });
        res.status(200).json({
            lists: lists
        });
    }
    catch (err) {
        console.error("Error fetching lists:", err);
        res.status(500).json({
            message: "Error fetching lists"
        });
    }
}));
exports.default = userRouter;
