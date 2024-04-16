import { getalldevicesurl, notificationurl } from "../apiurl";
import axiosInstance from "../axios";

export const postnotification=async({toast,notification_type,target_audience,title,message,Attach_File})=>{
    try {
      console.log(Attach_File)
        const token=localStorage.getItem("access");
        const formData=new FormData();
        formData.append('Attach_File', Attach_File,Attach_File.name)
        formData.append('audience', target_audience)
        formData.append('notification_type', notification_type)
        formData.append('title', title)
        formData.append('message', message)
       
      const response=await axiosInstance.post(notificationurl,
        formData,
      {headers:{
        "Authorization":`Bearer ${token}`
      },
    
    },);
      console.log(response)

      if(response.status==201){
       
         console.log(response.data);
         toast.success("Notification Sent successfully")
      } else{
        // toast.error("Something went wrong")
        // console.log(response)
      } 
    } catch (error) {
        toast.error("Something went wrong")
        console.log(error)
    }
  }

  export const getnotifications=async({toast,setnotifications,id,created_at})=>{
    try {
      
        const token=localStorage.getItem("access");
        console.log(token)
      const response=await axiosInstance.get(`/notification/${id}/list?created_at=${created_at}`,{headers:{
        "Authorization":`Bearer ${token}`
      }});
      // console.log(response)
      if(response.status==200){
        setnotifications(response.data);
         console.log(response.data);
      } else{
        toast.error("Something went wrong")
        // console.log(response)
      } 
    } catch (error) {
        toast.error("Something went wrong")
        console.log(error)
    }
  }
  export const getnotificationscount=async({toast,setnotificationscount,id})=>{
    try {
      
        const token=localStorage.getItem("access");
        console.log(token)
      const response=await axiosInstance.get(`/notification/${id}/notifications-count`,{headers:{
        "Authorization":`Bearer ${token}`
      }});
      console.log(response)
      if(response.status==200){
        setnotificationscount(response.data);
         console.log(response.data);
      } else{
        // toast.error("Something went wrong")
        // console.log(response)
      } 
    } catch (error) {
        // toast.error("Something went wrong")
        console.log(error)
    }
  }
  export const getdetailsnotifications=async({toast,setdetails,id})=>{
    try {
      
        const token=localStorage.getItem("access");
        console.log(token)
      const response=await axiosInstance.get(`/notification/${id}/detail`,{headers:{
        "Authorization":`Bearer ${token}`
      }});
      // console.log(response)
      if(response.status==200){
        setdetails(response.data);
         console.log(response.data);
      } else{
        toast.error("Something went wrong")
        // console.log(response)
      } 
    } catch (error) {
        toast.error("Something went wrong")
        console.log(error)
    }
  }
  export const updatenotification=async({toast,id})=>{
    try {
      
        const token=localStorage.getItem("access");
        console.log(token);
        const data={
          
            "is_seen": true
            
        }
      const response=await axiosInstance.patch(`${notificationurl}${id}/`,
      data,
      {headers:{
        "Authorization":`Bearer ${token}`
      }});
      // console.log(response)
      if(response.status==200){
        // setdetails(response.data);
         console.log(response.data);
      } else{
        // toast.error("Something went wrong")
        // console.log(response)
      } 
    } catch (error) {
        toast.error("Something went wrong")
        console.log(error)
    }
  }
  export const getlogdevices=async({toast,setdevices})=>{
    try {
      
        const token=localStorage.getItem("access");
        console.log(token)
      const response=await axiosInstance.get(getalldevicesurl,{headers:{
        "Authorization":`Bearer ${token}`
      }});
      // console.log(response)
      if(response.status==200){
        setdevices(response.data);
         console.log(response.data);
      } else{
        toast.error("Something went wrong")
        // console.log(response)
      } 
    } catch (error) {
        toast.error("Something went wrong")
        console.log(error)
    }
  }