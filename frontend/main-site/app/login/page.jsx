import Image from 'next/image'
import Link from 'next/link'

export default function page () {
  return (
    <>
      <div className='grid py-2 mx-auto md:grid-cols-2 max-w-9xl'>
        <div className='flex items-center justify-start px-4 py-10 bg-white md:px-0 sm:py-16 lg:py-24 '>
          <div className='xl:w-full xl:max-w-sm 2xl:max-w-md '>
            <h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl'>
              Sign in to Epass
            </h2>
            <p className='mt-2 text-base text-gray-600'>
              Dont have an account?
              <Link
                href='/register'
                title
                className='font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700'
              >
                Create a free account{' '}
              </Link>
            </p>
            <form action='#' method='POST' className='mt-8'>
              <div className='space-y-5'>
                <div>
                  <label
                    htmlFor='email'
                    className='text-base font-medium text-gray-900'
                  >
                    {' '}
                    Email address{' '}
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='email'
                      name
                      id
                      placeholder='Enter email to get started'
                      className='block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                    />
                  </div>
                </div>
                <div>
                  <div className='flex items-center justify-between'>
                    <label
                      htmlFor='password'
                      className='text-base font-medium text-gray-900'
                    >
                      {' '}
                      Password{' '}
                    </label>
                    <a
                      href='#'
                      title
                      className='text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700'
                    >
                      {' '}
                      Forgot password?{' '}
                    </a>
                  </div>
                  <div className='mt-2.5'>
                    <input
                      type='password'
                      name
                      id
                      placeholder='Enter your password'
                      className='block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                    />
                  </div>
                </div>
                <div>
                  <button
                    type='submit'
                    className='inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                  >
                    Log in
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='flex items-center justify-end px-4 py-10 sm:py-16 lg:py-24 bg-sky-50 '>
          <div>
            <Image
              width='{500}'
              height='{500}'
              layout='responsive'
              objectfit='contain'
              objectposition='center'
              className='w-full mx-auto'
              src='/qr-scanning.svg'
              alt="some"
            />
            <div className='w-full mx-auto xl:max-w-xl'>
              <h3 className='text-2xl font-bold text-center text-black'>
                Get Your Own QR
              </h3>
              <p className='leading-relaxed text-center text-gray-500 mt-2.5'>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis.
              </p>
              <div className='flex items-center justify-center mt-10 space-x-3'>
                <div className='bg-orange-500 rounded-full w-20 h-1.5' />
                <div className='bg-gray-200 rounded-full w-12 h-1.5' />
                <div className='bg-gray-200 rounded-full w-12 h-1.5' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
