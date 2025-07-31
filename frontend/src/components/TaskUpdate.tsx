import { useState } from "react";
import { deleteTasks, updateTask } from "../services/taskApi";
import type { Task } from "./ShowList";
import deletesvg from "../assests/icons8-delete.svg"
import { useRecoilState } from "recoil";
import { Refresh } from "../atoms/Refresh";

interface showTaskProps {
  listId: string;
  onClose: () => void;
  task:Task
}

const TaskUpdate = ({ listId, onClose,task }: showTaskProps) => {
  const[taskData,setTaskData]=useState({
    heading:task.heading,
    description:task.description,
    date:task.date,
    taskStatus:task.hasCompleted
  })
 const [refresh,setRefresh]=useRecoilState(Refresh);
  function handleInput(name:string,value:string){
    setTaskData((prev)=>({
        ...prev,[name]:value
    }))
  }
  async function handleSubmit(){
    try{
    
     const response=await updateTask({
      listId:listId,
      taskId:task._id,
      taskName:taskData.heading,
      taskDescription:taskData.description,
      date:new Date(taskData.date),
       taskStatus:task.hasCompleted,
      
     });
     
     if(response){
         setTaskData({
            heading:"",
            description:"",
            date:"",
            taskStatus:task.hasCompleted
         })
         setRefresh(!refresh)
         onClose();
     }}catch(error:any){
         let errorm=error?.message || "Something went Wrong"
         throw new Error(errorm);
     }
  }
 async function deleteTask(){
  try{
  const response=await deleteTasks(listId,task._id)
  if(response){
    setRefresh(!refresh)
    onClose()
  }
  }catch(error:any){
let errorm=error?.message || "Something went Wrong"
         throw new Error(errorm);
  }
 }
  return (
    <div className="fixed bg-[#1C427C]/40 text-black inset-0 flex items-center justify-center cursor">
      <div className="bg-white h-125 w-94 rounded-2xl p-4">
        <div className="flex items-center">
        <div className="font-quicksand text-center pt-2 ml-14 mt-2 text-2xl font-bold text-center">
           Update Task Details
        </div>
        <div>
          <img 
          onClick={deleteTask}
          
          className="w-8 h-8 mb-8 ml-8" src={deletesvg} alt="delete"/>
        </div>
         </div>
        <div className="font-quicksand font-bold pt-4 pl-1">Updated Task Name</div>
        <div className="pt-1">
          <input
          onChange={(e)=>handleInput(e.target.name,e.target.value)}
            name="heading"
            type="text"
            placeholder="Task Name please"
            className="bg-white/50 shadow-sm text-black font-doto font-bold w-full rounded-md border-b-2 px-4 py-2 outline-none transition-all duration-300 
              hover:border-[#1C427C]/30 hover:shadow-[0_0_8px_2px_#1C427C]
              focus:border-[#1C427C]/50 focus:shadow-[0_0_10px_3px_#1C427C]"
          />
        </div>

        <div className="font-quicksand font-bold pt-4 pl-1">Description</div>
        <textarea
        onChange={(e)=>handleInput(e.target.name,e.target.value)}
          name="description"
          placeholder="Describe please"
          className="bg-white/50 shadow-sm text-black font-doto font-bold w-full h-28 rounded-md border-b-2 pl-4 pt-2 mt-2 outline-none transition-all duration-300 
              hover:border-[#1C427C]/30 hover:shadow-[0_0_8px_2px_#1C427C]
              focus:border-[#1C427C]/50 focus:shadow-[0_0_10px_3px_#1C427C]"
        />

        <div className="font-quicksand font-bold pt-2 pl-2">Due Date</div>
        
          <input className="mt-1 ml-1 font-doto border rounded-xl p-2 pl-3 w-50 font-bold uppercase outline-none transition-all duration-300 
              hover:border-[#1C427C]/30 hover:shadow-[0_0_8px_2px_#1C427C]
              focus:border-[#1C427C]/50 focus:shadow-[0_0_10px_3px_#1C427C]" type="date" name="date"
              onChange={(e)=>handleInput(e.target.name,e.target.value)}
              />
              <div className="flex justify-between px-11 pt-6">
               
             <button onClick={handleSubmit}type="button" className="text-blue-700 hover:text-white border border-[#1C427C] hover:bg-[#1C427C] focus:ring-4 focus:outline-none focus:ring-[#1C427C] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
             
             <button onClick={onClose}type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Close</button>
              
              </div>
              
                

             
      </div>
    </div>
  );
};

export default TaskUpdate;
