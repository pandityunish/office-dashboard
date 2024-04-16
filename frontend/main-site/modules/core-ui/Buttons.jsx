import React from 'react'

export default function DefaultButton({text}) {
  return (
    <div>
                <button
                  type='submit'
                  className='flex h-[45px] items-center bg-gradient-to-r from-[#0F75BC]  to-[#25AAE1] justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-lg bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                 {text}
                </button>
              </div>
  )
}
