import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "../components/InputBox"
import { useRecoilState, useSetRecoilState } from "recoil"
import {  SignInn } from "../atoms/SignIn"
import { useState } from "react"
import { signingIn } from "../services/authApi"
import { jwtToken } from "../atoms/JwtToken"
const SignIn = () => {
  const[formData,setFormData]=useRecoilState(SignInn);
  const navigate=useNavigate();
  const[showError,setShowError]=useState(false);
  const setToken=useSetRecoilState(jwtToken);

  function handleInput(name:string, value:string){
     setFormData((prev)=>({
      ...prev,
      [name]:value
     }))
  }
  async function handleSubmit(event:any){
    event.preventDefault();
    try{
    const response=await signingIn(formData.email,formData.password);
    if(!response){
      setShowError(true);
      throw new Error("Invalid Inputs");
    }
    setFormData({
      email:"",
      password:""
    }
    )
    setShowError(false);
    localStorage.setItem("token",response);
    setToken(response);
    navigate("/dashboard");
  }catch(error:any){
     setShowError(true);
     alert("Soething went wrong");
     console.log(error.message);
  }
  }

  return (
  <div className="bg-[#1c437d] h-screen w-screen">
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="text-white text-6xl font-bold ">
        Sign In
      </div>
      
<div className="relative w-80 mt-16">
  <InputBox 
  name="email" text="Email" placeholder="Enter your Email" type="email" onchange={handleInput}/>
</div>
<div className="relative w-80 mt-8">
  <InputBox name="password" text="Password" placeholder="Enter your password" type="password" onchange={handleInput}/>
  
</div>
<div className="w-80 mt-4 ">
  <label className="flex items-center text-white text-sm space-x-1">
    <span>Not a user?</span>
    <Link to="/signup">
    <label className="pl-1 cursor-pointer underline">Sign Up</label>
    </Link>

  </label>
</div>
<div className="w-80 mt-8 flex justify-center">
  <button
  onClick={handleSubmit}
  className="border border-white bg-white rounded-sm text-[#1c437d] px-6 py-2 text-xl font-bold cursor-pointer" >Sign In</button>
</div>
{showError && ( <div className="font-bold text-xl text-red-900  m-2 mt-12">
              Signin Failed!
            </div>
          )}

    </div>
  </div>
)
}
export default SignIn
