"use client"; // Mark this component as a Client Component

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


type Course = {
  id: number;
  name: string;
  university_id: number;
  course_code: string;
  description: string;
  created_at: string;
  updated_at: string;
};

const columns = [
  { header: "Course Code", accessor: "course_code" },
  { header: "Course Name", accessor: "name" },
  { header: "University ID", accessor: "university_id", className: "hidden md:table-cell" },
  { header: "Description", accessor: "description", className: "hidden lg:table-cell" },
  { header: "Registered Date", accessor: "created_at", className: "hidden lg:table-cell" },
  // { header: "Updated At", accessor: "updated_at", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];



const CoursesPageList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/courses');
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Fetched Courses:', data.data); // The courses are under 'data'
        setCourses(data.data); // Set courses from 'data' field
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const renderRow = (item: Course) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurple'>
      <td className='p-4'>{item.course_code}</td>
      <td className='p-4'>{item.name}</td>
      <td className='hidden md:table-cell p-4'>{item.university_id}</td>
      <td className='hidden lg:table-cell p-4'>{item.description}</td>
      <td className='hidden lg:table-cell p-4'>{formatDate(item.created_at)}</td>
      {/* <td className='hidden lg:table-cell p-4'>{item.updated_at}</td> */}
      <td className="px-4 py-2">
        <div className="flex items-center gap-2">
          <Link href={`/list/courses/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple hover:bg-yellow-400 transition duration-300">
              <Image src="/view1.png" alt="View" width={16} height={16} className="bg-white" />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="course" type="delete" id={item.id} />
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
        <h1 className='hidden md:block text-lg font-semibold'>All Courses</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === 'admin' && <FormModal table="course" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={courses} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default CoursesPageList;