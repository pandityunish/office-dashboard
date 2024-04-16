'use client'

import Image from 'next/image';
import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdOutlineWeb } from "react-icons/md";
import { SiViber } from "react-icons/si";
import { RiWhatsappFill } from "react-icons/ri";
import Link from 'next/link';

const footerLinks = [
    {
        category: 'Company',
        links: [
            { text: 'About', href: '#' },
            { text: 'Features', href: '#' },
            { text: 'Works', href: '#' },
            { text: 'Career', href: '#' },
        ],
    },
    {
        category: 'Help',
        links: [
            { text: 'Customer Support', href: '#' },
            { text: 'Delivery Details', href: '#' },
            { text: 'Terms & Conditions', href: '#' },
            { text: 'Privacy Policy', href: '#' },
        ],
    },
    {
        category: 'Resources',
        links: [
            { text: 'Free eBooks', href: '#' },
            { text: 'How to - Blog', href: '#' },
            { text: 'YouTube Playlist', href: '#' },
        ],
    },
    {
        category: 'Extra Links',
        links: [
            { text: 'Customer Support', href: '#' },
            { text: 'Delivery Details', href: '#' },
            { text: 'Terms & Conditions', href: '#' },
            { text: 'Privacy Policy', href: '#' },
        ],
    },
];

export default function MainFooter() {
    return (
        <main className="lg:w-full w-[1200px] bg-[#25AAE1] font-inter">
            <section className="  pt-24 w-full px-16">
                <div className="mx-auto  flex justify-between ">
                    <div className='flex flex-col w-[280px]'>
<Image src="/footerlogo.png" width={100} height={100}/>
<p className='pt-10 font-extralight text-base text-white'>ePass, as a digital visitor's check-in and get-pass system, represents a modern and efficient solution for managing and monitoring visitor access to various facilities.</p>
<div className='flex gap-3 items-center mt-8'>
<div className='w-[30px] h-[30px] cursor-pointer rounded-full bg-white flex items-center justify-center'>
<FaFacebookF className='text-[#25AAE1]'/>
</div>
<div className='w-[30px] h-[30px] cursor-pointer rounded-full bg-white flex items-center justify-center'>
<FaLinkedinIn className='text-[#25AAE1]'/>
</div>
<div className='w-[30px] h-[30px] cursor-pointer rounded-full bg-white flex items-center justify-center'>
<FaYoutube className='text-[#25AAE1]'/>
</div>
</div>
                    </div>
                    <div className='flex flex-col text-white'>
<p className='font-bold text-lg '>Quick Links</p>
<div className='flex flex-col font-normal text-base font-inter text-[#F4F4F4] gap-3 mt-10'>
<Link   href={{
          pathname: "/about-us",
        
        }} className='cursor-pointer'>About</Link>
<p className='cursor-pointer'>Features</p>
<p className='cursor-pointer'>Why Us</p>
<p className='cursor-pointer'>How it Works</p>
<p className='cursor-pointer'>Blogs</p>
<Link   href={{
          pathname: "/job-board",
        
        }} className='cursor-pointer'>Careers</Link>
<p>Contact</p>
</div>
                    </div>
                    <div className='flex flex-col text-white'>
<p className='font-bold text-lg '>Legal</p>
<div className='flex flex-col font-normal text-base font-inter text-[#F4F4F4] gap-3 mt-10'>
<Link   href={{
          pathname: "/page",
          query: {
            id: "1",
            name:"Privacy Policy"
          }
        }} className='cursor-pointer'>Privacy Policy</Link>
<Link   href={{
          pathname: "/page",
          query: {
            id: "1",
            name:"Terms & Conditions"
          }
        }} className='cursor-pointer'>Terms & Conditions</Link>
<Link   href={{
          pathname: "/page",
          query: {
            id: "1",
            name:"FAQs"
          }
        }} className='cursor-pointer'>FAQs</Link>
<Link   href={{
          pathname: "/page",
          query: {
            id: "1",
            name:"Security"
          }
        }} className='cursor-pointer'>Security</Link>

</div>
                    </div>
                    <div className='flex flex-col text-white'>
<p className='font-bold text-lg '>Contact</p>
<div className='flex flex-col font-normal text-base font-inter text-[#F4F4F4] gap-3 mt-10'>
<div className='flex gap-2 items-center'>
<FaLocationDot className='text-xl'/>
<p>Putalisadak, Kathmandu, Nepal</p>
</div>
<div className='flex gap-2 items-center'>
<MdEmail className='text-xl'/>
<p>contact@epass.com.np</p>
</div>
<div className='flex gap-2 items-center'>
<MdOutlineWeb className='text-xl'/>
<p>https://epass.com.np</p>
</div>
<div className='flex gap-2 items-center'>
<SiViber className='text-xl'/>
<p>9800000000</p>
</div>
<div className='flex gap-2 items-center'>
<RiWhatsappFill  className='text-xl'/>
<p>9800000000</p>
</div>


</div>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-0">
                        {footerLinks.map((category, index) => (
                            <div key={index}>
                                <p className="text-base font-medium text-gray-900">{category.category}</p>
                                <ul className="mt-5 space-y-3">
                                    {category.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a
                                                href={link.href}
                                                title={link.text}
                                                className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                                            >
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div> */}
                    {/* <hr className="mt-16 mb-10 border-gray-800" /> */}
                    {/* <div className="flex flex-wrap items-center justify-between">
                        <img
                            className="h-8 auto md:order-1"
                            src="/logo.svg"
                            alt=""
                        />
                        <ul className="flex items-center space-x-3 md:order-3">
                           
                            {[
                                { icon: 'facebook', title: 'Facebook' },
                                { icon: 'twitter', title: 'Twitter' },
                                { icon: 'instagram', title: 'Instagram' },
                                { icon: 'linkedin', title: 'LinkedIn' },
                            ].map((social, socialIndex) => (
                                <li key={socialIndex}>
                                    <a
                                        href="#"
                                        title={social.title}
                                        className="flex items-center justify-center text-white transition-all duration-200 bg-transparent border border-gray-700 rounded-full w-7 h-7 focus:bg-blue-600 hover:bg-blue-600 hover:border-blue-600 focus:border-blue-600"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                        </svg>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className="w-full mt-8 text-sm text-center text-gray-100 md:mt-0 md:w-auto md:order-2">
                            © Copyright 2023, All Rights Reserved by Epass System
                        </p>
                    </div> */}
                </div>
                <p className="w-full mt-8 font-normal py-5  text-xs text-center font-inter text-white ">
             Copyright © 2024 ePass. All Rights Reserved.     
                        </p>
            </section>
        </main>
    );
}
