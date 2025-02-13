import React from 'react';
import UserCard from '@/components/UserCard';
import CountChart from '@/components/CountChart';
import AttendanceChart from '@/components/AttendanceChart';
import PerformanceChart from '@/components/PerformanceChart';
import EventCalendar from '@/components/EventCalendar';
import Announcements from '@/components/Announcements';

const AdminPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* LEFT */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        {/* USER CARDS */}
        <div className='flex gap-4 justify-between flex-wrap'>
          <UserCard type="school-admins" />
          <UserCard type="supervisors" />
          <UserCard type="alumnis" />
          <UserCard type="students" />
        </div>

        {/* MIDDLE CHARTS */}
        <div className='flex gap-4 flex-col lg:flex-row'>
          {/* COUNT CHART */}
          <div className='w-full lg:w-1/2 h-[450px]'>
            <CountChart />
          </div>

          {/* ATTENDANCE CHART */}
          <div className='w-full lg:w-1/2 h-[450px]'>
            <AttendanceChart />
          </div>
        </div>

        {/* BOTTOM CHARTS */}
        <div className='h-full w-full'>
          <PerformanceChart/>
        </div>
      </div>

      {/* RIGHT */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8' > 
      <EventCalendar/>
      <Announcements/>
      </div>
    </div>
  );
};

export default AdminPage;