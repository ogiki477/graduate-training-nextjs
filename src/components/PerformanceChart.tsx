"use client";
import React from 'react';
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
      name: 'Jan',
      Phd: 4000,
      Masters: 2400,
      PGD: 2300,
      
    },
    {
      name: 'Feb',
      Phd: 3000,
      Masters: 1398,
      PGD: 1050,
      
    },
    {
      name: 'Mar',
      Phd: 2000,
      Masters: 9800,
      PGD: 2341,
      
    },
    {
      name: 'Apr',
      Phd: 2780,
      Masters: 3908,
      PGD: 4322,
      
    },
    {
      name: 'May',
      Phd: 1890,
      Masters: 4800,
      PGD: 3432,
      
    },
    {
      name: 'June',
      Phd: 2390,
      Masters: 3800,
      PGD: 3278,
      
    },
    {
      name: 'July',
      Phd: 3490,
      Masters: 4342,
      PGD: 9763,
      
    },
    {
        name: 'Aug',
        Phd: 3490,
        Masters: 4300,
        PGD: 6432,
        
      },
      {
        name: 'Sep',
        Phd: 3490,
        Masters: 4700,
        PGD: 1231,
        
      },
      {
        name: 'Oct',
        Phd: 3490,
        Masters: 4250,
        PGD: 3444,
        
      },
      {
        name: 'Nov',
        Phd: 3330,
        Masters: 2300,
        PGD: 7711,
        
      },
      {
        name: 'Dec',
        Phd: 3490,
        Masters: 1300,
        PGD: 5353,
        
      },
  ];
  

const PerformanceChart = () => {
  return (
   <div className='bg-white rounded-xl w-full h-full p-4'>
         {/* TITLE */}
         <div className='flex justify-between items-center'>
           <h1 className='text-lg font-semibold'>Students Performance</h1>
           <Image src="/moreDark.png" alt='' width={20} height={20} />
         </div>
         <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd"/>
          <XAxis
            dataKey="name"
            interval={0} // Ensure all labels are displayed
            tick={{ fontSize: 12, fill: '#d1d5db' }}  // Adjust font size for better readability
            axisLine = {false}
            tickLine={false}
            tickMargin={10}
           />
          <YAxis  axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#d1d5db' }} tickMargin={10} />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
           />
          <Line type="monotone" dataKey="Phd" stroke="#8884d8" strokeWidth={4} />
          <Line type="monotone" dataKey="Masters" stroke="#82ca9d" strokeWidth={4}/>
          <Line type="monotone" dataKey="PGD" stroke="#FAE27C" strokeWidth={4}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PerformanceChart