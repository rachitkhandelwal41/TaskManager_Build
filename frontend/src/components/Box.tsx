import type { ListItem} from "./ShowList";
import addLogo from "../assests/add-to-120.svg"
import { useState } from "react";
import ShowAddTaskModal from "./ShowAddTaskModal";
import ShowTask from "./ShowTask";
import DropForList from "./DropForList";


interface BoxProps {

  item:ListItem
   isSelected: boolean;
  onSelect: () => void;
  selectedId:string
}



const Box = ({item, isSelected, onSelect}:BoxProps) => {
    const[taskModal,setTaskModal]=useState(false);
    const[dropmenu,setDropMenu]=useState(false);
  return (
    <div>
    <div className={`bg-white my-6 mx-4 w-72 h-60 rounded-xl border-2 ${
        isSelected
          ? "border-solid border-3 border-[#1C427C]/80 shadow-lg shadow-[#1C427C]/40"
          : "border border-[#1C427C]/80"
      } cursor-pointer flex flex-col`}
      onClick={onSelect}><div className="flex items-center justify-between ">
        <div className="text-xl pl-4 pt-4 text-[#1C427C] font-medium">
        {item.listName}</div>
        <div className="  relative  pt-4 pr-4">
            <svg onClick={()=>{
                setDropMenu(!dropmenu)
            }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1C427C" width="24" height="24">
  <circle cx="12" cy="5" r="2"/>
  <circle cx="12" cy="12" r="2"/>
  <circle cx="12" cy="19" r="2"/>
</svg>
{dropmenu &&< DropForList onComplete={()=>{setDropMenu(false)}} listId={item._id}/>}

        </div>
        </div>  
        <div className=" flex items-center mt-3">
            <div>
           <img onClick={()=>{
            setTaskModal(!taskModal)}} className="w-12 h-12 ml-3"src={addLogo} alt="add"/>
            </div>
            <div 
            onClick={()=>{
            setTaskModal(!taskModal)}}
            className="text ml-4  font-medium text-[#1C427C] ">
                 Add a Task
            </div>
           
        </div>


<div className="overflow-y-auto mt-1 px-4 pb-2  mx-4 my-2  rounded-xl  border-[#1C427C] bg-[#1C427C]/15 shadow-md shadow-[#1C427C] hover:border-2 border-dotted" style={{ flex: 1 }}>
    {
        item.tasks.map((task)=>(
            <ShowTask key={task._id} listId={item._id} task={task} />
        ))
    }
</div>
    </div>
    {taskModal && <ShowAddTaskModal   listId={item._id} onClose={()=>{setTaskModal(false)}}/>}
    </div>
  )
}

export default Box