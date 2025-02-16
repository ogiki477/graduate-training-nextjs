import React from 'react';
import TableSearch from '@/components/TableSearch';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import Link from 'next/link';
import { alumnisData, role} from '@/lib/data';
import FormModal from '@/components/FormModal';

type Alumni = {
    id:number;
    name:string;
    email:string;
    photo:string;
    level:string;
    studentId:string;
    classes:string[];
    university:string;
    phone:string;
    year_completed:string;
}


const columns = [

    {
        header: "Info" , accessor: "info"
    },
    {
        header: "Alumni ID" , 
        accessor: "AlumniId",
        className: "hidden md:table-cell" 
    },
    
    {
        header: "Year of Completion" , 
        accessor: "year_completed",
        className: "hidden md:table-cell" 
    },
    
    {
        header: "Full Name" , 
        accessor: "name",
        className: "hidden md:table-cell" 
    },
    {
        header: "Phone Number" , 
        accessor: "phone",
        className: "hidden lg:table-cell" 
    },
    {
        header: "University Name" , 
        accessor: "university",
        className: "hidden lg:table-cell" 
    },

    {
        header: "Actions" , 
        accessor: "action",
    }
    

]

const AlumniPageList = () => {

    const renderRow = (item:Alumni) => (
      <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurple'>
        <td className='flex items-center gap-4 p-4'>
        <Image src={item.photo} alt='' 
        width={40} 
        height={40} className='md:hidden xl:block w-10 h-10 rounded-full object-cover'></Image>
        <div className='flex flex-col'>
            <h3 className='font-semibold'>{item.name}</h3>
            <p className='text-xs text-gray-500'>{item?.email}</p>
        </div>
        </td>
        <td className='hidden md:table-cell'>{item.studentId}</td>
        <td className='hidden md:table-cell'>{item.year_completed}</td>
        <td className='hidden md:table-cell'>{item.name}</td>
        <td className='hidden md:table-cell'>{item.phone}</td>
        <td className='hidden md:table-cell'>{item.university}</td>

        <td className="px-4 py-2">
  <div className="flex items-center gap-2">
    <Link href={`/list/alumnis/${item.id}`}>
      <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple hover:bg-yellow-400 transition duration-300">
        <Image src="/view1.png" alt="View" width={16} height={16} className='bg-white'/>
      </button>
    </Link>

    {role === "admin" && (
      // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky hover:bg-red-300 transition duration-300">
      //   <Image src="/delete.png" alt="Delete" width={16} height={16} />
      // </button>
      <FormModal table="alumni" type="delete" id={item.id}/>
    )}
  </div>
</td>

        
      </tr>

);

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'> 
        {/* TOP */}
            <div className='flex justify-between items-center'>
                <h1 className='hidden md:block text-lg font-semibold'>All Alumnis</h1>
                <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                    <TableSearch/>
                    <div className='flex items-center gap-4 self-end'>
                      <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
                        <Image src="/filter.png" alt="" width={14} height={14} />
                      </button>
                      <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
                        <Image src="/sort.png" alt="" width={14} height={14} />
                      </button>
                      {role === 'admin' && (
                        // <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
                        // <Image src="/create.png" alt="" width={14} height={14} 
                        // />
                        // </button>
                        <FormModal table="alumni" type="create" />
                      )}
                    </div>
                </div>
            </div>
        {/* LIST  */}
           <Table columns = {columns} renderRow={renderRow} data={alumnisData} />
        {/* PAGINATION */}
           <Pagination/>
    </div>
  )
}

export default AlumniPageList;