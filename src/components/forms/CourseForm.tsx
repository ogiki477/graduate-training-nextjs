"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '../InputField'; // Assuming you have InputField for reusability

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
  university_id: z.coerce
    .number()
    .min(1, { message: 'University ID is required' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' }),
});

type Inputs = z.infer<typeof schema>;

const CourseForm = ({ type, data, onClose, onSuccess }: { 
  type: 'create' | 'update'; 
  data?: any; 
  onClose: () => void; 
  onSuccess: () => void; 
}) => {
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

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      // Make a POST request to the Laravel backend
      const response = await fetch('http://localhost:8000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Course created successfully:', result);

      // Show success message
      setSuccessMessage('Course created successfully!');

      // Close the form modal after 2 seconds
      setTimeout(() => {
        onClose(); // Close the modal
        onSuccess(); // Refresh the course list
      }, 500);
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course. Please try again.');
    }
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
      </div>
      <button className='bg-blue-400 text-white p-2 rounded-md'>
        {type === 'create' ? 'Create' : 'Update'}
      </button>

      {/* Success Message */}
      {successMessage && (
        <div className='fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md'>
          {successMessage}
        </div>
      )}
    </form>
  );
};

export default CourseForm;