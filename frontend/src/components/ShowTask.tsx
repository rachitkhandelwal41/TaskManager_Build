import { useState } from "react";
import type { Task } from "./ShowList";
import { updateTask  as updateTaskApi} from "../services/taskApi";
import TaskUpdate from "./TaskUpdate";
import { useNavigate } from "react-router-dom";



interface ShowTaskProps {
  task: Task;
  listId: string;
}

const ShowTask = ({ task, listId }: ShowTaskProps) => {
  const [taskComplete, setTaskComplete] = useState(task.hasCompleted);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const[updateTask,setUpdateTask]=useState(false);
  const navigate=useNavigate();

  function handleCheckboxClick() {
    const newStatus = !taskComplete;
    setTaskComplete(newStatus);  
    setLoading(true);       
           
    setErrorMsg("");                
    updateTaskStatus(newStatus);
  }

  async function updateTaskStatus(newStatus: boolean) {
    try {
      const res = await updateTaskApi({
        listId: listId,
        taskId: task._id,
        taskStatus: newStatus,
      });
      if (res) {
        console.log("Task updated successfully");
      }
    } catch (error: any) {
      const errormessage = error?.message || "Task Update failed";
      setErrorMsg(errormessage);
      setTaskComplete(!newStatus); 
    } finally {
      setLoading(false);
    }
  }

  return (
   <div className="pt-4">
  <div className="flex items-center justify-between pl-6 pr-6 space-x-4">
    
    <input
      type="checkbox"
      checked={taskComplete}
      disabled={loading}
      onChange={handleCheckboxClick}
      className=" appearance-none w-6 h-6 border rounded-full border-[#1C427C]
                 cursor-pointer disabled:opacity-50
                 checked:bg-[#61c76d] checked:border-[#61c76d]"
      id={`task-${task._id}`}
    />

    
    <div
    onClick={()=>{
      navigate(`/showTask/${listId}/${task._id}`)

    }}

      className={`flex-1  font-medium transition-all duration-300 
                  overflow-hidden whitespace-nowrap text-ellipsis
                  ${taskComplete ? "text-[#61c76d] line-through" : "text-[#1C427C]"}`}
    >
      {task.heading}
    </div>

    
    <svg
      className="w-5 h-5 flex-shrink-0 cursor-pointer"
      onClick={() => setUpdateTask(true)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="#1C427C"
    >
      <path d="M290.74 93.24L55 329v93h93L418.76 221.26zM471.6 48.34l-7.95-7.95c-18.75-18.75-49.14-18.75-67.88 0L363.48 72.7l75.65 75.65 32.3-32.3c18.74-18.74 18.74-49.14 0-67.88z"/>
    </svg>
  </div>

  
  {updateTask && (
    <TaskUpdate
      listId={listId}
      onClose={() => setUpdateTask(false)}
      task={task}
    />
  )}

  
  {errorMsg && (
    <div className="text-red-500 text-sm pl-12 pt-1">{errorMsg}</div>
  )}
</div>

  );
};

export default ShowTask;
