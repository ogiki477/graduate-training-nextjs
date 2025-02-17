"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '../InputField'; // Assuming you have InputField for reusability
import Image from 'next/image';

// Zod validation schema for Course form
const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'Course name must be at least 3 characters' })
    .max(50, { message: 'Course name must be at most 50 characters' }),
  course_code: z
    .string()
    .min(3, { message: 'Course code must be at least 3 characters' })
    .max(20, { message: 'Course code must be at most 20 characters' }),
  university_id: z
    .number()
    .min(1, { message: 'University ID is required' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' }),
  img: z
    .instanceof(FileList)
    .optional()
    .refine((files) => files?.length === 1, { message: 'Please upload one image file' }),
});

type Inputs = z.infer<typeof schema>;

const CourseForm = ({ type, data }: { type: 'create' | 'update'; data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      university_id: data?.university_id || 1, // Set default value for university_id
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    // You can make an API call here to create/update the course
  });

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>{type === 'create' ? 'Create a new Course' : 'Update Course'}</h1>
      <span className='text-xs text-gray-400 font-medium'>Course Information</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputField
          label='Course Name'
          name='name'
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label='Course Code'
          name='course_code'
          defaultValue={data?.course_code}
          register={register}
          error={errors.course_code}
        />
        <InputField
          label='University ID'
          name='university_id'
          type='number'
          defaultValue={data?.university_id}
          register={register}
          error={errors.university_id}
        />
      </div>
      <span className='text-xs text-gray-400 font-medium'>Additional Information</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputField
          label='Description'
          name='description'
          defaultValue={data?.description}
          register={register}
          error={errors.description}
          type="text"
        />
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Course Image</label>
          <label
            className='text-xs text-gray-500 flex items-center gap-2 cursor-pointer'
            htmlFor='img'
          >
            <Image src='/upload.png' alt='' width={28} height={28} />
            <span>Upload a course image</span>
          </label>
          <input type='file' id='img' {...register('img')} className='hidden' />
          {errors.img?.message && (
            <p className='text-xs text-red-400'>{errors.img.message.toString()}</p>
          )}
        </div>
      </div>
      <button className='bg-blue-400 text-white p-2 rounded-md'>
        {type === 'create' ? 'Create' : 'Update'}
      </button>
    </form>
  );
};

export default CourseForm;
