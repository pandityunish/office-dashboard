'use client'
import axiosInstance from '@/modules/axios'
import { useUserData } from '@/modules/hooks/useUserData'
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'full_name', headerName: 'Full Name', width: 200 },
  { field: 'mobile_number', headerName: 'Mobile Number', width: 150 }
]

function Page () {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
  const [visitHistoryData, setVisitHistoryData] = useState([])
  const [rows, setRows] = useState([])
  const [uniqueVisitors, setUniqueVisitors] = useState([])
  const [isVisitHistoryLoading, setIsVisitHistoryLoading] = useState(false)
  const [visitHistoryError, setVisitHistoryError] = useState(null)

  useEffect(() => {
    if (user !== undefined) {
      setIsVisitHistoryLoading(true)
      setVisitHistoryError(null)

      axiosInstance
        .get(`/organization/${user.id}/visit-history`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        })
        .then(res => {
          setIsVisitHistoryLoading(false)
          setVisitHistoryData(res.data)
          const uniqueVisitorIds = new Set()

          const uniqueVisitorsData = res.data.filter(entry => {
            const visitorId = entry.visitor

            if (!uniqueVisitorIds.has(visitorId)) {
              uniqueVisitorIds.add(visitorId)
              return true
            }
            return false
          })

          setUniqueVisitors(uniqueVisitorsData)
        })
        .catch(error => {
          setIsVisitHistoryLoading(false)
          setVisitHistoryError(
            error.response?.data?.message ||
              'Failed to fetch visit history data'
          )
        })
    }
  }, [user])

  if (isUserLoading) {
    return <div>Loading...</div>
  }

  if (isUserError) {
    return <div>Error loading user data.</div>
  }

  if (isVisitHistoryLoading) {
    return <div>Loading visit history data...</div>
  }

  if (visitHistoryError) {
    return <div>Error loading visit history data: {visitHistoryError}</div>
  }

  return (
    <div>
      <section className='flex items-center justify-between'>
        <h1 className='py-3 font-semibold'>Visitors List</h1>
        <button className='px-2 py-2 text-xs font-medium text-white rounded-sm shadow bg-epassblue'>
          Export Visitors
        </button>
      </section>
      <DataGrid
        rows={uniqueVisitors}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  )
}

export default Page
