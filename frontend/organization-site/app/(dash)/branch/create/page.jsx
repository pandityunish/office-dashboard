'use client'

import { useForm } from 'react-hook-form'
import axiosInstance from '@/modules/axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const router = useRouter()

  const onSubmitForm = async data => {
    const res = await axiosInstance.post('/organization/branches/', data, {
      headers: {
        Authorization: `Bearer ${
          typeof window !== 'undefined' ? localStorage?.getItem('access') : ''
        }`
      }
    })
    console.log(res)
    if (res.status == 200 || res.status == 201) {
      toast.success('Branch Crated')
      router.back()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className='w-full py-6 mx-auto'>
      <h2 className='mb-4 text-2xl font-semibold'>Create a Branch</h2>
      <div className='mb-4'>
        <label htmlFor='name' className='block mb-2 text-lg'>
          Name:
        </label>
        <input
          type='text'
          id='name'
          name='name'
          {...register('name', { required: 'Name is required' })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${
            errors.name ? 'border-red-500' : ''
          }`}
        />
        {errors.name && (
          <p className='mt-1 text-red-500'>{errors.name.message}</p>
        )}
      </div>

      <section className='flex justify-between w-full space-x-4'>
        <div className='w-full mb-4'>
          <label htmlFor='country' className='block mb-2 text-lg'>
            Country:
          </label>
          <input
            type='text'
            id='country'
            name='country'
            {...register('country')}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        <div className='w-full mb-4'>
          <label htmlFor='state' className='block mb-2 text-lg'>
            State:
          </label>
          <input
            type='text'
            id='state'
            name='state'
            {...register('state')}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        <div className='w-full mb-4'>
          <label htmlFor='district' className='block mb-2 text-lg'>
            District:
          </label>
          <input
            type='text'
            id='district'
            name='district'
            {...register('district')}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
      </section>
      <section className='flex justify-between w-full space-x-4'>
        <div className='w-full mb-4'>
          <label htmlFor='municipality' className='block mb-2 text-lg'>
            Municipality:
          </label>
          <input
            type='text'
            id='municipality'
            name='municipality'
            {...register('municipality')}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        <div className='w-full mb-4'>
          <label htmlFor='city_village_area' className='block mb-2 text-lg'>
            City/Village/Area:
          </label>
          <input
            type='text'
            id='city_village_area'
            name='city_village_area'
            {...register('city_village_area')}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        <div className='w-full mb-4'>
          <label htmlFor='ward_no' className='block mb-2 text-lg'>
            Ward No:
          </label>
          <input
            type='text'
            id='ward_no'
            name='ward_no'
            {...register('ward_no')}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
      </section>
      <div className='mb-4'>
        <label htmlFor='employee_size' className='block mb-2 text-lg'>
          Employee Size:
        </label>
        <input
          type='text'
          id='employee_size'
          name='employee_size'
          {...register('employee_size')}
          className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
        />
      </div>
      <div className='mb-4'>
        <button
          type='submit'
          className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
        >
          Create Branch
        </button>
      </div>
    </form>
  )
}

export default Page
