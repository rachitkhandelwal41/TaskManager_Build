
import { useState } from "react"
import add from "../assests/add-to-120.svg"
import AddListModal from "./AddListModal";
const AddList = () => {
    const[modal,setModal]=useState(false);
  return (
    <div className={`fixed bottom-5 right-30 md:fixed bottom-25 right-30`}>
        <img className="w-25 h-25 cursor-pointer"
        onClick={()=>setModal(true)}
        src={add} alt="addList"/>
        <div>
            {modal && <AddListModal setModal={setModal}/>}
        </div>
    </div>
  )
}

export default AddList