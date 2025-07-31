
import { useRecoilState } from "recoil";
import { deleteLists } from "../services/taskApi";
import { useNavigate } from "react-router-dom";
import { Refresh } from "../atoms/Refresh";


interface DropForListProps{
  onComplete:()=>void
  listId:string
}

const DropForList = ({onComplete,listId}:DropForListProps) => {
  const navigate=useNavigate()
   const [refresh,setRefresh]=useRecoilState(Refresh);
function updateListName(){

  onComplete();
  navigate(`/updateList/${listId}`)
  

}

async function deleteList(){
  try{
    const response=await deleteLists(listId)
    if(response){
     onComplete();
     setRefresh(!refresh)
    }
    
  }catch(error:any)
  {
const errormessage=error?.message || "List Delete failed";
        throw new Error(errormessage);
    }
    
  }


  return (
    <div className="absolute rounded-xl left-1/2 top-21 transform -translate-x-1/2 -translate-y-1/2 w-28 bg-white border border-[#1C427C] text-white rounded shadow-lg p-2 text-center">
      <div
      onClick={updateListName}
      className="py-1 rounded-xl text-[#1C427C] hover:bg-[#1C427C]/80 hover:text-black cursor-pointer">Update</div>
      
      <div
      onClick={deleteList}
      className="py-1 rounded-xl text-[#1C427C] hover:bg-red-500 hover:text-black cursor-pointer">Delete</div>
    </div>
  );
};

export default DropForList;
