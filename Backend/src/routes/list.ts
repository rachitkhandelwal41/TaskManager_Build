import { Request, Response } from "express";
import { Router } from "express";
import { authenticateToken,AuthenticatedRequest } from "../auth";
import { List } from "../db";
import{ z } from "zod";

const taskSchema=z.object({
  heading:z.string(),
  description:z.string().optional(),
  date:z.string().optional(),
  taskStatus:z.boolean().optional()
});
const updatedtaskSchema = z.object({
    heading: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    taskStatus: z.boolean().optional()
  });
  


export const listRouter=Router();

listRouter.post("/createList",authenticateToken, async (req:AuthenticatedRequest,res:Response):Promise<any>=>{
  const listName=req.body.listName;
  if(!listName){
    return res.status(400).json({
        message:"List name is required"
    });
  };
  try{
  const newList=await List.create({
    userId:req.userId,
    listName:listName
  });
 return res.status(201).json({
    message:"List created successfully",
  });}catch(err){
    console.error("Error creating list:",err);
    return res.status(500).json({
        message:"Error creating list"
    });
  }
});
listRouter.post("/:listId/createTask", authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const listId = req.params.listId;
    const { taskName, taskDescription, date, taskStatus } = req.body;
    const { success } = taskSchema.safeParse({
        heading: taskName,
        description: taskDescription,
        date,
        taskStatus:false

      });
      
    if(!success){
      return res.status(400).json({
        message:"Invalid task data"
      });
    }
    try {
      const list = await List.findById(listId);
  
      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }
  
  
      list.tasks.push({
        heading: taskName,
        description: taskDescription,
        date: new Date(date), 
        hasCompleted: taskStatus
      });
  
      await list.save(); 
  
      return res.status(201).json({
        message: "Task added successfully",
      });
    } catch (err) {
      console.error("Error adding task:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  listRouter.put("/updatelist/:listId",authenticateToken,async(req:AuthenticatedRequest,res:Response):Promise<any>=>{
    const listId=req.params.listId;

    const updatedListName=req.body.updatedListName;
    if(!updatedListName){
        return res.status(400).json({
            message:"List name is required"
        });
    };
    try{
        const list=await List.findById(listId);
        if(!list){
            return res.status(404).json({
                message:"List not found"
            });
        }
        list.listName=updatedListName;
        await list.save();
        return res.status(200).json({
            message:"List updated successfully"
        });
    }catch(err){
        console.error("Error updating list:",err);
        return res.status(500).json({
            message:"Error updating list"
        });
    }
        

    });

    listRouter.put("/updatelist/:listId/updateTask/:taskId",authenticateToken,async(req:AuthenticatedRequest,res:Response):Promise<any>=>
        {
           
            const listId=req.params.listId;
            const taskId=req.params.taskId;

             const {taskName,taskDescription,date,taskStatus}=req.body;
             const { success }=updatedtaskSchema.safeParse({heading:taskName,description:taskDescription,date:date,taskStatus:taskStatus});
             if(!success){
                return res.status(400).json({
                    message:"Invalid task data",
                });
             }
             try{
                const list=await List.findById(listId);
                if(!list){
                    return res.status(404).json({
                        message:"List not found"
                });
            };
                const task=list!.tasks.id(taskId);
                if(!task){
                    return res.status(404).json({
                        message:"Task not found"
                    });
                };
                if (taskName !== undefined) task.heading = taskName;
                if (taskDescription !== undefined) task.description = taskDescription;
                if (date !== undefined) task.date = new Date(date);
                if (taskStatus !== undefined) task.hasCompleted = taskStatus;

                await list.save();
                return res.status(200).json({
                    message:"Task updated successfully"
                }); 


             }catch(err){
                console.error("Error updating task:",err);
                return res.status(500).json({
                    message:"Error updating task"
                });
             }
        });
        listRouter.delete("/delete/:listid",authenticateToken, async (req:AuthenticatedRequest,res:Response):Promise<any>=>{
            const listId=req.params.listid;
            if(!listId){
                return res.status(401).json({
                    nessage:"Invalid"
                });
            }

            const success=await List.findByIdAndDelete(listId);
            if(!success){
                return res.status(404).json({
                    message:"List not found"
                });
            }else{
                return res.status(200).json({
                    message:"List deleted successfully"
                });
            }
            

        });
        listRouter.delete("/delete/:listid/task/:taskid", authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<any> => {
            const listId = req.params.listid;
            const taskId = req.params.taskid;
          
            if (!listId || !taskId) {
              return res.status(400).json({ message: "Invalid list or task ID" });
            }
          
            try {
              const list = await List.findById(listId);
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
          
              await list.save();
          
              return res.status(200).json({ message: "Task deleted successfully" });
            } catch (err) {
              console.error("Error deleting task:", err);
              return res.status(500).json({ message: "Internal server error" });
            }
          });

           listRouter.get("/show/:listid/task/:taskid", authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<any> => {
            const listId = req.params.listid;
            const taskId = req.params.taskid;
          
            if (!listId || !taskId) {
              return res.status(400).json({ message: "Invalid list or task ID" });
            }
          
            try {
              const list = await List.findById(listId);
              if (!list) {
                return res.status(404).json({ message: "List not found" });
              }
          
            
              const taskToShow = list.tasks.id(taskId);
              if (!taskToShow) {
                return res.status(404).json({ message: "Task not found" });
              }
          
              
              return res.status(200).json({ list:taskToShow});
            } catch (err) {
              console.error("Error Fetching task:", err);
              return res.status(500).json({ message: "Internal server error" });
            }
          });
          
          