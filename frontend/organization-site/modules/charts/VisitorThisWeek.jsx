'use client'
import React, { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export default function VisitorThisWeek ({ currentWeekData }) {
  const [data, setData] = useState([])

  function divideDataByWeekday (dat) {
    const result = {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: []
    }

    dat.forEach(item => {
      const itemDate = new Date(item.visited_at)
      const dayOfWeek = itemDate.getDay()

      const dayName = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ][dayOfWeek]

      result[dayName].push(item)
    })

    return result
  }

  useEffect(() => {
    const res = divideDataByWeekday(currentWeekData);
    const newData = [];

    Object.entries(res).forEach(([key, value]) => {
        const length = value.length;

        if (!newData.some(item => Object.keys(item)[0] === key)) {
            newData.push({ name:key, person:length });
        }
    });

    const dataArray = newData.map(item => item);

    setData(dataArray);
}, [currentWeekData]);

  return (
    <section className='p-2 text-black h-[20rem] bg-sky-50 shadow'>
      <h1 className='py-3 font-semibold text-center text-gray-700'>
        Visit This Week
      </h1>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='person' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}
