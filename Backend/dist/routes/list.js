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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../auth");
const db_1 = require("../db");
const zod_1 = require("zod");
const taskSchema = zod_1.z.object({
    heading: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    taskStatus: zod_1.z.boolean().optional()
});
const updatedtaskSchema = zod_1.z.object({
    heading: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    taskStatus: zod_1.z.boolean().optional()
});
exports.listRouter = (0, express_1.Router)();
exports.listRouter.post("/createList", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listName = req.body.listName;
    if (!listName) {
        return res.status(400).json({
            message: "List name is required"
        });
    }
    ;
    try {
        const newList = yield db_1.List.create({
            userId: req.userId,
            listName: listName
        });
        return res.status(201).json({
            message: "List created successfully",
        });
    }
    catch (err) {
        console.error("Error creating list:", err);
        return res.status(500).json({
            message: "Error creating list"
        });
    }
}));
exports.listRouter.post("/:listId/createTask", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = req.params.listId;
    const { taskName, taskDescription, date, taskStatus } = req.body;
    const { success } = taskSchema.safeParse({
        heading: taskName,
        description: taskDescription,
        date,
        taskStatus: false
    });
    if (!success) {
        return res.status(400).json({
            message: "Invalid task data"
        });
    }
    try {
        const list = yield db_1.List.findById(listId);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }
        list.tasks.push({
            heading: taskName,
            description: taskDescription,
            date: new Date(date),
            hasCompleted: taskStatus
        });
        yield list.save();
        return res.status(201).json({
            message: "Task added successfully",
        });
    }
    catch (err) {
        console.error("Error adding task:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
exports.listRouter.put("/updatelist/:listId", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = req.params.listId;
    const updatedListName = req.body.updatedListName;
    if (!updatedListName) {
        return res.status(400).json({
            message: "List name is required"
        });
    }
    ;
    try {
        const list = yield db_1.List.findById(listId);
        if (!list) {
            return res.status(404).json({
                message: "List not found"
            });
        }
        list.listName = updatedListName;
        yield list.save();
        return res.status(200).json({
            message: "List updated successfully"
        });
    }
    catch (err) {
        console.error("Error updating list:", err);
        return res.status(500).json({
            message: "Error updating list"
        });
    }
}));
exports.listRouter.put("/updatelist/:listId/updateTask/:taskId", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = req.params.listId;
    const taskId = req.params.taskId;
    const { taskName, taskDescription, date, taskStatus } = req.body;
    const { success } = updatedtaskSchema.safeParse({ heading: taskName, description: taskDescription, date: date, taskStatus: taskStatus });
    if (!success) {
        return res.status(400).json({
            message: "Invalid task data",
        });
    }
    try {
        const list = yield db_1.List.findById(listId);
        if (!list) {
            return res.status(404).json({
                message: "List not found"
            });
        }
        ;
        const task = list.tasks.id(taskId);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        ;
        if (taskName !== undefined)
            task.heading = taskName;
        if (taskDescription !== undefined)
            task.description = taskDescription;
        if (date !== undefined)
            task.date = new Date(date);
        if (taskStatus !== undefined)
            task.hasCompleted = taskStatus;
        yield list.save();
        return res.status(200).json({
            message: "Task updated successfully"
        });
    }
    catch (err) {
        console.error("Error updating task:", err);
        return res.status(500).json({
            message: "Error updating task"
        });
    }
}));
exports.listRouter.delete("/delete/:listid", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = req.params.listid;
    if (!listId) {
        return res.status(401).json({
            nessage: "Invalid"
        });
    }
    const success = yield db_1.List.findByIdAndDelete(listId);
    if (!success) {
        return res.status(404).json({
            message: "List not found"
        });
    }
    else {
        return res.status(200).json({
            message: "List deleted successfully"
        });
    }
}));
exports.listRouter.delete("/delete/:listid/task/:taskid", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = req.params.listid;
    const taskId = req.params.taskid;
    if (!listId || !taskId) {
        return res.status(400).json({ message: "Invalid list or task ID" });
    }
    try {
        const list = yield db_1.List.findById(listId);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }
        // Find the task to delete
        const taskToDelete = list.tasks.id(taskId);
        if (!taskToDelete) {
            return res.status(404).json({ message: "Task not found" });
        }
        // Remove it using pull (safe and typed)
        list.tasks.pull(taskToDelete._id);
        yield list.save();
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (err) {
        console.error("Error deleting task:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
exports.listRouter.get("/show/:listid/task/:taskid", auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = req.params.listid;
    const taskId = req.params.taskid;
    if (!listId || !taskId) {
        return res.status(400).json({ message: "Invalid list or task ID" });
    }
    try {
        const list = yield db_1.List.findById(listId);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }
        const taskToShow = list.tasks.id(taskId);
        if (!taskToShow) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({ list: taskToShow });
    }
    catch (err) {
        console.error("Error Fetching task:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
