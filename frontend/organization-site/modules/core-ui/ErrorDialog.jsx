import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import Image from 'next/image'

export default function ErrorDialog({handleClose,open,onclick,text}) {
  
  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: '5%', padding: '20px', height:"333px", width:"440px"} }}>
  
  <DialogContent>
    <div className="flex flex-col items-center justify-center">
    <Image src="/alert.png" className="mt-4" alt="some" width={100} height={100}/>
<p className="font-normal text-sm font-inter mt-8">Are you sure you want to {text}</p>
    </div>
   <div className="flex justify-center items-center gap-10 mt-6">
   <button
   onClick={onclick}
                  type='submit'
                  className='inline-flex h-[53px] w-[152px] items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                Yes 
                </button>
                <p className="text-base font-medium font-inter cursor-pointer" onClick={()=>handleClose()}>No, Cancel</p>
   </div>
  </DialogContent>
 
</Dialog>
  )
}
