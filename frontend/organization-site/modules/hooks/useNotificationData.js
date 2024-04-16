// import { useState } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import axiosInstance from '../axios'

// export const useNotifications = () => {
//   const [showDropdown, setShowDropdown] = useState(false)

//   const {
//     data: notificationData,
//     isLoading,
//     isError,
//     refetch
//   } = useQuery(['notificationData'], async () => {
//     const response = await axiosInstance('/notification/me', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('access')}`
//       }
//     })
//     return response.data
//   })

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown)
//   }

//   return {
//     showDropdown,
//     toggleDropdown,
//     notificationData: notificationData || [],
//     isLoading,
//     isError,
//     refetch
//   }
// }
