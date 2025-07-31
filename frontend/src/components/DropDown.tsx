import { useNavigate } from "react-router-dom";



const DropDown = () => {
    const navigate=useNavigate();
function Logout(){
    localStorage.removeItem("token");
    navigate("/signin")

}
  return (
    <div onClick={Logout}
      tabIndex={0} 
      className="absolute mt-2 right-1/2 translate-x-1/3 w-42 mr-2 h-12 py-3 
                 rounded border border-transparent shadow-lg text-center 
                 text-[#1C427C] cursor-pointer focus:outline-none 
                 focus:border-[#1C427C]/10 bg-[#1C427C]/10 font-medium"
    >
      Logout
    </div>
  );
};

export default DropDown;
