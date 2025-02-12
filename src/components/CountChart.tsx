"use client";
import React from 'react';
import Image from 'next/image';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Total',
    count: 100,
    fill: 'white',
  },
  {
    name: 'PGD',
    count: 50,
    fill: '#C3EBFA',
  },
  {
    name: 'Masters',
    count: 30,
    fill: '#FAE27C',
  },
  {
    name: 'PhD',
    count: 20,
    fill: '#CFCEFF',
  },
];

const CountChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
      {/* TITLE */}
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold'>Students</h1>
        <Image src="/moreDark.png" alt='' width={20} height={20} />
      </div>

      {/* CHART */}
      <div className='relative w-full h-[75%]'>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar
              background
              dataKey="count" // Use the correct dataKey
              fill="#8884d8" // Fallback fill color (optional)
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image src="/graduation.png" 
        alt='' 
        width={50} height={50} 
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
      </div>

      {/* BOTTOM */}
      <div className='flex justify-center gap-16'>
        <div className='flex flex-col gap-1'>
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className='font-bold'>1200</h1>
          <h2 className='text-xs text-gray-300'>PGD(50%)</h2>
        </div>

        <div className='flex flex-col gap-1'>
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className='font-bold'>1200</h1>
          <h2 className='text-xs text-gray-300'>Masters(30%)</h2>
        </div>

        <div className='flex flex-col gap-1'>
          <div className="w-5 h-5 bg-lamaPurple rounded-full" />
          <h1 className='font-bold'>1200</h1>
          <h2 className='text-xs text-gray-300'>PhD(20%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;