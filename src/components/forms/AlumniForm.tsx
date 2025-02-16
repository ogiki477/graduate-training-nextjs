"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '../InputField';
import Image from 'next/image';

// Define the schema with custom file validation for PDFs
const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be at most 20 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  firstName: z.string().min(3, { message: 'First name is required' }),
  lastName: z.string().min(3, { message: 'Last name is required' }),
  year_of_completion: z.coerce
    .number()
    .min(1900, { message: 'Year must be after 1900' })
    .max(2024, { message: 'Year must be before 2024' }),
  phone: z.string().min(10, { message: 'Phone number is required' }),
  address: z.string().min(10, { message: 'Address is required' }),
  birthday: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' })
    .transform((val) => new Date(val)), // Convert string to Date object
  sex: z.enum(['male', 'female'], { message: 'Sex is required!' }),
  level_completed: z.enum(['PhD', 'Masters', 'Post Graduate Diploma'], {
    message: 'Student level is required!',
  }),
  img: z
    .instanceof(File, { message: 'File is required' })
    .refine(
      (file) => file && file.type === 'application/pdf',
      { message: 'Only PDF files are allowed' }
    ),
});

type Inputs = z.infer<typeof schema>;

const AlumniForm = ({ type, data }: { type: 'create' | 'update'; data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const file = watch('img'); // Watch the file input to display the selected file name

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>Create a new Alumni</h1>
      <span className='text-xs text-gray-400 font-medium'>Authentication Information</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputField
          label='Username'
          name='username'
          defaultValue={data?.username}
          register={register}
          error={errors.username}
        />
        <InputField
          label='Email'
          name='email'
          type='email'
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label='Password'
          name='password'
          type='password'
          defaultValue={data?.password}
          register={register}
          error={errors.password}
        />
      </div>
      <span className='text-xs text-gray-400 font-medium'>Personal Information</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputField
          label='First Name'
          name='firstName'
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label='Last Name'
          name='lastName'
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label='Year Of Completion'
          name='year_of_completion'
          type='number'
          defaultValue={data?.year_of_completion}
          register={register}
          error={errors.year_of_completion}
        />
        <InputField
          label='Phone'
          name='phone'
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label='Address'
          name='address'
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label='Birthday'
          name='birthday'
          type='date'
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
        />
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Level Completed</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('level_completed')}
            defaultValue={data?.level_completed}
          >
            <option value='PhD'>PhD</option>
            <option value='Masters'>Masters</option>
            <option value='Post Graduate Diploma'>Post Graduate Diploma</option>
          </select>
          {errors.level_completed?.message && (
            <p className='text-xs text-red-400'>{errors.level_completed.message.toString()}</p>
          )}
        </div>
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
          <label className='text-xs text-gray-500'>Sex</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('sex')}
            defaultValue={data?.sex}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          {errors.sex?.message && (
            <p className='text-xs text-red-400'>{errors.sex.message.toString()}</p>
          )}
        </div>
        <div className='flex flex-col gap-2 w-full md:w-1/4 justify-center'>
          <label className='text-xs text-gray-500 flex items-center gap-2 cursor-pointer' htmlFor='img'>
            <Image src='/upload.png' alt='' width={28} height={28} />
            <span>Upload Achievements</span>
          </label>
          <input
            type='file'
            id='img'
            {...register('img', {
              onChange: () => {
                trigger('img'); // Trigger validation when the file changes
              },
            })}
            className='hidden'
            accept='application/pdf'
          />
          {file && <p className='text-xs text-gray-500'>Selected file: {file.name}</p>}
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

export default AlumniForm;