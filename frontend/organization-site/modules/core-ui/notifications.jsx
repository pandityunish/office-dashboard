'use client'

import React, { useState, useEffect } from 'react'
import { useNotifications } from '../hooks/useNotificationData'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

function formatTimestamp (timestamp) {
  const now = new Date()
  const sentTime = new Date(timestamp)
  const timeDiff = Math.floor((now - sentTime) / 1000)

  if (timeDiff < 60) {
    return `${timeDiff} sec ago`
  } else if (timeDiff < 3600) {
    const mins = Math.floor(timeDiff / 60)
    return `${mins} min ago`
  } else if (timeDiff < 86400) {
    const hours = Math.floor(timeDiff / 3600)
    return `${hours} hour ago`
  } else if (timeDiff < 604800) {
    const days = Math.floor(timeDiff / 86400)
    return `${days} day ago`
  } else {
    return sentTime.toLocaleString()
  }
}

const Notifications = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [notificationClicked, setNotificationClicked] = useState(false)
  const router = useRouter()

  const toggleDropdown = () => {
    setNotificationClicked(true)
    setShowDropdown(!showDropdown)
  }

  const {
    notificationData,
    isLoading,
    isError,
    refetch: refetchNotification
  } = useNotifications()

  const handleNotificationClick = id => {
    setShowDropdown(false)
    router.push(`/notifications/${id}`)
  }

  useEffect(() => {
    refetchNotification()
  }, [showDropdown])

  return (
    <div className='absolute w-full '>
      <section className='flex items-center justify-end py-1 m-0.5'>
        <button
          onClick={toggleDropdown}
          className='inline-flex items-center font-medium text-center text-gray-500 m-text-sm hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400'
          type='button'
        >
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 14 20'
          >
            <path d='M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z' />
          </svg>
          <div className='relative flex'>
            <div
              className={`relative inline-flex w-3 h-3 ${
                notificationClicked ? 'bg-epassblue' : 'bg-red-500'
              } border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900`}
            ></div>
          </div>
        </button>
      </section>

      {showDropdown && (
        <div
          className='absolute z-20 w-[700px] max-w-md bg-white divide-y divide-gray-100 rounded-lg shadow right-0 dark:bg-gray-800 dark:divide-gray-700'
          aria-labelledby='dropdownNotificationButton'
        >
          <div className='block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white'>
            Notifications
          </div>
          <div className='divide-y divide-gray-100 cursor-pointer dark:divide-gray-700'>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error loading notifications.</div>}
            {notificationData &&
              notificationData.slice(0, 8).map(notification => (
                <section
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className='flex px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  <div className='flex-shrink-0 '>
                    <div className='absolute flex items-center justify-center w-5 h-5 -mt-0 -ml-3 bg-blue-600 border border-white rounded-full dark:border-gray-800'>
                      <svg
                        className='w-2 h-2 text-white'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 18 18'
                      >
                        <path d='M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z' />
                        <path d='M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z' />
                      </svg>
                    </div>
                  </div>
                  <div className='w-full pl-3'>
                    <div className='text-gray-500 text-sm mb-1.5 dark:text-gray-400'>
                      {notification.message}
                    </div>
                    <div className='text-xs text-blue-600 dark:text-blue-500'>
                      {formatTimestamp(notification.timestamp)}
                    </div>
                  </div>
                </section>
              ))}
          </div>
          <Link
            href='/notifications'
            onClick={() => setShowDropdown(false)}
            className='block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover-bg-gray-100 dark-bg-gray-800 dark-hover-bg-gray-700 dark:text-white'
          >
            <div className='inline-flex items-center'>
              <svg
                className='w-4 h-4 mr-2 text-gray-500 dark-text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 14'
              >
                <path d='M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z' />
              </svg>
              View all
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Notifications
