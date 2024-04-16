import axiosInstance from "../axios";

export const getorgprofile=async({toast,setorgkyc,id})=>{
    try {
      
        const token=localStorage.getItem("access");
        console.log(id)
      const response=await axiosInstance.get(`/organization/${id}/organization-kyc/list`,{headers:{
        "Authorization":`Bearer ${token}`
      }});
      if(response.status==200){
        setorgkyc(response.data);
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

export const updateprofile=async({toast,setprofile,id,logo})=>{
  try {
    
      const token=localStorage.getItem("access");
      const formData = new FormData()
      console.log(id);
      formData.append("logo",logo);
    const response=await axiosInstance.put(`/organization/${id}/logo/update`,
    formData,
    {
      
      headers:{
      "Authorization":`Bearer ${token}`
    },});
    if(response.status==200){
      setprofile(response.data);
      toast.success("Update successfully")
    } else{
      // toast.error("Something went wrong")
      // console.log(response)
    } 
  } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
  }
}