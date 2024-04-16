import React from 'react'

export default function DefaultButton({text}) {
  return (
    <div>
                <button
                  type='submit'
                  className='inline-flex items-center bg-gradient-to-r from-[#25AAE1]  to-[#0F75BC] justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                 {text}
                </button>
              </div>
  )
}
