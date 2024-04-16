"use client"
import { FiArrowUpRight } from 'react-icons/fi'
import { useRouter } from 'next/navigation';

export default function Jobdetails() {
  const router=useRouter();
  return (
    <div className='pt-20 pb-40 lg:w-full w-[1200px] font-inter flex flex-col  bg-bgcolor'>
    <p className='font-bold text-[65px] font-inter text-center leading-[70px]'><span className='text-primaryblue'>Junior  </span>UI/UX Designer</p>
    <div className='flex gap-3 mt-3 justify-center' >
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Full Time
</div>
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Design
</div>
<div className='py-1 px-2 bg-[#F1FBFF] rounded-2xl flex items-center justify-center text-sm font-inter font-medium '>
Remote
</div>
</div>
<div className='flex justify-center'>
<button
onClick={()=>{
  router.push("/apply-job")
}}
                  type='submit'
                  className='flex gap-2 w-[160px] h-[50px] mt-10  items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center   py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                Apply Now
                 <FiArrowUpRight className='text-xl'/>
                </button>
</div>
                <div className='px-16 flex flex-col justify-start items-start mt-20'>
<p className='font-bold text-3xl '>Job brief</p>
<p className='font-normal text-lg mt-7'>We are looking for a UI/UX Designer to turn our software into easy-to-use products for our clients.
<br />
UI/UX Designer responsibilities include gathering user requirements, designing graphic elements and building navigation components. To be successful in this role, you should have experience with design software and wireframe tools. If you also have a portfolio of professional design projects that includes work with web/mobile applications, we’d like to meet you.
<br />
Ultimately, you’ll create both functional and appealing features that address our clients’ needs and help us grow our customer base.</p>
<div className=''>
<p className='font-bold text-3xl mt-10'>Responsibilities</p>
<ul className='list-disc px-5 mt-4 font-normal text-lg'>
    <li>Gather and evaluate user requirements in collaboration with product managers and engineers</li>
    <li>Illustrate design ideas using storyboards, process flows and sitemaps</li>
    <li>Design graphic user interface elements, like menus, tabs and widgets</li>
    <li>Build page navigation buttons and search fields</li>
    <li>Develop UI mockups and prototypes that clearly illustrate how sites function and look like</li>
    <li>Create original graphic designs (e.g. images, sketches and tables)</li>
    <li>Prepare and present rough drafts to internal teams and key stakeholders</li>
    <li>Identify and troubleshoot UX problems (e.g. responsiveness)</li>
    <li>Conduct layout adjustments based on user feedback</li>
    <li>Adhere to style standards on fonts, colors and images</li>
</ul>
</div>
<div className=''>
<p className='font-bold text-3xl mt-10'>Requirements and skills</p>
<ul className='list-disc px-5 mt-4 font-normal text-lg'>
    <li>Gather and evaluate user requirements in collaboration with product managers and engineers</li>
    <li>Illustrate design ideas using storyboards, process flows and sitemaps</li>
    <li>Design graphic user interface elements, like menus, tabs and widgets</li>
    <li>Build page navigation buttons and search fields</li>
    <li>Develop UI mockups and prototypes that clearly illustrate how sites function and look like</li>
    <li>Create original graphic designs (e.g. images, sketches and tables)</li>
    <li>Prepare and present rough drafts to internal teams and key stakeholders</li>
    <li>Identify and troubleshoot UX problems (e.g. responsiveness)</li>
    <li>Conduct layout adjustments based on user feedback</li>
    <li>Adhere to style standards on fonts, colors and images</li>
</ul>
</div>
<button
                  type='submit'
                  className='flex gap-2 w-[160px] h-[50px] mt-10  items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center   py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                Apply Now
                 <FiArrowUpRight className='text-xl'/>
                </button>
                </div>
    </div>
  )
}
