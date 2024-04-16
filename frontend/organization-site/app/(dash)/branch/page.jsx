'use client'
import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axiosInstance from '@/modules/axios'
import { useUserData } from '@/modules/hooks/useUserData'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'country', headerName: 'Country', width: 150 },
  { field: 'state', headerName: 'State', width: 150 },
  { field: 'district', headerName: 'District', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: () => <button>Edit</button>
  }
]

const BranchesPage = () => {
  const { data: user } = useUserData()
  const {
    data: branches,
    isLoading,
    isError
  } = useQuery(['branches'], fetchBranches)

  return (
    <div className='mx-auto mt-5 '>
      <h1 className='mb-4 text-2xl font-semibold'>Branches</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading branches</p>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <section className='flex items-center justify-end my-2'>
            <Link href='/branch/create'>
              <button className='px-3 py-2 mt-4 font-bold text-white rounded-sm bg-epassblue hover:bg-green-700'>
                Create Branch
              </button>
            </Link>
          </section>
          <DataGrid
            rows={branches}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
          />
        </div>
      )}
    </div>
  )
}

export default BranchesPage

const fetchBranches = async () => {
  const response = await axiosInstance.get(`/organization/branches/me`, {
    headers: {
      Authorization: `Bearer ${localStorage?.getItem('access')}`
    }
  })
  return response.data
}
