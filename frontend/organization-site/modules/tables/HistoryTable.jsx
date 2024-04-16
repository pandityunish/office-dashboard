'use client'
import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { CSVLink } from 'react-csv'
import { useState } from 'react'

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 100, flex: 1 },
  { field: 'organization', headerName: 'Organization', minWidth: 150, flex: 1 },
  { field: 'visitor', headerName: 'Visitor', minWidth: 150, flex: 1 },
  { field: 'full_name', headerName: 'Full Name', minWidth: 200, flex: 1 },
  {
    field: 'mobile_number',
    headerName: 'Mobile Number',
    minWidth: 150,
    flex: 1
  },
  { field: 'purpose', headerName: 'Purpose', minWidth: 200, flex: 1 },
  {
    field: 'have_vehicle',
    headerName: 'Have Vehicle',
    minWidth: 150,
    valueGetter: params => {
      return params.value ? 'Yes' : 'No'
    },
    flex: 1
  },
  {
    field: 'vehicle_number',
    headerName: 'Vehicle Number',
    minWidth: 200,
    flex: 1
  },
  {
    field: 'is_with_team',
    headerName: 'Is with Team',
    minWidth: 150,
    valueGetter: params => {
      return params.value ? 'Yes' : 'No'
    },
    flex: 1
  },
  {
    field: 'number_of_team',
    headerName: 'Number of Team',
    minWidth: 180,
    flex: 1
  },
  {
    field: 'visiting_from',
    headerName: 'Visiting From',
    minWidth: 200,
    flex: 1
  },
  {
    field: 'visited_at',
    headerName: 'Visited At',
    minWidth: 250,
    flex: 1,
    valueGetter: params => {
      const visitedAt = new Date(params.value)
      return visitedAt.toLocaleString()
    }
  },
  {
    field: 'departed_at',
    headerName: 'Departed At',
    minWidth: 250,
    valueGetter: params => {
      if (params.value) {
        const departedAt = new Date(params.value)
        return departedAt.toLocaleString()
      }
      return 'N/A' // Display "N/A" if "departed_at" is null
    },
    flex: 1
  },
  {
    field: 'is_approved',
    headerName: 'Is Approved',
    minWidth: 150,
    editable: true,
    flex: 1,
    valueGetter: params => {
      return params.value ? 'Yes' : 'No'
    },
    renderCell: params => (
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
    )
  }
]

export default function HistoryTable ({ data }) {
  const [exportData, setExportData] = useState([...data])

  const handleApprovalChange = (id, newValue) => {
    axios
      .post(`/api/approve-visitor/`, { is_approved: newValue, visitor: id })
      .then(response => {
        if (response.status === 200) {
          const updatedRows = rows.map(row =>
            row.id === id ? { ...row, is_approved: newValue } : row
          )
          setRows(updatedRows)

          toast.success(`Visit ${newValue ? 'approved' : 'disapproved'}`)
        }
      })
      .catch(error => {
        console.error('Error updating approval status:', error)
        toast.error('Failed to update approval status')
      })
  }

  return (
    <div style={{ height: 800, width: '100%' }} className='overflow-hidden '>
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
      getRowId={(row) => row.visitor}
        rows={data}
        columns={columns}
        pageSize={5}
        autoHeight={true}
        disableExtendRowFullWidth={true}
        checkboxSelection
        isCellEditable={params => params.field === 'is_approved'}
      />
    </div>
  )
}
