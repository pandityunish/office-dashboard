'use client'
import { BiLogIn } from 'react-icons/bi'
import { SiGnuprivacyguard } from 'react-icons/si'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Head from 'next/head'

import { redirect } from 'next/navigation'

const faqData = [
  {
    question: 'What is the QR Entry Management System?',
    answer:
      'The QR Entry Management System is a digital solution that allows organizations to manage visitor entries using QR codes. Visitors can scan the QR code at the entry point to gain access, and organizations can approve or deny entry requests in real-time.'
  },
  {
    question: 'How do I use the QR code for entry?',
    answer:
      'Using the QR code for entry is simple. When you arrive at the organization, open your smartphones camera app and scan the QR code displayed at the entry point. You will receive access once your request is approved.'
  },
  {
    question: 'Is registration required?',
    answer:
      'Registration is not always required, but it can help streamline the entry process. New guests can quickly register by providing their information, making the entry process faster and more secure.'
  },
  {
    question: 'How can I contact support?',
    answer:
      'If you need assistance or have questions, you can contact our support team by emailing us at support@example.com or calling +1 (123) 456-7890. We are here to help!'
  }
]

const LandingPage = () => {
  // const router = useRouter()

  // useEffect(() => {
  //   const access = localStorage.getItem('access')

  //   if (access) {
  //     router.push('/dash')
  //   } else {
  //     router.push('/login')
  //   }
  // }, [router])
  return redirect('/login');
  // (
    
    // <div className='w-full'>
    //   <div className='py-6 text-center text-white bg-epassblue'>
    //     <nav className='container flex items-center justify-between mx-auto'>
    //       <h1 className='text-4xl font-bold'>Epass</h1>
    //       <ul className='flex items-center justify-end space-x-6 font-semibold'>
    //         <li>
    //           <a href='#features' className='text-white'>
    //             Features
    //           </a>
    //         </li>
    //         <li>
    //           <a href='#how-it-works' className='text-white'>
    //             How It Works
    //           </a>
    //         </li>
    //         <li>
    //           <a href='#contact' className='text-white'>
    //             Contact
    //           </a>
    //         </li>
    //         <li>
    //           { 
    //             typeof window !== 'undefined' && window.localStorage.getItem('access')  ? (
    //             <Link href='/login' className='flex px-2 items-center text-white'>
    //               <BiLogIn />
    //               <span className='px-2'>    Login Now </span>
    //             </Link>
    //           ) : (
    //             <Link href='/register' className='flex items-center text-white'>
    //               <SiGnuprivacyguard />
    //               <span className='px-2'>Register Organization</span>
    //             </Link>
    //           )}
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    //   <motion.section
    //     initial={{ opacity: 0, y: 50 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     exit={{ opacity: 0, y: 50 }}
    //     transition={{ duration: 1 }}
    //     className='py-24 text-white hero bg-gradient-to-b from-epassblue to-blue-400'
    //   >
    //     <div className='container flex items-center justify-between mx-auto'>
    //       <div className='w-1/2'>
    //         <h2 className='mb-4 text-5xl font-extrabold'>
    //           Welcome to Epass Entry Management System
    //         </h2>
    //         <p className='mb-8 text-lg text-gray-100'>
    //           Simplify entry management with the power of QR codes.
    //         </p>
    //         <Link
    //           href='/login'
    //           className='px-8 py-4 text-lg font-semibold transition duration-300 ease-in-out bg-white rounded-full text-epassblue hover:bg-epassblue hover:text-white'
    //         >
    //           Get Started
    //         </Link>
    //       </div>
    //       <div className='w-1/2'>
    //         <Image
    //           src='/landing-svg.svg'
    //           alt='QR Code'
    //           className='w-full'
    //           height={600}
    //           width={600}
    //         />
    //       </div>
    //     </div>
    //   </motion.section>
    //   <section id='features' className='py-24'>
    //     <div className='container mx-auto text-center'>
    //       <h2 className='mb-8 text-3xl font-semibold'>Features</h2>
    //       <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
    //         <FeatureCard
    //           title='QR Code Check-in'
    //           description='Effortlessly check in using QR codes for quick access.'
    //         />
    //         <FeatureCard
    //           title='Guest Registration'
    //           description='Register guests with ease and capture their information securely.'
    //         />
    //         <FeatureCard
    //           title='Real-time Reporting'
    //           description='Get instant insights with real-time reporting and analytics.'
    //         />
    //       </div>
    //     </div>
    //   </section>
    //   <section id='how-it-works' className='py-48 bg-gray-100'>
    //     <div className='container mx-auto text-center'>
    //       <h2 className='mb-8 text-4xl font-semibold text-epassblue'>
    //         How It Works
    //       </h2>
    //       <div className='grid grid-cols-1 gap-12 sm:grid-cols-2'>
    //         <div className='p-8 bg-white rounded-lg shadow-md h-28'>
    //           <h3 className='mb-4 text-2xl font-semibold text-epassblue'>
    //             Step 1: Scan QR Code
    //           </h3>
    //           <p className='text-gray-600'>
    //             Visitors simply scan the QR code using their smartphones at the
    //             entry point.
    //           </p>
    //         </div>
    //         <div className='p-8 bg-white rounded-lg shadow-md h-28'>
    //           <h3 className='mb-4 text-2xl font-semibold text-epassblue'>
    //             Step 2: Registration
    //           </h3>
    //           <p className='text-gray-600'>
    //             New guests can quickly register by providing their information.
    //           </p>
    //         </div>
    //         <div className='p-8 bg-white rounded-lg shadow-md h-28'>
    //           <h3 className='mb-4 text-2xl font-semibold text-epassblue'>
    //             Step 3: Access Approval
    //           </h3>
    //           <p className='text-gray-600'>
    //             Organization administrators can approve or deny access requests
    //             in real-time.
    //           </p>
    //         </div>
    //         <div className='p-8 bg-white rounded-lg shadow-md h-28'>
    //           <h3 className='mb-4 text-2xl font-semibold text-epassblue'>
    //             Step 4: Entry Confirmation
    //           </h3>
    //           <p className='text-gray-600'>
    //             Once approved, visitors receive confirmation and gain entry to
    //             the organization.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <section
    //     id='contact'
    //     className='py-48 text-white bg-gradient-to-b from-epassblue to-blue-400'
    //   >
    //     <div className='container mx-auto text-center'>
    //       <h2 className='mb-8 text-4xl font-semibold'>Contact Us</h2>
    //       <p className='mb-12 text-lg text-gray-200'>
    //         We&apos;d love to hear from you. Please don&apos;t hesitate to get
    //         in touch with us if you have any questions or need assistance.
    //       </p>
    //       <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
    //         <div className='p-6 bg-blue-500 rounded-lg'>
    //           <h3 className='mb-4 text-2xl font-semibold'>
    //             Contact Information
    //           </h3>
    //           <p className='mb-2 text-gray-200'>
    //             Email:
    //             <a
    //               href='mailto:contact@example.com'
    //               className='underline hover:text-epassblue'
    //             >
    //               contact@example.com
    //             </a>
    //           </p>
    //           <p className='mb-2 text-gray-200'>
    //             Phone:
    //             <a
    //               href='tel:+123456789'
    //               className='underline hover:text-epassblue'
    //             >
    //               +1 (234) 567-89
    //             </a>
    //           </p>
    //         </div>
    //         <div className='p-6 bg-blue-500 rounded-lg'>
    //           <h3 className='mb-4 text-2xl font-semibold'>Send Us a Message</h3>
    //           <form>
    //             <div className='mb-4'>
    //               <input
    //                 type='text'
    //                 placeholder='Your Name'
    //                 className='w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-epassblue focus:border-epassblue'
    //               />
    //             </div>
    //             <div className='mb-4'>
    //               <input
    //                 type='email'
    //                 placeholder='Your Email'
    //                 className='w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-epassblue focus:border-epassblue'
    //               />
    //             </div>
    //             <div className='mb-6'>
    //               <textarea
    //                 placeholder='Your Message'
    //                 rows='4'
    //                 className='w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-epassblue focus:border-epassblue'
    //               ></textarea>
    //             </div>
    //             <button
    //               type='submit'
    //               className='w-full px-6 py-3 text-white rounded-full bg-epassblue hover:bg-blue-500'
    //             >
    //               Send Message
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   <section className='container py-48 mx-auto'>
    //     <h1 className='mb-8 text-4xl font-semibold text-center'>
    //       Frequently Asked Questions
    //     </h1>
    //     <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
    //       {faqData.map((faq, index) => (
    //         <div key={index} className='p-6 bg-white rounded-lg shadow-md'>
    //           <h3 className='mb-2 text-xl font-semibold'>{faq.question}</h3>
    //           <p className='text-gray-600'>{faq.answer}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </section>

    //   <section className='py-10 bg-epassblue sm:pt-16 lg:pt-24'>
    //     <div className='px-4 mx-auto sm:px-6 lg:px-8 max-w-[100rem]'>
    //       <div className='grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-12'>
    //         <div>
    //           <span className='text-xl font-semibold text-white'>Epass</span>
    //           <ul className='mt-8 space-y-4'>
    //             <li>
    //               <a
    //                 href='#'
    //                 title='about'
    //                 className='text-blue-200 transition-all duration-200 hover:text-white focus:text-white'
    //               >
    //                 About
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <p className='text-lg font-semibold text-white'>Help</p>
    //           <ul className='mt-8 space-y-4'>
    //             <li>
    //               <a
    //                 href='#'
    //                 title='customer-support'
    //                 className='text-blue-200 transition-all duration-200 hover:text-white focus:text-white'
    //               >
    //                 Customer Support
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <p className='text-lg font-semibold text-white'>Resources</p>
    //           <ul className='mt-8 space-y-4'>
    //             <li>
    //               <a
    //                 href='#'
    //                 title='yoututbe'
    //                 className='text-blue-200 transition-all duration-200 hover:text-white focus:text-white'
    //               >
    //                 YouTube Playlist
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <p className='text-lg font-semibold text-white'>Extra Links</p>
    //           <ul className='mt-8 space-y-4'>
    //             <li>
    //               <a
    //                 href='#'
    //                 title='privacy'
    //                 className='text-blue-200 transition-all duration-200 hover:text-white focus:text-white'
    //               >
    //                 Privacy Policy
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //       <div className='mt-20 md:mt-28 2xl:mt-32'>
    //         <div className='lg:flex lg:items-center lg:justify-between'>
    //           <div className='sm:flex sm:items-center sm:justify-start sm:space-x-8'>
    //             <ul className='flex items-center justify-start space-x-8'>
    //               <li>
    //                 <a
    //                   href='#'
    //                   title=''
    //                   className='block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80'
    //                 >
    //                   {/* <svg
    //                     className='w-6 h-6'
    //                     xmlns='http://www.w3.org/2000/svg'
    //                     viewBox='0 0 24 24'
    //                     fill='currentColor'
    //                   >
    //                     <path d='M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z' />
    //                   </svg> */}
    //                   <FaTwitter/>
    //                 </a>
    //               </li>
    //               <li>
    //                 <a
    //                   href='#'
    //                   title=''
    //                   className='block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80'
    //                 >
    //                   {/* <svg
    //                     className='w-6 h-6'
    //                     xmlns='http://www.w3.org/2000/svg'
    //                     viewBox='0 0 24 24'
    //                     fill='currentColor'
    //                   >
    //                     <path d='M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z' />
    //                   </svg> */}
    //                   <FaFacebookF/>
    //                 </a>
    //               </li>
    //               <li>
    //                 <a
    //                   href='#'
    //                   title=''
    //                   className='block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80'
    //                 >
    //                   {/* <svg
    //                     className='w-6 h-6'
    //                     xmlns='http://www.w3.org/2000/svg'
    //                     viewBox='0 0 24 24'
    //                     fill='currentColor'
    //                   >
    //                     <path d='M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z' />
    //                     <circle cx='16.806' cy='7.207' r='1.078' />
    //                     <path d='M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z' />
    //                   </svg> */}
    //                   <FaYoutube/>
    //                 </a>
    //               </li>
    //               <li>
    //                 <a
    //                   href='#'
    //                   title=''
    //                   className='block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80'
    //                 >
    //                   <FaInstagram/>
    //                   {/* <svg
    //                     className='w-6 h-6'
    //                     xmlns='http://www.w3.org/2000/svg'
    //                     viewBox='0 0 24 24'
    //                     fill='currentColor'
    //                   >
    //                     <path
    //                       fillRule='evenodd'
    //                       clipRule='evenodd'
    //                       d='M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z'
    //                     />
    //                   </svg> */}
    //                 </a>
    //               </li>
    //             </ul>
    //             <ul className='flex flex-wrap items-center justify-start mt-5 gap-x-8 sm:mt-0 gap-y-3'>
    //               <li>
    //                 <a
    //                   href='#'
    //                   title=''
    //                   className='text-sm text-blue-200 transition-all duration-200 hover:text-white focus:text-white'
    //                 >
    //                   Privacy Policy
    //                 </a>
    //               </li>
    //               <li>
    //                 <a
    //                   href='#'
    //                   title=''
    //                   className='text-sm text-blue-200 transition-all duration-200 hover:text-white focus:text-white'
    //                 >
    //                   Terms &amp; Conditions
    //                 </a>
    //               </li>
    //               <li>
    //                 <a
    //                   href='#'
    //                   title=''
    //                   className='text-sm text-blue-200 transition-all duration-200 hover:text-white focus:text-white'
    //                 >
    //                   Support
    //                 </a>
    //               </li>
    //             </ul>
    //           </div>
    //           <p className='mt-6 text-sm text-blue-200 lg:mt-0'>
    //             © Copyright 2023, All Rights Reserved by Epass
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
  // )
}

const FeatureCard = ({ title, description }) => {
  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <h3 className='mb-2 text-xl font-semibold'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  )
}

export default LandingPage
