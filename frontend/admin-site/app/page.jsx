import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
    {/* <div className="w-[1920px] h-[1300px] relative bg-white rounded-2xl">
  <div className="w-[212px] h-[1300px] px-4 py-5 left-0 top-0 absolute border-r border-zinc-900 border-opacity-10 flex-col justify-between items-center gap-7 inline-flex">
    <div className="self-stretch h-[616px] flex-col justify-start items-start gap-4 flex">
      <div className="self-stretch px-2 py-1 rounded-lg justify-start items-center gap-2 inline-flex">
        <div className="rounded-lg justify-start items-center gap-2 flex">
          <div className="rounded-lg justify-center items-center gap-1 flex">
            <img className="w-6 h-6 relative rounded-[80px]" src="https://via.placeholder.com/24x24" />
          </div>
          <div className="flex-col justify-start items-start inline-flex">
            <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Xyz. Administration</div>
          </div> 
        </div>
      </div>
      <div className="self-stretch h-[104px] pb-3 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch px-1 justify-start items-start gap-1 inline-flex" />
        <div className="self-stretch px-2 py-1 rounded-lg justify-start items-center gap-2 inline-flex">
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-2 flex">
            <div className="rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 p-[5px] justify-center items-center flex" />
            </div>
            <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Overview</div>
            </div>
          </div>
        </div>
        <div className="self-stretch px-2 py-1 rounded-lg justify-start items-center gap-2 inline-flex">
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-2 flex">
            <div className="rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 p-[5px] justify-center items-center flex" />
            </div>
            <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Current Visitors</div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-[200px] pb-3 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch h-7 px-3 py-1 flex-col justify-center items-start flex">
          <div className="self-stretch text-zinc-900 text-opacity-40 text-sm font-normal leading-tight">Menus</div>
        </div>
        <div className="self-stretch pr-2 py-1 bg-zinc-900 bg-opacity-5 rounded-lg justify-start items-center gap-1 inline-flex">
          <div className="rounded-lg justify-end items-center flex">
            <div className="rounded-lg justify-center items-center flex">
              <div className="w-5 h-5 pr-4 py-0.5 justify-start items-center flex" />
            </div>
            <div className="opacity-0 rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 px-[5.50px] py-[3.50px] justify-center items-center flex" />
            </div>
          </div>
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-1 flex">
            <div className="w-5 h-5 relative">
              <img className="w-[6.25px] h-[9.70px] left-[1.87px] top-[2.30px] absolute" src="https://via.placeholder.com/6x10" />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Overview</div>
            </div>
          </div>
        </div>
        <div className="self-stretch pr-2 py-1 rounded-lg justify-start items-center gap-1 inline-flex">
          <div className="rounded-lg justify-end items-center flex">
            <div className="opacity-0 rounded-lg justify-center items-center flex">
              <div className="w-5 h-5 pr-4 py-0.5 justify-start items-center flex" />
            </div>
            <div className="rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 px-[5.50px] py-[3.50px] justify-center items-center flex" />
            </div>
          </div>
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-1 flex">
            <div className="w-5 h-5 relative">
              <img className="w-[8.75px] h-[5px] left-[1.88px] top-[3.75px] absolute" src="https://via.placeholder.com/9x5" />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Visitors</div>
            </div>
          </div>
        </div>
        <div className="self-stretch pr-2 py-1 rounded-lg justify-start items-center gap-1 inline-flex">
          <div className="rounded-lg justify-end items-center flex">
            <div className="opacity-0 rounded-lg justify-center items-center flex">
              <div className="w-5 h-5 pr-4 py-0.5 justify-start items-center flex" />
            </div>
            <div className="rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 px-[5.50px] py-[3.50px] justify-center items-center flex" />
            </div>
          </div>
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-1 flex">
            <div className="w-5 h-5 relative">
              <img className="w-[9.38px] h-[15px] left-[1.25px] top-[3.75px] absolute" src="https://via.placeholder.com/9x15" />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Staff</div>
            </div>
          </div>
        </div>
        <div className="self-stretch pr-2 py-1 rounded-lg justify-start items-center gap-1 inline-flex">
          <div className="rounded-lg justify-end items-center flex">
            <div className="opacity-0 rounded-lg justify-center items-center flex">
              <div className="w-5 h-5 pr-4 py-0.5 justify-start items-center flex" />
            </div>
            <div className="rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 px-[5.50px] py-[3.50px] justify-center items-center flex" />
            </div>
          </div>
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-1 flex">
            <div className="w-5 h-5 relative">
              <img className="w-[9.38px] h-[15px] left-[1.25px] top-[3.75px] absolute" src="https://via.placeholder.com/9x15" />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Notice</div>
            </div>
          </div>
        </div>
        <div className="self-stretch pr-2 py-1 rounded-lg justify-start items-center gap-1 inline-flex">
          <div className="rounded-lg justify-end items-center flex">
            <div className="opacity-0 rounded-lg justify-center items-center flex">
              <div className="w-5 h-5 pr-4 py-0.5 justify-start items-center flex" />
            </div>
            <div className="rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 px-[5.50px] py-[3.50px] justify-center items-center flex" />
            </div>
          </div>
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-1 flex">
            <div className="w-5 h-5 relative">
              <img className="w-[9.38px] h-[15px] left-[1.25px] top-[3.75px] absolute" src="https://via.placeholder.com/9x15" />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Messages</div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-[232px] pb-3 flex-col justify-start items-start gap-1 flex">
        <div className="self-stretch h-7 px-3 py-1 flex-col justify-center items-start flex">
          <div className="self-stretch text-zinc-900 text-opacity-40 text-sm font-normal leading-tight">Pages</div>
        </div>
        <div className="self-stretch pr-2 py-1 rounded-lg justify-start items-center gap-1 inline-flex">
          <div className="rounded-lg justify-end items-center flex">
            <div className="opacity-0 rounded-lg justify-center items-center flex">
              <div className="w-5 h-5 pr-4 py-0.5 justify-start items-center flex" />
            </div>
            <div className="rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 px-[3.50px] py-[5.50px] justify-center items-center flex" />
            </div>
          </div>
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-1 flex">
            <div className="w-5 h-5 relative">
              <img className="w-[12.50px] h-[15px] left-[3.75px] top-[2.50px] absolute" src="https://via.placeholder.com/12x15" />
              <img className="w-[6.25px] h-[6.25px] left-[6.88px] top-[7.50px] absolute" src="https://via.placeholder.com/6x6" />
              <img className="w-[16.25px] h-[13.75px] left-[16.88px] top-[1.88px] absolute origin-top-left rotate-90" src="https://via.placeholder.com/16x14" />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Profile</div>
            </div>
          </div>
        </div>
        <div className="self-stretch pr-2 py-1 rounded-lg justify-start items-center gap-1 inline-flex">
          <div className="rounded-lg justify-end items-center flex">
            <div className="opacity-0 rounded-lg justify-center items-center flex">
              <div className="w-5 h-5 pr-4 py-0.5 justify-start items-center flex" />
            </div>
            <div className="opacity-0 rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 px-[5.50px] py-[3.50px] justify-center items-center flex" />
            </div>
          </div>
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-1 flex">
            <div className="w-5 h-5 relative opacity-0">
              <img className="w-[6.25px] h-[9.70px] left-[1.87px] top-[2.30px] absolute" src="https://via.placeholder.com/6x10" />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Settings</div>
            </div>
          </div>
        </div>
        <div className="self-stretch pr-2 py-1 rounded-lg justify-start items-center gap-1 inline-flex">
          <div className="rounded-lg justify-end items-center flex">
            <div className="opacity-0 rounded-lg justify-center items-center flex">
              <div className="w-5 h-5 pr-4 py-0.5 justify-start items-center flex" />
            </div>
            <div className="rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 px-[5.50px] py-[3.50px] justify-center items-center flex" />
            </div>
          </div>
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-1 flex">
            <div className="w-5 h-5 relative">
              <img className="w-[7.50px] h-[7.50px] left-[6.25px] top-[7.19px] absolute" src="https://via.placeholder.com/7x7" />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">History</div>
            </div>
          </div>
        </div>
        <div className="self-stretch pr-2 py-1 rounded-lg justify-start items-center gap-1 inline-flex">
          <div className="rounded-lg justify-end items-center flex">
            <div className="opacity-0 rounded-lg justify-center items-center flex">
              <div className="w-5 h-5 pr-4 py-0.5 justify-start items-center flex" />
            </div>
            <div className="rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 px-[5.50px] py-[3.50px] justify-center items-center flex" />
            </div>
          </div>
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-1 flex">
            <div className="w-5 h-5 relative">
              <img className="w-[15px] h-[15px] left-[2.50px] top-[2.50px] absolute" src="https://via.placeholder.com/15x15" />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Rewards</div>
            </div>
          </div>
        </div>
        <div className="self-stretch pr-2 py-1 rounded-lg justify-start items-center gap-1 inline-flex">
          <div className="rounded-lg justify-end items-center flex">
            <div className="opacity-0 rounded-lg justify-center items-center flex">
              <div className="w-5 h-5 pr-4 py-0.5 justify-start items-center flex" />
            </div>
            <div className="rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 px-[5.50px] py-[3.50px] justify-center items-center flex" />
            </div>
          </div>
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-1 flex">
            <div className="w-5 h-5 relative">
              <img className="w-[15px] h-[15px] left-[2.50px] top-[2.50px] absolute" src="https://via.placeholder.com/15x15" />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Issues</div>
            </div>
          </div>
        </div>
        <div className="self-stretch pr-2 py-1 rounded-lg justify-start items-center gap-1 inline-flex">
          <div className="rounded-lg justify-end items-center flex">
            <div className="opacity-0 rounded-lg justify-center items-center flex">
              <div className="w-5 h-5 pr-4 py-0.5 justify-start items-center flex" />
            </div>
            <div className="rounded-lg justify-center items-center flex">
              <div className="w-4 h-4 px-[5.50px] py-[3.50px] justify-center items-center flex" />
            </div>
          </div>
          <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-1 flex">
            <div className="w-5 h-5 relative">
              <img className="w-[12.50px] h-[12.50px] left-[1.25px] top-[1.87px] absolute" src="https://via.placeholder.com/12x12" />
            </div>
            <div className="flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Social</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="self-stretch h-9 p-2 flex-col justify-start items-center flex" />
  </div>
  <div className="w-[280px] h-[1300px] p-5 left-[1640px] top-0 absolute border-l border-zinc-900 border-opacity-10 flex-col justify-start items-start gap-6 inline-flex">
    <div className="self-stretch h-[252px] flex-col justify-start items-start gap-2 flex">
      <div className="self-stretch h-9 px-1 py-2 flex-col justify-center items-start flex">
        <div className="self-stretch text-zinc-900 text-sm font-semibold leading-tight">Notifications</div>
      </div>
      <div className="w-[232px] grow shrink basis-0 p-1 rounded-lg justify-start items-start gap-2 inline-flex">
        <div className="p-1 bg-sky-100 rounded-lg justify-center items-center flex">
          <div className="w-4 h-4 px-[1.50px] pt-px pb-[1.50px] justify-center items-center flex" />
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
          <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">You have a bug that needs to be fixed.</div>
          <div className="self-stretch text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Just now</div>
        </div>
      </div>
      <div className="w-[232px] grow shrink basis-0 p-1 rounded-lg justify-start items-start gap-2 inline-flex">
        <div className="p-1 bg-slate-200 rounded-lg justify-center items-center flex">
          <div className="w-4 h-4 px-[1.49px] pt-[1.50px] pb-0.5 justify-center items-center flex" />
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
          <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">New user registered</div>
          <div className="self-stretch text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">59 minutes ago</div>
        </div>
      </div>
      <div className="w-[232px] grow shrink basis-0 p-1 rounded-lg justify-start items-start gap-2 inline-flex">
        <div className="p-1 bg-sky-100 rounded-lg justify-center items-center flex">
          <div className="w-4 h-4 px-[1.50px] pt-px pb-[1.50px] justify-center items-center flex" />
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
          <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">You have a bug that needs to be fixed.</div>
          <div className="self-stretch text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">12 hours ago</div>
        </div>
      </div>
      <div className="w-[232px] grow shrink basis-0 p-1 rounded-lg justify-start items-start gap-2 inline-flex">
        <div className="p-1 bg-slate-200 rounded-lg justify-center items-center flex">
          <div className="w-4 h-4 px-[0.50px] py-[2.59px] justify-center items-center flex" />
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
          <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Andi Lane subscribed to you</div>
          <div className="self-stretch text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Today, 11:59 AM</div>
        </div>
      </div>
    </div>
    <div className="self-stretch h-[306px] flex-col justify-start items-start gap-2 flex">
      <div className="self-stretch h-9 px-1 py-2 flex-col justify-center items-start flex">
        <div className="self-stretch text-zinc-900 text-sm font-semibold leading-tight">Messages</div>
      </div>
      <div className="w-[232px] grow shrink basis-0 p-1 rounded-lg justify-start items-start gap-2 inline-flex">
        <div className="rounded-lg justify-center items-center flex">
          <img className="w-6 h-6 relative rounded-[80px]" src="https://via.placeholder.com/24x24" />
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
          <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">You have a bug that needs to be fixed.</div>
          <div className="self-stretch text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Just now</div>
        </div>
      </div>
      <div className="w-px h-44 flex-col justify-start items-center gap-10 flex">
        <div className="self-stretch grow shrink basis-0 bg-zinc-900 bg-opacity-10" />
        <div className="self-stretch grow shrink basis-0 bg-zinc-900 bg-opacity-10" />
        <div className="self-stretch grow shrink basis-0 bg-zinc-900 bg-opacity-10" />
        <div className="self-stretch grow shrink basis-0 bg-zinc-900 bg-opacity-10" />
      </div>
      <div className="w-[232px] grow shrink basis-0 p-1 rounded-lg justify-start items-start gap-2 inline-flex">
        <div className="rounded-lg justify-center items-center flex">
          <img className="w-6 h-6 relative rounded-[80px]" src="https://via.placeholder.com/24x24" />
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
          <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Released a new version</div>
          <div className="self-stretch text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">59 minutes ago</div>
        </div>
      </div>
      <div className="w-[232px] grow shrink basis-0 p-1 rounded-lg justify-start items-start gap-2 inline-flex">
        <div className="rounded-lg justify-center items-center flex">
          <img className="w-6 h-6 relative rounded-[80px]" src="https://via.placeholder.com/24x24" />
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
          <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Submitted a bug</div>
          <div className="self-stretch text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">12 hours ago</div>
        </div>
      </div>
      <div className="w-[232px] grow shrink basis-0 p-1 rounded-lg justify-start items-start gap-2 inline-flex">
        <div className="rounded-lg justify-center items-center flex">
          <img className="w-6 h-6 relative rounded-[80px]" src="https://via.placeholder.com/24x24" />
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
          <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Modified A data in Page X</div>
          <div className="self-stretch text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Today, 11:59 AM</div>
        </div>
      </div>
      <div className="w-[232px] grow shrink basis-0 p-1 rounded-lg justify-start items-start gap-2 inline-flex">
        <div className="rounded-lg justify-center items-center flex">
          <img className="w-6 h-6 relative rounded-[80px]" src="https://via.placeholder.com/24x24" />
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
          <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Deleted a page in Project X</div>
          <div className="self-stretch text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Feb 2, 2023</div>
        </div>
      </div>
    </div>
    <div className="self-stretch h-[276px] flex-col justify-start items-start gap-2 flex">
      <div className="self-stretch h-9 px-1 py-2 flex-col justify-center items-start flex">
        <div className="self-stretch text-zinc-900 text-sm font-semibold leading-tight">New Visitors</div>
      </div>
      <div className="self-stretch p-1 rounded-lg justify-start items-center gap-2 inline-flex">
        <div className="grow shrink basis-0 h-6 rounded-lg justify-start items-center gap-2 flex">
          <div className="rounded-lg justify-center items-center flex">
            <img className="w-6 h-6 relative rounded-[80px]" src="https://via.placeholder.com/24x24" />
          </div>
          <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
            <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Natali Craig</div>
          </div>
        </div>
      </div>
      <div className="self-stretch p-1 rounded-lg justify-start items-center gap-2 inline-flex">
        <div className="grow shrink basis-0 h-6 rounded-lg justify-start items-center gap-2 flex">
          <div className="rounded-lg justify-center items-center flex">
            <img className="w-6 h-6 relative rounded-[80px]" src="https://via.placeholder.com/24x24" />
          </div>
          <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
            <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Drew Cano</div>
          </div>
        </div>
      </div>
      <div className="self-stretch p-1 rounded-lg justify-start items-center gap-2 inline-flex">
        <div className="grow shrink basis-0 h-6 rounded-lg justify-start items-center gap-2 flex">
          <div className="rounded-lg justify-center items-center flex">
            <img className="w-6 h-6 relative rounded-[80px]" src="https://via.placeholder.com/24x24" />
          </div>
          <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
            <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Orlando Diggs</div>
          </div>
        </div>
      </div>
      <div className="self-stretch p-1 rounded-lg justify-start items-center gap-2 inline-flex">
        <div className="grow shrink basis-0 h-6 rounded-lg justify-start items-center gap-2 flex">
          <div className="rounded-lg justify-center items-center flex">
            <img className="w-6 h-6 relative rounded-[80px]" src="https://via.placeholder.com/24x24" />
          </div>
          <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
            <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Andi Lane</div>
          </div>
        </div>
      </div>
      <div className="self-stretch p-1 rounded-lg justify-start items-center gap-2 inline-flex">
        <div className="grow shrink basis-0 h-6 rounded-lg justify-start items-center gap-2 flex">
          <div className="rounded-lg justify-center items-center flex">
            <img className="w-6 h-6 relative rounded-[80px]" src="https://via.placeholder.com/24x24" />
          </div>
          <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
            <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Kate Morrison</div>
          </div>
        </div>
      </div>
      <div className="self-stretch p-1 rounded-lg justify-start items-center gap-2 inline-flex">
        <div className="grow shrink basis-0 h-6 rounded-lg justify-start items-center gap-2 flex">
          <div className="rounded-lg justify-center items-center flex">
            <img className="w-6 h-6 relative rounded-[80px]" src="https://via.placeholder.com/24x24" />
          </div>
          <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
            <div className="self-stretch text-zinc-900 text-sm font-normal leading-tight">Koray Okumus</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="w-[1428px] px-7 py-5 left-[212px] top-0 absolute border-b border-zinc-900 border-opacity-10 justify-between items-center gap-[312px] inline-flex">
    <img className="w-[97px] h-8" src="https://via.placeholder.com/97x32" />
    <div className="justify-start items-center gap-2 flex">
      <div className="rounded-lg justify-start items-center gap-2 flex">
        <div className="p-1 rounded-lg justify-center items-center gap-1 flex">
          <div className="w-5 h-5 relative">
            <img className="w-[16.25px] h-[13.75px] left-[1.88px] top-[3.12px] absolute" src="https://via.placeholder.com/16x14" />
          </div>
        </div>
        <div className="p-1 rounded-lg justify-center items-center gap-1 flex">
          <div className="w-5 h-5 relative">
            <img className="w-[17.49px] h-[16.88px] left-[1.25px] top-[1.25px] absolute" src="https://via.placeholder.com/17x17" />
          </div>
        </div>
      </div>
      <div className="justify-start items-center gap-1 flex">
        <div className="px-2 py-1 rounded-lg justify-center items-center gap-1 flex">
          <div className="text-center text-zinc-900 text-opacity-40 text-sm font-normal leading-tight">Dashboards</div>
        </div>
        <div className="text-zinc-900 text-opacity-20 text-sm font-normal leading-tight">/</div>
        <div className="px-2 py-1 rounded-lg justify-center items-center gap-1 flex">
          <div className="text-center text-zinc-900 text-sm font-normal leading-tight">Default</div>
        </div>
      </div>
    </div>
    <div className="justify-start items-start gap-5 flex">
      <div className="h-7 px-2 py-1 bg-zinc-900 bg-opacity-5 rounded-lg justify-start items-center gap-2 flex">
        <div className="grow shrink basis-0 h-5 rounded-lg justify-start items-center gap-1 flex">
          <div className="rounded-lg justify-center items-center flex">
            <div className="w-4 h-4 pl-[1.48px] pr-[1.50px] pt-[1.48px] pb-[1.50px] justify-center items-center flex" />
          </div>
          <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
            <div className="self-stretch text-zinc-900 text-opacity-20 text-sm font-normal leading-tight">Search</div>
          </div>
        </div>
        <div className="flex-col justify-center items-start inline-flex">
          <div className="self-stretch text-zinc-900 text-opacity-20 text-xs font-normal leading-[18px]">⌘/</div>
        </div>
      </div>
      <div className="rounded-lg justify-start items-center gap-2 flex">
        <div className="p-1 rounded-lg justify-center items-center gap-1 flex">
          <div className="w-5 h-5 relative">
            <img className="w-[10.62px] h-[10.62px] left-[4.69px] top-[4.69px] absolute" src="https://via.placeholder.com/11x11" />
          </div>
        </div>
        <div className="p-1 rounded-lg justify-center items-center gap-1 flex">
          <div className="w-5 h-5 relative" />
        </div>
        <div className="p-1 rounded-lg justify-center items-center gap-1 flex">
          <div className="w-5 h-5 relative">
            <img className="w-[14.84px] h-[13.75px] left-[2.58px] top-[1.87px] absolute" src="https://via.placeholder.com/15x14" />
          </div>
        </div>
        <div className="p-1 rounded-lg justify-center items-center gap-1 flex">
          <div className="w-5 h-5 relative">
            <img className="w-[16.25px] h-[13.75px] left-[1.88px] top-[3.12px] absolute" src="https://via.placeholder.com/16x14" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="w-[1372px] left-[240px] top-[954px] absolute justify-start items-start gap-7 inline-flex">
    <div className="w-[672px] h-[273px] relative bg-slate-50 rounded-2xl">
      <div className="left-[24px] top-[24px] absolute text-zinc-900 text-sm font-semibold leading-tight">Visitors by Issues</div>
      <div className="w-[624px] h-[189px] left-[24px] top-[60px] absolute justify-start items-start gap-4 inline-flex">
        <div className="self-stretch flex-col justify-start items-end gap-3 inline-flex">
          <div className="w-[31px] grow shrink basis-0 flex-col justify-between items-end gap-7 flex">
            <div className="text-right text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">900K</div>
            <div className="text-right text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">600K</div>
            <div className="text-right text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">300K</div>
            <div className="text-right text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">0</div>
          </div>
          <div className="flex-col justify-start items-start flex">
            <div className="text-right text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">  </div>
          </div>
        </div>
        <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-3 inline-flex">
          <div className="self-stretch grow shrink basis-0 pt-4 flex-col justify-between items-start gap-[46px] flex">
            <div className="self-stretch h-[0px] border border-zinc-900 border-opacity-5"></div>
            <div className="self-stretch h-[0px] border border-zinc-900 border-opacity-5"></div>
            <div className="self-stretch h-[0px] border border-zinc-900 border-opacity-5"></div>
            <div className="self-stretch h-[0px] border border-zinc-900 border-opacity-20"></div>
          </div>
          <div className="self-stretch h-[18px] justify-start items-start inline-flex">
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Support</div>
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Renew</div>
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">New</div>
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Cashout</div>
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Complains</div>
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Others.</div>
          </div>
        </div>
      </div>
      <div className="w-[576px] h-[120px] left-[71px] top-[98px] absolute justify-start items-end inline-flex">
        <div className="w-24 h-[68px] justify-center items-center flex">
          <div className="w-[18px] h-[68px] bg-indigo-300 rounded-tl rounded-tr" />
        </div>
        <div className="w-24 h-[81px] justify-center items-center flex">
          <div className="w-[18px] h-[81px] bg-green-200 rounded-tl rounded-tr" />
        </div>
        <div className="w-24 h-[71px] justify-center items-center flex">
          <div className="w-[18px] h-[71px] bg-zinc-900 rounded-tl rounded-tr" />
        </div>
        <div className="w-24 h-[120px] flex-col justify-center items-center inline-flex">
          <div className="w-[18px] h-[120px] bg-sky-200 rounded-tl rounded-tr" />
        </div>
        <div className="w-24 h-[35px] justify-center items-center flex">
          <div className="w-[18px] h-[35px] bg-indigo-300 rounded-tl rounded-tr" />
        </div>
        <div className="w-24 h-[88px] justify-center items-center flex">
          <div className="w-[18px] h-[88px] bg-emerald-200 rounded-tl rounded-tr" />
        </div>
      </div>
    </div>
    <div className="w-[672px] h-[273px] relative bg-slate-50 rounded-2xl">
      <div className="left-[24px] top-[24px] absolute text-zinc-900 text-sm font-semibold leading-tight">Visitors by Location</div>
      <div className="w-[118px] h-[118px] left-[47px] top-[94px] absolute" />
      <div className="left-[213px] top-[89px] absolute">
        <div className="w-[35px] h-[126px] left-[376px] top-[1px] absolute flex-col justify-start items-start gap-[18px] inline-flex">
          <div className="text-zinc-900 text-xs font-normal leading-[18px]">38.6%</div>
          <div className="text-zinc-900 text-xs font-normal leading-[18px]">22.5%</div>
          <div className="text-zinc-900 text-xs font-normal leading-[18px]">30.8%</div>
          <div className="text-zinc-900 text-xs font-normal leading-[18px]">8.1%</div>
        </div>
        <div className="w-[88px] h-32 left-0 top-0 absolute flex-col justify-start items-start gap-4 inline-flex">
          <div className="h-5 pl-0.5 pr-1 py-px rounded justify-center items-center inline-flex">
            <div className="w-4 h-4 p-[5px] justify-center items-center flex" />
            <div className="text-zinc-900 text-xs font-normal leading-[18px]">Kathmandu</div>
          </div>
          <div className="h-5 pl-0.5 pr-1 py-px rounded justify-center items-center inline-flex">
            <div className="w-4 h-4 p-[5px] justify-center items-center flex" />
            <div className="text-zinc-900 text-xs font-normal leading-[18px]">Chitwan</div>
          </div>
          <div className="h-5 pl-0.5 pr-1 py-px rounded justify-center items-center inline-flex">
            <div className="w-4 h-4 p-[5px] justify-center items-center flex" />
            <div className="text-zinc-900 text-xs font-normal leading-[18px]">Biratnagar</div>
          </div>
          <div className="h-5 pl-0.5 pr-1 py-px rounded justify-center items-center inline-flex">
            <div className="w-4 h-4 p-[5px] justify-center items-center flex" />
            <div className="text-zinc-900 text-xs font-normal leading-[18px]">Other</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="h-80 px-4 pt-5 pb-6 left-[240px] top-[606px] absolute bg-slate-50 rounded-2xl flex-col justify-start items-center gap-3 inline-flex">
    <div className="self-stretch justify-start items-center gap-2 inline-flex">
      <div className="justify-start items-center gap-4 flex">
        <div className="justify-start items-start gap-1 flex">
          <div className="px-2 py-1 rounded-lg flex-col justify-center items-start gap-1 inline-flex">
            <div className="text-zinc-900 text-sm font-semibold leading-tight">Total Users</div>
          </div>
          <div className="px-2 py-1 rounded-lg flex-col justify-center items-start gap-1 inline-flex">
            <div className="text-zinc-900 text-opacity-40 text-sm font-normal leading-tight">Total Visitors</div>
          </div>
          <div className="px-2 py-1 rounded-lg flex-col justify-center items-start gap-1 inline-flex">
            <div className="text-zinc-900 text-opacity-40 text-sm font-normal leading-tight">Visiting Status</div>
          </div>
        </div>
        <div className="w-5 h-[0px] origin-top-left rotate-90 border border-black border-opacity-20"></div>
        <div className="w-[100px] pl-0.5 pr-1 py-px rounded justify-center items-center flex">
          <div className="w-4 h-4 p-[5px] justify-center items-center flex" />
          <div className="text-zinc-900 text-xs font-normal leading-[18px]">Current Week</div>
        </div>
        <div className="w-[106px] pl-0.5 pr-1 py-px rounded justify-center items-center flex">
          <div className="w-4 h-4 p-[5px] justify-center items-center flex" />
          <div className="text-zinc-900 text-xs font-normal leading-[18px]">Previous Week</div>
        </div>
      </div>
      <div className="w-[86px] pl-0.5 pr-1 py-px rounded justify-center items-center flex">
        <div className="w-4 h-4 p-[5px] justify-center items-center flex" />
        <div className="text-zinc-900 text-xs font-normal leading-[18px]">This Month</div>
      </div>
      <div className="w-[111px] pl-0.5 pr-1 py-px rounded justify-center items-center flex">
        <div className="w-4 h-4 p-[5px] justify-center items-center flex" />
        <div className="text-zinc-900 text-xs font-normal leading-[18px]">Previous Month</div>
      </div>
      <div className="w-4 h-4 p-[5px] justify-center items-center flex" />
      <div className="text-zinc-900 text-xs font-normal leading-[18px]">Previous Year</div>
      <div className="w-4 h-4 p-[5px] justify-center items-center flex" />
      <div className="text-zinc-900 text-xs font-normal leading-[18px]">This Year</div>
      <div className="w-7 h-7 p-1 rounded-lg justify-end items-center gap-1 flex">
        <div className="w-5 h-5 px-[3.75px] justify-center items-center flex" />
      </div>
    </div>
    <div className="w-[1094px] h-[236px] relative flex-col justify-start items-start flex">
      <div className="w-[1094px] h-[232px] justify-start items-start gap-4 inline-flex">
        <div className="self-stretch flex-col justify-start items-end gap-3 inline-flex">
          <div className="w-6 grow shrink basis-0 flex-col justify-between items-end gap-7 flex">
            <div className="text-right text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">15M</div>
            <div className="text-right text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">10M</div>
            <div className="text-right text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">5M</div>
            <div className="text-right text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">1M</div>
            <div className="text-right text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">0</div>
          </div>
          <div className="flex-col justify-start items-start flex">
            <div className="text-right text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">  </div>
          </div>
        </div>
        <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-3 inline-flex">
          <div className="self-stretch grow shrink basis-0 pt-4 flex-col justify-between items-start gap-[46px] flex">
            <div className="self-stretch h-[0px] border border-zinc-900 border-opacity-5"></div>
            <div className="self-stretch h-[0px] border border-zinc-900 border-opacity-5"></div>
            <div className="self-stretch h-[0px] border border-zinc-900 border-opacity-5"></div>
            <div className="self-stretch h-[0px] border border-zinc-900 border-opacity-5"></div>
            <div className="self-stretch h-[0px] border border-zinc-900 border-opacity-20"></div>
          </div>
          <div className="self-stretch h-[18px] justify-start items-start inline-flex">
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Mon</div>
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Tue</div>
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Wed</div>
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Thu</div>
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Fri</div>
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Sat</div>
            <div className="grow shrink basis-0 text-center text-zinc-900 text-opacity-40 text-xs font-normal leading-[18px]">Sun</div>
          </div>
        </div>
      </div>
      <div className="px-2 py-1 bg-black bg-opacity-80 rounded-lg backdrop-blur-[20px] justify-start items-center gap-1 inline-flex">
        <div className="text-white text-xs font-normal leading-[18px]">Fri: 5,256,598</div>
      </div>
      <div className="w-3 h-3 p-[3px] shadow justify-center items-center inline-flex">
        <div className="w-1.5 h-1.5 origin-top-left rotate-180 bg-indigo-300 rounded-full border border-white" />
      </div>
    </div>
  </div>
  <div className="w-[344px] h-[344px] left-[1268px] top-[90px] absolute" />
  <div className="w-[202px] h-80 left-[1410px] top-[606px] absolute bg-slate-50 rounded-2xl">
    <div className="left-[24px] top-[24px] absolute text-zinc-900 text-sm font-semibold leading-tight">Visit by Branch</div>
    <div className="left-[24px] top-[60px] absolute flex-col justify-start items-start gap-[18px] inline-flex">
      <div className="text-zinc-900 text-xs font-normal leading-[18px]">Google</div>
      <div className="text-zinc-900 text-xs font-normal leading-[18px]">YouTube</div>
      <div className="text-zinc-900 text-xs font-normal leading-[18px]">Instagram</div>
      <div className="text-zinc-900 text-xs font-normal leading-[18px]">Pinterest</div>
      <div className="text-zinc-900 text-xs font-normal leading-[18px]">Facebook</div>
      <div className="text-zinc-900 text-xs font-normal leading-[18px]">Twitter</div>
      <div className="text-zinc-900 text-xs font-normal leading-[18px]">Tumblr</div>
    </div>
    <div className="w-[81px] h-[222px] left-[97px] top-[66px] absolute flex-col justify-center items-start gap-[30px] inline-flex">
      <div className="w-[81px] h-1.5 bg-zinc-900 bg-opacity-10 rounded-tr rounded-br" />
      <div className="w-[46px] h-1.5 bg-zinc-900 bg-opacity-10 rounded-tr rounded-br" />
      <div className="w-[60px] h-1.5 bg-zinc-900 rounded-tr rounded-br border border-zinc-900" />
      <div className="w-9 h-1.5 bg-zinc-900 bg-opacity-10 rounded-tr rounded-br" />
      <div className="w-[66px] h-1.5 bg-zinc-900 bg-opacity-10 rounded-tr rounded-br" />
      <div className="w-[42px] h-1.5 bg-zinc-900 bg-opacity-10 rounded-tr rounded-br" />
      <div className="w-[60px] h-1.5 bg-zinc-900 bg-opacity-10 rounded-tr rounded-br" />
    </div>
    <div className="left-[97px] top-[63px] absolute flex-col justify-start items-start gap-6 inline-flex">
      <div className="w-3 h-[0px] origin-top-left rotate-90 bg-zinc-900 bg-opacity-10 border border-zinc-900 border-opacity-10"></div>
      <div className="w-3 h-[0px] origin-top-left rotate-90 bg-zinc-900 bg-opacity-10 border border-zinc-900 border-opacity-10"></div>
      <div className="w-3 h-[0px] origin-top-left rotate-90 bg-zinc-900 border border-zinc-900"></div>
      <div className="w-3 h-[0px] origin-top-left rotate-90 bg-zinc-900 bg-opacity-10 border border-zinc-900 border-opacity-10"></div>
      <div className="w-3 h-[0px] origin-top-left rotate-90 bg-zinc-900 bg-opacity-10 border border-zinc-900 border-opacity-10"></div>
      <div className="w-3 h-[0px] origin-top-left rotate-90 bg-zinc-900 bg-opacity-10 border border-zinc-900 border-opacity-10"></div>
      <div className="w-3 h-[0px] origin-top-left rotate-90 bg-zinc-900 bg-opacity-10 border border-zinc-900 border-opacity-10"></div>
    </div>
  </div>
  <div className="w-[1372px] left-[240px] top-[466px] absolute justify-start items-start gap-7 inline-flex">
    <div className="w-[322px] h-28 relative bg-sky-100 rounded-2xl">
      <div className="left-[24px] top-[24px] absolute text-zinc-900 text-sm font-semibold leading-tight">Total Visitors</div>
      <div className="left-[24px] top-[52px] absolute text-zinc-900 text-2xl font-semibold leading-9">721K</div>
      <div className="h-5 pl-1 pr-0.5 py-px left-[228px] top-[60px] absolute rounded justify-center items-center gap-1 inline-flex">
        <div className="text-right text-zinc-900 text-xs font-normal leading-[18px]">+11.01%</div>
        <div className="w-4 h-4 pl-[1.50px] pr-0.5 py-1 justify-center items-center flex" />
      </div>
    </div>
    <div className="w-[322px] h-28 relative bg-slate-200 rounded-2xl">
      <div className="left-[24px] top-[24px] absolute text-zinc-900 text-sm font-semibold leading-tight">Total Visits</div>
      <div className="left-[24px] top-[52px] absolute text-zinc-900 text-2xl font-semibold leading-9">367K</div>
      <div className="h-5 pl-1 pr-0.5 py-px left-[228px] top-[60px] absolute rounded justify-center items-center gap-1 inline-flex">
        <div className="text-right text-zinc-900 text-xs font-normal leading-[18px]">+11.01%</div>
        <div className="w-4 h-4 pl-[1.50px] pr-0.5 py-1 justify-center items-center flex" />
      </div>
    </div>
    <div className="w-[322px] h-28 relative bg-sky-100 rounded-2xl">
      <div className="left-[24px] top-[24px] absolute text-zinc-900 text-sm font-semibold leading-tight">Today Vistors</div>
      <div className="left-[24px] top-[52px] absolute text-zinc-900 text-2xl font-semibold leading-9">1,156</div>
      <div className="h-5 pl-1 pr-0.5 py-px left-[228px] top-[60px] absolute rounded justify-center items-center gap-1 inline-flex">
        <div className="text-right text-zinc-900 text-xs font-normal leading-[18px]">+11.01%</div>
        <div className="w-4 h-4 pl-[1.50px] pr-0.5 py-1 justify-center items-center flex" />
      </div>
    </div>
    <div className="w-[322px] h-28 relative bg-slate-200 rounded-2xl">
      <div className="left-[24px] top-[24px] absolute text-zinc-900 text-sm font-semibold leading-tight">Total Users</div>
      <div className="left-[24px] top-[52px] absolute text-zinc-900 text-2xl font-semibold leading-9">239K</div>
      <div className="h-5 pl-1 pr-0.5 py-px left-[228px] top-[60px] absolute rounded justify-center items-center gap-1 inline-flex">
        <div className="text-right text-zinc-900 text-xs font-normal leading-[18px]">+11.01%</div>
        <div className="w-4 h-4 pl-[1.50px] pr-0.5 py-1 justify-center items-center flex" />
      </div>
    </div>
  </div>
  <div className="h-7 px-2 py-1 left-[240px] top-[410px] absolute rounded-lg justify-start items-center gap-1 inline-flex">
    <div className="text-zinc-900 text-sm font-semibold leading-tight">Statistics</div>
    <div className="w-4 h-4 px-[3.50px] py-[5.50px] justify-center items-center flex" />
  </div>
  <div className="h-[59.71px] px-4 py-2 left-[219px] top-[90px] absolute rounded-xl justify-center items-center inline-flex">
    <div className="text-center text-zinc-900 text-lg font-semibold leading-7">Xyz. Organization Private Limited</div>
  </div>
  <div className="h-[38px] px-2 py-1 left-[228.50px] top-[180.93px] absolute rounded-lg justify-center items-center gap-1 inline-flex">
    <div className="text-center text-zinc-900 text-sm font-semibold leading-tight">Contact:</div>
  </div>
  <div className="left-[239.36px] top-[142.93px] absolute text-indigo-500 text-[19px] font-semibold leading-[27.14px]">1998 AD</div>
  <div className="left-[377.79px] top-[142.93px] absolute text-indigo-500 text-[19px] font-semibold leading-[27.14px]">Bouddha, Kathmandu Nepal</div>
  <div className="left-[265.14px] top-[214.86px] absolute text-indigo-500 text-[19px] font-semibold leading-[27.14px]">9816399133</div>
  <div className="left-[459.21px] top-[213.50px] absolute text-indigo-500 text-[19px] font-semibold leading-[27.14px]">xyz@gmail.com</div>
  <div className="w-[24.43px] h-[24.43px] left-[426.64px] top-[214.86px] absolute" />
  <div className="w-[16.29px] h-[16.29px] left-[240.71px] top-[218.93px] absolute">
  </div>
</div> */}
    </main>
  )
}
