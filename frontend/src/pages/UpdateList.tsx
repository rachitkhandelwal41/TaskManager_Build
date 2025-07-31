import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateLists } from "../services/taskApi";




const UpdateList = () => {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const navigate=useNavigate();
const { id }=useParams();
let listId="";
if(typeof(id)!=='string'){
    navigate("/dashboard")
}else{
    listId=id;
}

async function updateListName(){
try{
const res=await updateLists(listId,name);
if(res){
    navigate("/dashboard")
}
}catch(error:any){
  console.error("Something Happened");
}

}
  // Auto-focus input on modal open
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") ()=>{};
      if (e.key === "Enter") ()=>{};
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={() =>{
navigate("/dashboard")

      } }
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white px-8 py-6 rounded-xl shadow-xl flex items-center gap-4 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded-lg border-[#97A9C3] border-2 border-dashed focus:border-[#1C427C] focus:outline-none w-full"
          type="text"
          placeholder="Enter Your New List Name"
        />

        <svg
        onClick={updateListName}
          className="cursor-pointer shrink-0"
          width="50"
          height="50"
          viewBox="0 0 512 512"
          fill="#1C427C"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M460.8 256c0 17.92 3.2 36.48-6.4 52.48s-13.44 33.92-23.04 48c-9.6 14.08-22.4 25.6-30.72 41.6-8.32 16-11.52 34.56-23.04 48s-30.72 17.92-48 23.04c-17.28 5.12-35.84 9.6-52.48 6.4-17.28-3.2-33.28-14.08-51.84-14.08s-34.56 10.88-51.84 14.08c-17.28 3.2-35.84-1.28-52.48-6.4s-34.56-11.52-48-23.04-17.92-30.72-23.04-48c-5.12-17.28-9.6-35.84-6.4-52.48 3.2-17.28 14.08-33.28 14.08-51.84s-10.88-34.56-14.08-51.84c-3.2-17.28 1.28-35.84 6.4-52.48s11.52-34.56 23.04-48c11.52-13.44 30.72-17.92 48-23.04 17.28-5.12 35.84-9.6 52.48-6.4 17.28 3.2 33.28 14.08 51.84 14.08s34.56-10.88 51.84-14.08c17.28-3.2 35.84 1.28 52.48 6.4 17.28 5.12 34.56 11.52 48 23.04 13.44 11.52 17.92 30.72 23.04 48s9.6 35.84 6.4 52.48c-3.2 17.28-14.08 33.28-14.08 51.84zM207.68 294.4l-33.28-33.28c-8.96-8.96-22.4-8.96-30.72 0-8.96 8.96-8.96 22.4 0 30.72l48 48c8.96 8.96 22.4 8.96 30.72 0l144-144c8.96-8.96 8.96-22.4 0-30.72-8.96-8.96-22.4-8.96-30.72 0l-128 128z" />
        </svg>
      </div>
    </div>
  );
};

export default UpdateList;
