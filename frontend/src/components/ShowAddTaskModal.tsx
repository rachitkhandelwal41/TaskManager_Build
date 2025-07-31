import { useState } from "react";
import { addNewTask } from "../services/taskApi";
import { useRecoilState } from "recoil";
import { Refresh } from "../atoms/Refresh";


interface showTaskProps {
  listId: string;
  onClose: () => void;
}

const ShowAddTaskModal = ({ listId, onClose }: showTaskProps) => {
  const[taskData,setTaskData]=useState({
    heading:"",
    description:"",
    date:"",
  })
 const [refresh,setRefresh]=useRecoilState(Refresh);
  function handleInput(name:string,value:string){
    setTaskData((prev)=>({
        ...prev,[name]:value
    }))
  }
  async function handleSubmit(){
    try{
    
     const response=await addNewTask(listId,taskData.heading,taskData.description,new Date(taskData.date));
     
     if(response){
         setTaskData({
            heading:"",
            description:"",
            date:""
         })
         setRefresh(!refresh)
         onClose();

     }}catch(error:any){
         let errorm=error?.message || "Something went Wrong"
         throw new Error(errorm);
     }
  }

  return (
    <div className="fixed bg-[#1C427C]/40 text-black inset-0 flex items-center justify-center">
      <div className="bg-white h-120 w-94 rounded-2xl p-4">
        <div className="font-quicksand text-center pt-2 text-3xl font-bold">
          Task Details
        </div>

        <div className="font-quicksand font-bold pt-4 pl-1">Enter Task Name</div>
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
              <div className="flex justify-between px-15 pt-6">
               
             <button onClick={handleSubmit}type="button" className="text-blue-700 hover:text-white border border-[#1C427C] hover:bg-[#1C427C] focus:ring-4 focus:outline-none focus:ring-[#1C427C] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
             <button onClick={onClose}type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Close</button>
              </div>
        
      </div>
    </div>
  );
};

export default ShowAddTaskModal;
