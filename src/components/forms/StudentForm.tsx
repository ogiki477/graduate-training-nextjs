"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '../InputField';
import Image from 'next/image';

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be at most 20 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  firstName: z.string().min(3, { message: 'First name is required' }),
  lastName: z.string().min(3, { message: 'Last name is required' }),
  phone: z.string().min(10, { message: 'Phone number is required' }),
  address: z.string().min(10, { message: 'Address is required' }),
  birthday: z.coerce.date({ message: 'Birthday is required' }),
  sex: z.enum(['male', 'female'], { message: 'Sex is required!' }),
  level: z.enum(['PhD', 'Masters', 'Post Graduate Diploma'], { message: 'Student level is required!' }),
  img: z.instanceof(File, { message: 'Image is required' }),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({ type, data }: { type: 'create' | 'update'; data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      level: data?.level || 'PhD', // Set default value for level
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>Create a new Student</h1>
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
          <label className='text-xs text-gray-500'>Student Level</label>
          <select
            className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
            {...register('level')}
            defaultValue={data?.level || 'PhD'} // Ensure default value matches Zod enum
          >
            <option value='PhD'>PhD</option>
            <option value='Masters'>Masters</option>
            <option value='Post Graduate Diploma'>Post Graduate Diploma</option>
          </select>
          {errors.level?.message && (
            <p className='text-xs text-red-400'>{errors.level.message.toString()}</p>
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
            <span>Upload a photo</span>
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

export default StudentForm;