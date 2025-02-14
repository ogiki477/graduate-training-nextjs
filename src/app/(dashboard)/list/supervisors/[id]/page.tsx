import React from 'react';
import Image from 'next/image';
import BigCalendar from '@/components/BigCalendar';
import Announcements from '@/components/Announcements';
import Link from 'next/link';
import ProgressIndicatorChart from '@/components/ProgressIndicatorChart';

const SinglePageSupervisor = () => {
  return (
    <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
     {/* LEFT */}
     <div className='w-full xl:w-2/3'>
      {/* TOP */}
      <div className='flex flex-col lg:flex-row gap-4'>
      {/* USER AND INFORMATION CARD */}
      <div className='bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4'>
         <div className='w-1/3'>
         <Image
            src="/omo4.jpg"
            alt="Profile"
            width={144}
            height={144}
            className="w-36 h-36 rounded-full object-cover"
          />
         </div>
         <div className='w-2/3 flex flex-col justify-between gap-4'>
          <h1 className='text-xl font-semibold'>Ogiki Moses Odera</h1>
          <p className='text-sm text-gray-500'>A reknown Makerere Supervisor</p>
          <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
              <Image src="/blood.png" alt='' width={14} height={14}></Image>
              <span>A+</span>
            </div>
            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
              <Image src="/date.png" alt='' width={14} height={14}></Image>
              <span>February,2025</span>
            </div>
            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
              <Image src="/mail.png" alt='' width={14} height={14}></Image>
              <span>ogikimoses@gmail.com</span>
            </div>
            <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
              <Image src="/phone.png" alt='' width={14} height={14}></Image>
              <span>+256762045035</span>
            </div>
          </div>
         </div>
      </div>
      {/* SMALL CARDS */}
      <div className='flex-1 flex gap-4 justify-between flex-wrap'>
        {/* CARD */}
         <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'> 
          <Image src="/performance1.png" alt='' height={20} width={20} className='w-6 h-6'/>
          <div className=''>
            <h1 className='text-xl font-semibold'>90%</h1>
            <span className='text-sm text-gray-500'>Performance</span>
          </div>
         </div>
         {/* CARD */}
         <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
          <Image src="/students1.png" alt='' height={20} width={20} className='w-6 h-6'/>
          <div className=''>
            <h1 className='text-xl font-semibold'>200</h1>
            <span className='text-sm text-gray-500'>Students</span>
          </div>
         </div>
         {/* CARD */}
         <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
          <Image src="/levels1.png" alt='' height={20} width={20} className='w-6 h-6'/>
          <div className=''>
            <h1 className='text-xl font-semibold'>2</h1>
            <span className='text-sm text-gray-500'>StudentLevels</span>
          </div>
         </div>
         {/* CARD */}
         <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
          <Image src="/singleAttendance.png" alt='' height={20} width={20} className='w-6 h-6'/>
          <div className=''>
            <h1 className='text-xl font-semibold'>80%</h1>
            <span className='text-sm text-gray-500'>Attendance</span>
          </div>
         </div>
      </div>
      </div>
      {/* BOTTOM  */}
      <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
        <h1>Supervisor&apos;s Schedule</h1>
        <BigCalendar/>
      </div> 
     </div>
     {/* RIGHT */}
     <div className='w-full xl:w-1/3 flex flex-col gap-4'> 
     <div className='bg-white p-4 rounded-md '>
        <h1 className='text-lg font-semibold'>Shortcuts</h1>
        <div className='mt-4 flex gap-4 flex-wrap text-xs text-gray-500'>
          <Link className='p-3 rounded-md bg-lamaSky' href="/">Supervisor&apos;s Assignments</Link>
          <Link className='p-3 rounded-md bg-lamaPurple' href="/">Supervisor&apos;s Students</Link>
          <Link className='p-3 rounded-md bg-lamaYellow' href="/">Supervisor&apos;s Announcements</Link>
          <Link className='p-3 rounded-md bg-lamaSkyLight' href="/">Supervisor&apos;s Events</Link>
        </div>
     </div>
     <ProgressIndicatorChart />
     <Announcements/>
     </div>
    </div>
  )
}

export default SinglePageSupervisor;