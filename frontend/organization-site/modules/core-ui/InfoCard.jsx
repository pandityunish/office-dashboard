'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function InfoCard ({ title = '', value = 0 }) {
  return (
    <motion.div
      whileHover={{ scale: 0.96 }}
      className='px-5 py-8 rounded-sm shadow bg-epassblue text-sky-50'
    >
      <h1 className='font-base text-md'>{title}</h1>
      <span>
        <h1 className='text-xl font-semibold'>{value}</h1>
      </span>
    </motion.div>
  )
}
