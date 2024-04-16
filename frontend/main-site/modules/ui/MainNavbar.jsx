"use client"
import Link from 'next/link'
import DefaultButton from '../core-ui/Buttons'
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from 'next/navigation';
const navLinks = [
  { text: 'About', href: '/about-us' },
  { text: 'Features', href: '/contact' },
  { text: 'Careers', href: '/job-board' },
  { text: 'Contact', href: '/getintouch' },
 
]

export default function MainNavbar () {
  const router=useRouter();
  return (
    <header className='pb-6 bg-bgcolor font-inter lg:pb-0 pt-3'>
      <p className=' text-center font-bold text-red-400'>Under Development</p>
      <div className='px-4 mx-auto bg-bgcolor w-[1200px] lg:w-full sm:px-6 lg:px-16'>
        <nav className='flex items-center justify-between h-16 lg:h-14'>
          <div className='flex-shrink-0'>
            <Link href='/'  className='flex'>
              <img className='w-auto h-6 lg:h-8' src='/logo.svg' alt='' />
            </Link>
          </div>
          
          <div className=' flex items-center  space-x-10'>
            {navLinks.map((link, index) => (
            <div className='flex items-center gap-2' key={index} onClick={()=>{
              router.push(link.href)
            }}>
                <p
           
                
                className='text-base leading-[19px] font-normal cursor-pointer  text-lightneutral transition-all duration-200 hover:text-blue-600 focus:text-blue-600'
              >
                {link.text}

              </p>
            {index===1?  <IoIosArrowDown className='mt-1 text-sm'/>:<></>}
            </div>
            ))}
          </div>
         <div className='flex gap-7 items-center'>
          <p className='text-base leading-[19px] font-bold font-inter cursor-pointer text-lightneutral ' onClick={()=>{
          router.push("https://office.epass.com.np/login")
         }}>Login</p>
         <div className='w-[129px]  ' onClick={()=>{
          router.push("https://office.epass.com.np/register")
         }}>
            <DefaultButton text="Get Started"/>
          </div>
         </div>
        </nav>
        
      </div>
    </header>
  )
}
