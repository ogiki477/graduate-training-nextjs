"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '@/components/InputField';

// Zod validation schema for Training form
const schema = z.object({
  module_name: z.string().min(3, { message: 'Module name must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  start_date: z.string().min(1, { message: 'Start date is required' }),
  end_date: z.string().min(1, { message: 'End date is required' }),
  duration_weeks: z.coerce.number().min(1, { message: 'Duration must be at least 1 week' }),
  activities: z.string().min(1, { message: 'Activities are required' }),
  is_completed: z.boolean(),
  course_id: z.number().min(1, { message: 'Course ID is required' }),
  university_id: z.number().min(1, { message: 'University ID is required' }),
});

type Inputs = z.infer<typeof schema>;

const TrainingForm = ({ type, data, onClose, onSuccess }: {
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
      ...data,
      is_completed: data?.is_completed || false,
    },
  });

  const [courses, setCourses] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/courses');
      const data = await response.json();
      setCourses(data.data);
    };

    fetchCourses();
  }, []);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/training_schedules', {
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
      console.log('Training schedule created successfully:', result);

      // Show success message
      setSuccessMessage('Training schedule created successfully!');

      // Close the form modal after 2 seconds
      setTimeout(() => {
        onClose(); // Close the modal
        onSuccess(); // Refresh the training schedules list
      }, 2000);
    } catch (error) {
      console.error('Error creating training schedule:', error);
      alert('Failed to create training schedule. Please try again.');
    }
  });

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>{type === 'create' ? 'Create a new Training Schedule' : 'Update Training Schedule'}</h1>
      <span className='text-xs text-gray-400 font-medium'>Training Information</span>
      <div className='flex justify-between gap-4 flex-wrap'>
        <InputField
          label='Module Name'
          name='module_name'
          defaultValue={data?.module_name}
          register={register}
          error={errors.module_name}
        />
        <InputField
          label='Description'
          name='description'
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />
        <InputField
          label='Start Date'
          name='start_date'
          type='date'
          defaultValue={data?.start_date}
          register={register}
          error={errors.start_date}
        />
        <InputField
          label='End Date'
          name='end_date'
          type='date'
          defaultValue={data?.end_date}
          register={register}
          error={errors.end_date}
        />
        <InputField
          label='Duration (Weeks)'
          name='duration_weeks'
          type='number'
          defaultValue={data?.duration_weeks}
          register={register}
          error={errors.duration_weeks}
        />
        <InputField
          label='Activities'
          name='activities'
          defaultValue={data?.activities}
          register={register}
          error={errors.activities}
        />
        <div className='flex flex-col gap-2 w-full'>
          <label className='text-xs text-gray-500'>Course</label>
          <select
            {...register('course_id', { valueAsNumber: true })}
            className='p-2 border border-gray-300 rounded-md'
          >
            <option value=''>Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.course_id && (
            <p className='text-xs text-red-400'>{errors.course_id.message}</p>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='is_completed'
            {...register('is_completed')}
          />
          <label htmlFor='is_completed' className='text-xs text-gray-500'>
            Is Completed
          </label>
        </div>
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

export default TrainingForm;