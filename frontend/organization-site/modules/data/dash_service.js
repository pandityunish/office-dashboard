import { allorgbranchesurl, baseurl, filtervisitorurl, getadsbannerurl, getrecentvisitorurl, getsubscriptionurl } from "../apiurl";
import axiosInstance from "../axios"

export const getorgbranch=async({toast,setbranches,searchtext,startdate,enddate,id})=>{
    try {
      console.log(searchtext);
        const token=localStorage.getItem("access");
        console.log(token)
      const response=await axiosInstance.get(`/organization/${id}/branches/list?search=${searchtext}&date_min=${startdate}&date_max=${enddate}`,{headers:{
        "Authorization":`Bearer ${token}`
      }});
      // console.log(response)
      if(response.status==200){
        setbranches(response.data);
         console.log(response.data);
      } else{
        toast.error("Something went wrong")
        // console.log(response)
      } 
    } catch (error) {
        // toast.error("Something went wrong")
        console.log(error)
    }
}
export const deletebranch=async({toast,id})=>{
  try {
  
      const token=localStorage.getItem("access");
     
    const response=await axiosInstance.delete(`${allorgbranchesurl}${id}/`,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    console.log(response)
    if(response.status==204){
      
       console.log(response.data);
       toast.success("Branch Delete Successfully")
    } else{
      // toast.error("Something went wrong")
      // console.log(response);
      toast.error("Branch Delete Unsuccessfully")
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      toast.error("Branch Delete Unsuccessfully")
      console.log(error)
  }
}
export const deletevisitor=async({toast,id})=>{
  try {
  
      const token=localStorage.getItem("access");
     
    const response=await axiosInstance.delete(`/organization/visitor-history/${id}/delete`,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    console.log(response)
    if(response.status==204){
      
       console.log(response.data);
       toast.success("Branch Delete Successfully")
    } else{
      // toast.error("Something went wrong")
      // console.log(response);
      toast.error("Branch Delete Unsuccessfully")
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      toast.error("Branch Delete Unsuccessfully")
      console.log(error)
  }
}
export const getrecentvisitor=async({toast,setvisitor})=>{
    try {
        const token=localStorage.getItem("access");
      const response=await axiosInstance.get(`${getrecentvisitorurl}?search=&is_approved=True`,{headers:{
        "Authorization":`Bearer ${token}`
      }});
      console.log(response)
      if(response.status==200){
        setvisitor(response.data);
         
      } else{
        // toast.error("Something went wrong")
        console.log(response)
      } 
    } catch (error) {
        // toast.error("Something went wrong")
        console.log(error)
    }
}
export const getuserkyc=async({toast,setkyc})=>{
  try {
      const token=localStorage.getItem("access");
    const response=await axiosInstance.get(`${getrecentvisitorurl}?search=&is_approved=True`,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    console.log(response)
    if(response.status==200){
      setvisitor(response.data);
       
    } else{
      // toast.error("Something went wrong")
      console.log(response)
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      console.log(error)
  }
}
export const getnewvisitor=async({toast,setvisitor,searchtext,startdate,enddate})=>{
  try {
      const token=localStorage.getItem("access");
    const response=await axiosInstance.get(`${getrecentvisitorurl}?date_from=${startdate}&date_to=${enddate}?search=${searchtext}&is_approved=True`,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    console.log(response)
    if(response.status==200){
      setvisitor(response.data);
       
    } else{
      // toast.error("Something went wrong")
      console.log(response)
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      console.log(error)
  }
}
export const getvisitorreport=async({setvisitor})=>{
  try {
      const token=localStorage.getItem("access");
    const response=await axiosInstance.get(`/visitor/report/org`,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    console.log(response)
    if(response.status==200){
      setvisitor(response.data);
       
    } else{
      // toast.error("Something went wrong")
      console.log(response)
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      console.log(error)
  }
}
export const getnextperviousvisitor=async({toast,setvisitor,nexturl})=>{
  try {
      const token=localStorage.getItem("access");
    const response=await axiosInstance.get(nexturl,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    console.log(response)
    if(response.status==200){
      setvisitor(response.data);
       
    } else{
      // toast.error("Something went wrong")
      console.log(response)
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      console.log(error)
  }
}
export const getwaitingvisitor=async({toast,setwaitingvisitor,searchtext})=>{
  try {
      const token=localStorage.getItem("access");
      console.log(token)
    const response=await axiosInstance.get(`${getrecentvisitorurl}?search=${searchtext}&is_approved=False`,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    console.log(response)
    if(response.status==200){
      setwaitingvisitor(response.data);
       
    } else{
      // toast.error("Something went wrong")
      console.log(response)
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      console.log(error)
  }
}
export const getadsbanner=async({setbanner})=>{
  try {
      const token=localStorage.getItem("access");
      console.log(token)
    const response=await axiosInstance.get(getadsbannerurl,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    console.log(response.data)
    if(response.status==200){
      setbanner(response.data);
       
    } else{
      // toast.error("Something went wrong")
      console.log(response)
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      console.log(error)
  }
}
export const filterreportgraph=async({toast,setdata,id,startdate,enddate,purpose})=>{
  try {
      const token=localStorage.getItem("access");
    const response=await axiosInstance.get(`${filtervisitorurl}/${id}/?start_date=${startdate}&end_date=${enddate}&purpose=${purpose}`,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    if(response.status==200){
      setdata(response.data);
     console.log(response.data)
    } else{
      // toast.error("Something went wrong")
      console.log(response)
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      console.log(error)
  }
}
export const getsubscription=async({toast,setsub})=>{
  try {
      const token=localStorage.getItem("access");
    const response=await axiosInstance.get(getsubscriptionurl,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    console.log(response)
    if(response.status==200){
      setsub(response.data);
     console.log(response.data)
    } else{
      // toast.error("Something went wrong")
      console.log(response)
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      console.log(error)
  }
}
export const downloadvisitor=async({toast})=>{
  try {
      const token=localStorage.getItem("access");
    const response=await axiosInstance.get(`${getrecentvisitorurl}/visitor/report/org`,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    if(response.status==200){
      // setdata(response.data);
     console.log(response.data);
     downloadCSV(`${baseurl}/${response.data["csv_file_link"]}`)
    } else{
      // toast.error("Something went wrong")
      console.log(response)
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      console.log(error)
  }
}
const downloadCSV = async (file) => {
  try {
    const response = await fetch(file);
    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'visiting.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading CSV:', error);
  }
};
export const downloadImage = async (originalImage) => {

console.log(originalImage)
  
  fetch(originalImage, {
    method: "GET",
    headers: {}
  })
    .then(response => {
      response.arrayBuffer().then(function(buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.png"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const getvisitorcount=async({toast,setcount,id})=>{
  try {
      const token=localStorage.getItem("access");
    const response=await axiosInstance.get(`/organization/${id}/visitor-count`,{headers:{
      "Authorization":`Bearer ${token}`
    }});
    console.log(response)
    if(response.status==200){
      setcount(response.data);
     console.log(response.data)
    } else{
      // toast.error("Something went wrong")
      console.log(response)
    } 
  } catch (error) {
      // toast.error("Something went wrong")
      console.log(error)
  }
}