"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET, (err, decoded) => {
        if (err || typeof decoded === "string") {
            res.status(403).json({ message: "Invalid token" });
            return;
        }
        req.userId = decoded.userId;
        next();
    });
};
exports.authenticateToken = authenticateToken;
