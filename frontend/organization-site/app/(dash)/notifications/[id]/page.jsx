'use client'
import LoadingComponent from '@/modules/core-ui/LoadingComponent'
import { useNotifications } from '@/modules/hooks/useNotificationData'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const NotificationDetail = ({ params }) => {
  const [notificationDetails, setNotificationDetails] = useState({})
  const router = useRouter()

  const { notificationData, isLoading } = useNotifications()

  useEffect(() => {
    if (!isLoading) {
      const selectedNotification = notificationData.find(
        notification => notification.id == params.id
      )
      if (selectedNotification) {
        setNotificationDetails({ ...selectedNotification })
      }
    }
  }, [isLoading, notificationData, params])

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <div className='p-4 mx-auto mt-8 bg-white rounded-lg shadow-lg max-w-7xl'>
      <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
        Notification Details
      </h2>
      <div className='mb-4 text-xs'>

        <p className='text-gray-600 '>
          <span className='text-sm font-semibold'>Sender:</span>{' '}
          {notificationDetails.name}
        </p>
        <p className='text-gray-600 '>
          <span className='text-sm font-semibold'>Message:</span>{' '}
          {notificationDetails.message}
        </p>
        <p className='text-gray-600 '>
          <span className='text-sm font-semibold'>Timestamp:</span>{' '}
          {new Date(notificationDetails.timestamp).toLocaleString()}
        </p>
      </div>
      <button
        onClick={() => router.back()}
        className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
      >
        Go Back
      </button>
    </div>
  )
}

export default NotificationDetail
