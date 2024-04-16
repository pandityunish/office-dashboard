export default function LineComponent({Icon,text,subtext}) {
    return (
      <div className="flex gap-2 items-center">
  <Icon className="text-xl text-[#898989]"/>
  <p className="font-bold text-base font-inter text-[#898989]">{text}:</p>
  <p className="font-normal text-base font-inter text-[#898989]">{subtext}</p>
  
      </div>
    )
  }