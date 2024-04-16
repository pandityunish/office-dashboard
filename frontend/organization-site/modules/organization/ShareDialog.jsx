import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import {
    EmailShareButton,
    FacebookShareButton,
    GabShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
  } from "react-share";
  import { FaFacebook } from "react-icons/fa";
  import { FaWhatsapp } from "react-icons/fa";
  import { CiMail } from "react-icons/ci";
  import { FaXTwitter } from "react-icons/fa6";

export default function ShareDialog({handleClose,open,url}) {
  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: {  padding: '20px', height:"136px", width:"440px"} }}>
  
  <DialogContent>
 <div className='flex justify-between'>
 <FacebookShareButton url={url}>
    <div classname="text-7xl bg-red-500">
    <FaFacebook className="text-5xl text-black"/>
    </div>
       
</FacebookShareButton>
   <WhatsappShareButton url={url}>
   <div classname="text-7xl ">
    <FaWhatsapp className="text-5xl text-black"/>
    </div>
   </WhatsappShareButton>
   <EmailShareButton url={url}>
   <div classname="text-7xl ">
    <CiMail className="text-5xl text-black"/>
    </div>
   </EmailShareButton>
   <TwitterShareButton url={url}>
   <div classname="text-7xl ">
    <FaXTwitter className="text-5xl text-black"/>
    </div>
   </TwitterShareButton>
 </div>
  </DialogContent>
 
</Dialog>
  )
}
