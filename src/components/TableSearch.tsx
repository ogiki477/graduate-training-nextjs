import React from 'react';
import Image from 'next/image';

const TableSearch = () => {
  return (
    <div className='w-full md:w-auto flex items-center text-xs gap-2 bg-white rounded-full ring-[1.5px] ring-gray-300 px-2'>
         <Image src="/search.png" alt='' width={14} height={14}/>
         <input type="text" placeholder='search the table..' className='w-[200px ] p-2 bg-transparent'></input>
        
         </div>
  )
}

export default TableSearch