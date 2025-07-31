import { apiConnector } from "./apiConnector"
const baseUrl=import.meta.env.VITE_BASE_URL;

export const signingUp=async (username:string,email:string,password:string)=>{
    try{
       const response=await apiConnector({
        method:"POST",
        url:`${baseUrl}/user/signup`,
        body:{
            userData:{
                username:username,
                email:email,
                password:password
            }
        },
        customHeaders:{}

       });
       if(response.status!==200){
        throw new Error(response.data?.message ||"Signup Failed");
       }
       return response.data.token || "Signup failed";
    }catch(error:any){
        const errormessage=error?.message || "SignUp failed";
        throw new Error(errormessage);
    }
};

export const signingIn=async (email:string,password:string)=>{
    try{
    const response=await apiConnector({
        method:"POST",
        url:`${baseUrl}/user/signin`,
        body:{
            userData:{
                email:email,
                password:password
            }
        },
        customHeaders:{},
    });
    if(response.status!==200){
        throw new Error(response?.data?.message || "Error while Signing up")
    }
    return response.data.token || "SignUp Failed";
}catch(error:any){
        const errormessage=error?.message || "Issue while Signing in";
        throw new Error(errormessage);
    }
};