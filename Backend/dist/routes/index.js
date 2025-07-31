"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const list_1 = require("./list");
const rootRouter = (0, express_1.Router)();
rootRouter.use("/user", user_1.default);
rootRouter.use("/user/list", list_1.listRouter);
exports.default = rootRouter;
