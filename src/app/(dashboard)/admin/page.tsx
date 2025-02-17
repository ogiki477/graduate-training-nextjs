"use client"; // Mark this component as a Client Component
import React, { useEffect, useState } from 'react';
import UserCard from '@/components/UserCard';
import CountChart from '@/components/CountChart';
import AttendanceChart from '@/components/AttendanceChart';
import PerformanceChart from '@/components/PerformanceChart';
import EventCalendar from '@/components/EventCalendar';
import Announcements from '@/components/Announcements';
import Link from 'next/link';

const AdminPage = () => {
  const [coursesCount, setCoursesCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoursesCount = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/courses');
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const data = await response.json();
        setCoursesCount(data.data.length); // Set the count of courses
      } catch (error: any) {
        console.error('Error fetching courses:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesCount();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* LEFT */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        {/* USER CARDS */}
        <div className='flex gap-4 justify-between flex-wrap'>
          <Link href="list/courses" ><UserCard type="Courses" count={coursesCount} /></Link>
          
          <UserCard type="supervisors" count={0} /> {/* Replace with actual data */}
          <UserCard type="alumnis" count={0} /> {/* Replace with actual data */}
          <UserCard type="students" count={0} /> {/* Replace with actual data */}
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
          <PerformanceChart />
        </div>
      </div>

      {/* RIGHT */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;