"use client";
import React, { useEffect, useState } from 'react';
import TableSearch from '@/components/TableSearch';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import Link from 'next/link';
import { role } from '@/lib/data'; // Import role from the data file
import FormModal from '@/components/FormModal';
import { format } from 'date-fns';

const formatDate = (date: string): string => {
  return format(new Date(date), 'd-MMM-yyyy');
};

type ScheduledTraining = {
  id: number;
  module_name: string;
  description: string;
  start_date: string;
  end_date: string;
  duration_weeks: number;
  activities: string;
  is_completed: boolean;
  course_id: number;
  university_id: number;
  created_at: string;
  updated_at: string;
};

const columns = [
  { header: "Module Name", accessor: "module_name" },
  { header: "Description", accessor: "description", className: "hidden md:table-cell" },
  { header: "Start Date", accessor: "start_date", className: "hidden lg:table-cell" },
  { header: "End Date", accessor: "end_date", className: "hidden lg:table-cell" },
  { header: "Duration (Weeks)", accessor: "duration_weeks", className: "hidden md:table-cell" },
  { header: "Activities", accessor: "activities", className: "hidden lg:table-cell" },
  { header: "Completed", accessor: "is_completed", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

const ScheduledTrainingsPageList: React.FC = () => {
  const [trainings, setTrainings] = useState<ScheduledTraining[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch training schedules from the API
  const fetchTrainings = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/training_schedules');
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched Training Schedules:', data.data);
      setTrainings(data.data); // Assuming the API returns a "data" array
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const renderRow = (item: ScheduledTraining) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurple'>
      <td className='p-4'>{item.module_name}</td>
      <td className='hidden md:table-cell p-4'>{item.description}</td>
      <td className='hidden lg:table-cell p-4'>{formatDate(item.start_date)}</td>
      <td className='hidden lg:table-cell p-4'>{formatDate(item.end_date)}</td>
      <td className='hidden md:table-cell p-4'>{item.duration_weeks}</td>
      <td className='hidden lg:table-cell p-4'>{item.activities}</td>
      <td className='hidden lg:table-cell p-4'>{item.is_completed ? 'Yes' : 'No'}</td>
      <td className="px-4 py-2">
        <div className="flex items-center gap-2">
          <Link href={`/list/training_schedules/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple hover:bg-yellow-400 transition duration-300">
              <Image src="/view1.png" alt="View" width={16} height={16} className="bg-white" />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="training_schedules" type="delete" id={item.id} onSuccess={fetchTrainings} />
          )}
        </div>
      </td>
    </tr>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */}
      <div className='flex justify-between items-center'>
        <h1 className='hidden md:block text-lg font-semibold'>All Training Schedules</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === 'admin' && <FormModal table="training_schedules" type="create" onSuccess={fetchTrainings} />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={trainings} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ScheduledTrainingsPageList;