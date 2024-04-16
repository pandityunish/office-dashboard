import React from 'react'
import { CircularProgressbarWithChildren ,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function CircularDays({days}) {


  // Set the inline style for the colored and remaining portions
  
  return (
    <div className="">
    <CircularProgressbarWithChildren
  value={days}
  className='h-24 text-white'
 
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.15,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',

    // Text size
    textSize: '16px',

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

   
    pathColor: `#FF3A3A`,
    textColor: '#F1F9FF',
    trailColor: '#F1F9FF',
    backgroundColor: '#3e98c7',
  })}
> <div className='flex items-center justify-center flex-col text-xs text-white'>
  <p className='text-base'>{days}</p>
  <p>Days Left</p>
  </div></CircularProgressbarWithChildren>
  </div>
  )
}
