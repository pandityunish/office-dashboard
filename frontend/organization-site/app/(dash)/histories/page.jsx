'use client'
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useUserData } from '@/modules/hooks/useUserData'
import axiosInstance from '@/modules/axios'
import { toast } from 'react-toastify'
import { CSVLink } from 'react-csv'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'organization', headerName: 'Organization', width: 150 },
  { field: 'visitor', headerName: 'Visitor', width: 150 },
  { field: 'full_name', headerName: 'Full Name', width: 200 },
  { field: 'mobile_number', headerName: 'Mobile Number', width: 150 },
  { field: 'purpose', headerName: 'Purpose', width: 200 },
  {
    field: 'have_vehicle',
    headerName: 'Have Vehicle',
    width: 150,
    valueGetter: params => {
      return params.value ? 'Yes' : 'No'
    }
  },
  { field: 'vehicle_number', headerName: 'Vehicle Number', width: 200 },
  {
    field: 'is_with_team',
    headerName: 'Is with Team',
    width: 150,
    valueGetter: params => {
      return params.value ? 'Yes' : 'No'
    }
  },
  { field: 'number_of_team', headerName: 'Number of Team', width: 180 },
  { field: 'visiting_from', headerName: 'Visiting From', width: 200 },
  {
    field: 'visited_at',
    headerName: 'Visited At',
    width: 250,
    valueGetter: params => {
      const visitedAt = new Date(params.value)
      return visitedAt.toLocaleString()
    }
  },
  {
    field: 'departed_at',
    headerName: 'Departed At',
    width: 250,
    valueGetter: params => {
      if (params.value) {
        const departedAt = new Date(params.value)
        return departedAt.toLocaleString()
      }
      return 'N/A' // Display "N/A" if "departed_at" is null
    }
  },
  {
    field: 'is_approved',
    headerName: 'Is Approved',
    width: 150,
    editable: true,
    valueGetter: params => {
      return params.value !== undefined ? (params.value ? 'Yes' : 'No') : null
    },
    renderCell: params => (
      <div style={{ width: '100%' }}>
        <select
          value={params.value}
          onChange={e => {
            const newValue = e.target.value === 'Yes'
            params.api?.setEditCellValue({
              id: params.id,
              field: params.field,
              props: params.props,
              value: newValue
            })
          }}
        >
          <option value='Yes'>Yes</option>
          <option value='No'>No</option>
        </select>
      </div>
    )
  }
]

function Page () {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()

  const [visitHistoryData, setVisitHistoryData] = useState([])
  const [isVisitHistoryLoading, setIsVisitHistoryLoading] = useState(false)
  const [exportData, setExportData] = useState([])

  useEffect(() => {
    if (user !== undefined) {
      setIsVisitHistoryLoading(true)
      axiosInstance
        .get(`/organization/${user.id}/visit-history`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        })
        .then(res => {
          setVisitHistoryData(res.data)
          setExportData(res.data)
        })
        .catch(error => {
          console.error('Error fetching visit history data:', error)
          toast.error(
            error.response?.data?.message ||
              'Failed to fetch visit history data'
          )
        })
        .finally(() => {
          setIsVisitHistoryLoading(false)
        })
    }
  }, [user])

  const apiRef = React.useRef()

  const handleApprovalChange = (id, newValue) => {
    axiosInstance
      .put(`/organization/approve-visitor/`, {
        is_approved: newValue,
        visitor: id
      })
      .then(response => {
        if (response.status === 200) {
          apiRef.current.setEditCellValue({
            id: id,
            field: 'is_approved',
            props: {},
            value: newValue
          })

          toast.success(`Visit ${newValue ? 'approved' : 'disapproved'}`)
        }
      })
      .catch(error => {
        console.error('Error updating approval status:', error)
        toast.error('Failed to update approval status')
      })
  }

  if (isUserLoading || isVisitHistoryLoading) {
    return <div>Loading...</div>
  }

  if (isUserError) {
    return <div>Error loading user data.</div>
  }

  return (
    <div style={{ height: 800 }} className='max-w-full'>
      <section className='flex items-center justify-between'>
        <h1 className='py-3 font-semibold'>Visit Histories</h1>
        <CSVLink
          data={exportData}
          filename={`visit_history-${Date.now()}.csv`}
          target='_blank'
          className='px-2 py-2 text-xs font-medium text-white rounded-sm shadow bg-epassblue'
        >
          Export History
        </CSVLink>
      </section>
      <DataGrid
        rows={visitHistoryData}
        columns={columns}
        pageSize={5}
        checkboxSelection
        isCellEditable={params => params.field === 'is_approved'}
        onEditCellChangeCommitted={params => {
          const id = params.id
          const field = params.field
          const newValue = params.props.value
          handleApprovalChange(id, newValue)
        }}
        apiRef={apiRef}
      />
    </div>
  )
}

export default Page
