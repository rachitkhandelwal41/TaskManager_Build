import { useNavigate, useParams } from "react-router-dom"
import { viewTask } from "../services/taskApi";
import { useEffect, useState } from "react";



const CalendarIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const ClockIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const XIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const TaskShow=()=> {
  // Sample task data

   useEffect(()=>{
    getToshowTask()},[]
  )
    const navigate=useNavigate();
    const{ listId,taskId }=useParams();
    const [task,setTask] =useState(
       {
    name: "",
    description:"",
    dueDate: "",
    
  }
    )
    
    let lId="";
    let tId=""
    if( listId && taskId){
     lId=listId,
     tId=taskId
    }
    async function getToshowTask(){
    try{
   const res=await viewTask(lId,tId)
   console.log(res);
  if(res){
  setTask({
    name: res.heading,
    description: res.description,
    dueDate: res.date
  });
  console.log(`${res.heading} yuhooo`);
}
   
   }catch{
    
  console.error("Something Happened");
  navigate("/dashboard");
   }
   }
 

  const handleClose = () => {
    navigate("/dashboard")
    console.log("Close button clicked")
  }
 const showDueDate=()=>{
  const setshowdueDate = new Date(task.dueDate)
  const formatted=setshowdueDate.toLocaleDateString("en-GB");
  return formatted;
 }
 const displayDate=showDueDate();

  const getDaysUntilDue = (dateString: string) => {
    const today = new Date()
    const dueDate = new Date(dateString)
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    console.log(diffDays)
    return diffDays
  }

  const daysUntilDue = task.dueDate? getDaysUntilDue(task.dueDate):0;
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div
          className="border-2 border-opacity-20 shadow-xl rounded-lg overflow-hidden"
          style={{ borderColor: "#1C427C" }}
        >
          {/* Header */}
          <div className="text-white rounded-t-lg relative px-8 py-6" style={{ backgroundColor: "#1C427C" }}>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 h-8 w-8 p-0 rounded transition-colors duration-200 flex items-center justify-center"
            >
              <XIcon />
            </button>
            <div className="flex items-start justify-between pr-12">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-3 text-white">{task.name  }</h1>
                <div className="flex items-center gap-2">
                  
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 bg-white">
            <div className="space-y-8">
              {/* Description Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: "#1C427C" }}>
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed text-base">{task.description}</p>
              </div>

              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: "#1C427C" }}>
                  <CalendarIcon />
                  Due Date
                </h2>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-gray-900 font-semibold text-xl mb-1">{displayDate}</p>
                    <p className="text-gray-600 text-sm">
                      {daysUntilDue > 0
                        ? `${daysUntilDue} days remaining`
                        : daysUntilDue === 0
                          ? "Due today"
                          : `${Math.abs(daysUntilDue)} days overdue`}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                      daysUntilDue > 7
                        ? "bg-green-100 text-green-800"
                        : daysUntilDue > 3
                          ? "bg-yellow-100 text-yellow-800"
                          : daysUntilDue >= 0
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    <ClockIcon />
                    {daysUntilDue >= 0 ? "Upcoming" : "Overdue"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TaskShow;