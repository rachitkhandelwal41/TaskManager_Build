
import logo  from "../assests/logo.png"
import avatar from "../assests/Avatar.jpg"
import { useState } from "react"
import DropDown from "./DropDown";
const NavBar = () => {
  const[drop,setDrop]=useState(false);
  return (
    
    <div className="bg-[#1C427C] h-18 flex justify-between items-center">
        <div className="flex  items-center">

                <img className="h-16 w-26 "src={logo} alt="Logo" />
                
            <div className="text-white text-xl font-medium">
              TasksBoard
            </div>
            
        </div>
        <div className="relative">
        <img 
        onClick={()=>{setDrop(!drop)}}
        className="w-14 h-14 mr-16 rounded-full cursor-pointer" src={avatar} alt="Rounded avatar"></img>
       
       
         {drop && <DropDown/>}
          </div>
           </div>
        
  )
}

export default NavBar