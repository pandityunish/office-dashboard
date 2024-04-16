import React, { useState } from 'react'
import { aciveanddiactivethesubadmin } from '../data/branch_service';
import { toast } from 'react-toastify';

export default function SwitchButton({isvalue,id}) {
    const [isChecked, setIsChecked] = useState(isvalue);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    aciveanddiactivethesubadmin({toast:toast,id:id,isactive:!isChecked})
  };
  return (
    <div
    className={`w-10 h-5 rounded-2xl flex items-center relative  cursor-pointer  ${
      isChecked ? 'bg-green-500' : 'bg-red-500'
    }`}
    onClick={handleToggle}
  >
    <div
      className={`w-4 h-4 rounded-full bg-white absolute transition-transform transform ${
        isChecked ? 'left-0' : 'right-0'
      } `}
    ></div>
  </div>
  )
}
