"use client";
import React from 'react';
import Image from 'next/image';

const FormModal = ({table,type,data,id}:{
    table: | "supervisor" | "student" | "course" | "events";
    type: | "create" | "update" | "delete";
    data?: any;
    id?: number;
}) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-blue-500" : "bg-lamaSky hover:bg-red-300 transition duration-300";

    const [open , setOpen ] = React.useState(false);

    const  Form = () => {
        return type === "delete" && id ? ( 
            <form action="" className='flex flex-col p-4 gap-4'>
                <span className='text-lg text-center font-medium'>Are you sure you want to delete this {table}?</span>
                <button className='bg-red-500 text-white px-4 py-2 rounded-md border-none w-max self-center' onClick={() => setOpen(false)}>Delete</button>
            </form>
         ) : (
            "Create Or Update Form"
         );
    };

  return <>
  <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
  onClick={() => setOpen(true)}
  >
   <Image src={`/${type}.png`} alt='' width={16} height={16} />
  </button>
  {open && (
  <div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
        <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
            <Form/>
        <div className='absolute top-4 right-4 cursor-pointer' onClick={() => setOpen(false)}>
            <Image src="/close.png" alt='' width={14} height={14}/>
            </div>
        </div>
  </div> )}
  </>
}

export default FormModal