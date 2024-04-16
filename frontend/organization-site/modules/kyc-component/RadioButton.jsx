import React, { useState } from 'react'

export default function RadioButton({title,onclickfunction}) {
    const [selected, setSelected] = useState(false);

    const handleRadioClick = () => {
      setSelected(!selected);
    
    };

  return (
    <div className="flex items-center mr-4 mb-4">
    <input
      id="radio1"
      type="radio"
      name="radio"
      className="hidden"
      checked={selected}
      // onChange={handleRadioClick}
    />
    <label
      htmlFor="radio1"
      className="flex items-center cursor-pointer gap-2 font-normal text-sm font-inter"
      onClick={()=>{
        handleRadioClick();
        onclickfunction();
      }}
    >
      <span
        className={`w-[20px] h-[20px] flex items-center justify-center  rounded  bg-white mr-1 border border-grey `}
      > <div className={`${
        selected===true ? 'w-[11px] h-[11px] bg-primaryblue rounded-[2px]' : ''
      }`}>
        </div></span>
     {title}
    </label>
  </div>
  )
}
