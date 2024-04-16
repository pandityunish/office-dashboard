import { allorgbranchesurl, approvethevisitorurl, getpropuseurl, getrecentvisitorurl, getsubadminurl, updatestaffurl } from "../apiurl";
import axiosInstance from "../axios";

export const getorgbranchdetails=async({toast,setbranchesdetails,id})=>{
    try {
      
        const token=localStorage.getItem("access");
        console.log(token)
      const response=await axiosInstance.get(`${allorgbranchesurl}${id}`,{headers:{
        "Authorization":`Bearer ${token}`
      }});
      // console.log(response)
      if(response.status==200){
        setbranchesdetails(response.data);
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
export const approvethevisitor=async({toast,id})=>{
  try {
    
      const token=localStorage.getItem("access");
      const data={
        "visit_id":id,
        "is_approved":true
      }
    const response=await axiosInstance.post(`${approvethevisitorurl}`,
    data,
    {headers:{
      "Authorization":`Bearer ${token}`
    },
  
  },);
    // console.log(response)
    if(response.status==200){
     
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
export const branchupdate=async({toast,id,request})=>{
  try {
    
      const token=localStorage.getItem("access");
      const data={
        "lock_branch":request
      }
    const response=await axiosInstance.patch(`${allorgbranchesurl}${id}/`,
    data,
    {headers:{
      "Authorization":`Bearer ${token}`
    },
  
  },);
    console.log(response)
    if(response.status==200){
     
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
export const aciveanddiactivethesubadmin=async({toast,id,isactive})=>{
  try {
    
      const token=localStorage.getItem("access");
      const data={
       
        "active":isactive
      }
    const response=await axiosInstance.post(`${updatestaffurl}/${id}/`,
    data,
    {headers:{
      "Authorization":`Bearer ${token}`
    },
  
  },);
    // console.log(response)
    if(response.status==200){
     
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
export const unapprovethevisitor=async({toast,id})=>{
  try {
    
      const token=localStorage.getItem("access");
      const data={
        "visit_id":id,
        "is_approved":false
      }
    const response=await axiosInstance.post(`${approvethevisitorurl}`,
    data,
    {headers:{
      "Authorization":`Bearer ${token}`
    },
  
  },);
    // console.log(response)
    if(response.status==200){
     
       console.log(response.data);
    } else{
      // toast.error("Something went wrong")
      // console.log(response)
    } 
  } catch (error) {
      console.log(error)
  }
}
export const getorgvisitordetails=async({toast,setvisitordetails,id})=>{
  try {
    
      const token=localStorage.getItem("access");
      console.log(token)
    const response=await axiosInstance.get(`${getrecentvisitorurl}/${id}`,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    // console.log(response)
    if(response.status==200){
      setvisitordetails(response.data);
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
export const getsubadmindetails=async({toast,setsubadmin,id})=>{
  try {
    
      const token=localStorage.getItem("access");
      console.log(token)
    const response=await axiosInstance.get(`${getsubadminurl}${id}/`,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    // console.log(response)
    if(response.status==200){
      setsubadmin(response.data);
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
export const getsubadminlist=async({toast,setsubadmin,searchtext})=>{
    try {
      console.log(searchtext);
        const token=localStorage.getItem("access");
        console.log(token)
      const response=await axiosInstance.get(`${getsubadminurl}?search=${searchtext}`,{headers:{
        "Authorization":`Bearer ${token}`
      }});
      // console.log(response)
      if(response.status==200){
        setsubadmin(response.data);
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

export const getpurposes=async({setpurpose})=>{
  try {
    
      const token=localStorage.getItem("access");
      console.log(token)
    const response=await axiosInstance.get(getpropuseurl,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    // console.log(response)
    if(response.status==200){
      setpurpose(response.data);
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

export const deletesubadmin=async({toast,id})=>{
  try {
  
      const token=localStorage.getItem("access");
     
    const response=await axiosInstance.delete(`${getsubadminurl}${id}/`,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    console.log(response)
    if(response.status==204){
      
       console.log(response.data);
       toast.success("Sub admin Delete Successfully")
    } else{
      // toast.error("Something went wrong")
      // console.log(response);
      toast.error("Sub admin Delete Unsuccessfully")
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      toast.error("Sub admin Delete Unsuccessfully")
      console.log(error)
  }
}