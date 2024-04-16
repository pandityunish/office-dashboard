import toast from 'react-hot-toast'
import Image from 'next/image'

function toastify (message = 'Welcome to epass') {
  return toast.custom(t => (
    <div
      key={t.id}
      className='flex w-full max-w-md rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 bg-epassblue'
    >
      <div className='flex-1 w-0 p-4'>
        <div className='flex items-start'>
          <div className='flex-shrink-0 pt-0.5 hidden'>
            <Image src='' alt='User' className='w-10 h-10 rounded-full' />
          </div>
          <div className='flex-1 ml-3'>
            <p className='mt-1 text-sm text-gray-50'>{message}</p>
          </div>
        </div>
      </div>
      <div className='flex border-l border-gray-200'>
        <button
          onClick={() => toast.dismiss(t.id)}
          className='w-full p-4 text-sm font-medium text-indigo-600 border border-transparent rounded-none rounded-r-lg hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        >
          Close
        </button>
      </div>
    </div>
  ))
}

export default toastify
