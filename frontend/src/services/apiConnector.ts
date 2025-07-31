import axios from "axios";
 type Connector={
    method: "GET" | "POST" | "PUT" | "DELETE";
    url:string;
    body?:any;
    customHeaders?:any
}
 export const apiConnector=async({
    method,
    url,
    body,
    customHeaders}:Connector
 )=>{
    const token=localStorage.getItem("token");

    try{
        const config={
            method,
            url,
            headers:{
                "Content-Type":"application/json",
                ...(token && {Authorization:`Bearer ${token}`}),
                ...customHeaders,
            },
            ...(method!=="GET" && {data:body}),
        };
        const response=await axios(config);
        return response;
    }catch(error:unknown){
        console.log("Api Error:");
        throw error;
    }

 };