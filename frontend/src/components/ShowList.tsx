import { useEffect, useState } from "react"
import { viewList } from "../services/taskApi";
import Box from "./Box";
import {  useRecoilValue } from "recoil";
import { Refresh } from "../atoms/Refresh";

export interface ListItem {
  _id: string;
  userId: string;
  listName: string;
  tasks: Task[];
}
export interface Task {
  _id: string; 
  heading: string;
  description?: string;
  date: string; 
  hasCompleted: boolean;
}
const ShowList = () => {
    const[list,setList]=useState<ListItem[]>([]);
      const [selectedId, setSelectedId] = useState<string | null>(null);
      
      const refresh=useRecoilValue(Refresh);

    async function getLists(){
         const listdata=await viewList();
         if(listdata){
            setList(listdata);
         }else{
            throw new Error("Something came up")
         }
    }
    useEffect(()=>{
        getLists();
    },[refresh]);
  return (
    
    <div className="flex flex-wrap gap-6 ml-16 md:ml-12  ">
        {list.map((item)=>(<Box  key={item._id} item={item} isSelected={selectedId === item._id} selectedId={item._id}
          onSelect={() => setSelectedId(item._id)} /> ))}
    </div>
  )
}

export default ShowList