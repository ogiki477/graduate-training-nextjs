"use client";
import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import TrainingForm from './forms/TrainingForm';

const SupervisorForm = dynamic(() => import("./forms/SupervisorForm"), {
  loading: () => <p>Loading...</p>,
});

const CourseForm = dynamic(() => import("./forms/CourseForm"), {
  loading: () => <p>Loading...</p>,
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <p>Loading...</p>,
});

const AlumniForm = dynamic(() => import("./forms/AlumniForm"), {
  loading: () => <p>Loading...</p>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any, onClose?: () => void, onSuccess?: () => void) => JSX.Element;
} = {
  supervisor: (type, data) => <SupervisorForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  alumni: (type, data) => <AlumniForm type={type} data={data} />,
  course: (type, data, onClose, onSuccess) => <CourseForm type={type} data={data} onClose={onClose!} onSuccess={onSuccess!} />,
  training_schedules: (type, data, onClose, onSuccess) => <TrainingForm type={type} data={data} onClose={onClose!} onSuccess={onSuccess!} />,
};

const FormModal = ({ table, type, data, id, onSuccess }: {
  table: "supervisor" | "student" | "course" | "events" | "alumni" | "training_schedules";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
  onSuccess: () => void; // Add onSuccess prop
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-blue-500" : "bg-lamaSky hover:bg-red-300 transition duration-300";

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className='flex flex-col p-4 gap-4'>
        <span className='text-lg text-center font-medium'>Are you sure you want to delete this {table}?</span>
        <button className='bg-red-500 text-white px-4 py-2 rounded-md border-none w-max self-center' onClick={() => setOpen(false)}>Delete</button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data, handleClose, onSuccess) // Pass handleClose and onSuccess
    ) : (
      "Oops!! Form Not Found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt='' width={16} height={16} />
      </button>
      {open && (
        <div className='fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] max-h-[90vh] overflow-y-auto'>
            <Form />
            <div className='absolute top-4 right-4 cursor-pointer' onClick={handleClose}>
              <Image src="/close.png" alt='' width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;