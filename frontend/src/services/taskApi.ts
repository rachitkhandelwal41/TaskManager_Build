import { apiConnector } from "./apiConnector"
const baseUrl=import.meta.env.VITE_BASE_URL;
export const viewData=async ()=>{
    try{
      const response=await apiConnector({
        method:"GET",
        url:`${baseUrl}/home`,
        customHeaders:{}
      })
     if(!response){
        throw new Error("Failed to get Records");
     }else{
        return response.data.lists;
     }

    }catch(error:any){
         console.log(error.message ||"Error");
        throw new Error("Something Up");
      

    }
}
export const addNewList=async(listName:string)=>{
  try{
   const response=await apiConnector({
      method:"POST",
      url:`${baseUrl}/user/list/createList`,
      body:{
         listName:listName
      },
      customHeaders:{}
   })
   if(response.status==201){
      console.log("List Created");
      return response;
   }else{
      throw new Error(response.data?.message || "List Creation failed");
   }
  }catch(error:any){
   const errormessage=error?.message || "List creation failed";
        throw new Error(errormessage);
  }
}

export const viewList=async()=>{
   try{
  const response=await apiConnector({
   method:"GET",
   url:`${baseUrl}/user/home`,
   customHeaders:{}
  })
  if(response){
     console.log("List Fetched SuccessFully");
     return response.data.lists;
     
  }else{
   throw new Error( "List Fetch failed");
  }
   }catch(error:any){
 const errormessage=error?.message || "List Fetch failed";
        throw new Error(errormessage);
   }
}
export const addNewTask=async(listId:string,taskName:string,taskDescription:string,date:Date)=>{
   
  try{
   const response=await apiConnector({
      method:"POST",
      url:`${baseUrl}/user/list/${listId}/createTask`,
      
      body:{
         taskName,
         taskDescription,
         date,
      },
      customHeaders:{}
   })
   if(response.status==201){
      console.log("Task  Created");
      return response;
   }else{
      throw new Error(response.data?.message || "Task Creation failed");
   }
  }catch(error:any){
   const errormessage=error?.message || "Task creation failed";
        throw new Error(errormessage);
  }
}
type updateTaskOptions={
   listId:string;taskId:String;taskName?:string;taskDescription?:string;date?:Date;taskStatus?:boolean;
}

export const updateTask=async(options:updateTaskOptions)=>{
    const { listId, taskId, taskName, taskDescription, date, taskStatus } = options;
  try{
   const response=await apiConnector({
      method:"PUT",
      url:`${baseUrl}/user/list/updatelist/${listId}/updateTask/${taskId}`,
      
      body:{
         taskName,
         taskDescription,
         date,
         taskStatus
      },
      customHeaders:{}
   })
   if(response.status==200){
      console.log("Task  Updated");
      return response;
   }else{
      throw new Error(response.data?.message || "Task Update failed");
   }
  }catch(error:any){
   const errormessage=error?.message || "Task Update failed";
        throw new Error(errormessage);
  }
}
export const deleteTasks=async(listId:string,taskId:string)=>{
   
  try{
   const response=await apiConnector({
      method:"DELETE",
      url:`${baseUrl}/user/list/delete/${listId}/task/${taskId}`,
      
      body:{
      },
      customHeaders:{}
   })
   if(response.status==200){
      console.log("Task Deleted");
      return response;
   }else{
      throw new Error(response.data?.message || "Task Delete failed");
   }
  }catch(error:any){
   const errormessage=error?.message || "Task Delete failed";
        throw new Error(errormessage);
  }
}

export const deleteLists=async(listId:string)=>{
   
  try{
   const response=await apiConnector({
      method:"DELETE",
      url:`${baseUrl}/user/list/delete/${listId}/`,
      
      body:{
      },
      customHeaders:{}
   })
   if(response.status==200){
      console.log("List Deleted");
      return response;
   }else{
      throw new Error(response.data?.message || "List Delete failed");
   }
  }catch(error:any){
   const errormessage=error?.message || "List Delete failed";
        throw new Error(errormessage);
  }
}

export const updateLists=async(listId:string,listName:string)=>{
   
  try{
   const response=await apiConnector({
      method:"PUT",
      url:`${baseUrl}/user/list/updatelist/${listId}`,
      
      body:{
         updatedListName:listName
      },
      customHeaders:{}
   })
   if(response.status==200){
      console.log("List Updated");
      return response;
   }else{
      throw new Error(response.data?.message || "List Update failed");
   }
  }catch(error:any){
   const errormessage=error?.message || "List  Update failed";
        throw new Error(errormessage);
  }
}

export const viewTask=async(listId:string,taskId:string)=>{
   try{
  const response=await apiConnector({
   method:"GET",
   url:`${baseUrl}/user/list/show/${listId}/task/${taskId}`,
   customHeaders:{}
  })
  if(response){
   
     return response.data.list;
     
  }else{
   throw new Error( "Task Fetch failed");
  }
   }catch(error:any){
 const errormessage=error?.message || "Task Fetch failed";
        throw new Error(errormessage);
   }
}