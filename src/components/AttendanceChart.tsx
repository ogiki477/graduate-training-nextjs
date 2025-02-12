"use client";
import React from 'react';
import Image from 'next/image';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', present: 40, absent: 24 },
  { name: 'Tue', present: 30, absent: 13 },
  { name: 'Wed', present: 20, absent: 98 },
  { name: 'Thur', present: 27, absent: 39 },
  { name: 'Fri', present: 18, absent: 48 },
  { name: 'Sat', present: 21, absent: 51 },
  { name: 'Sun', present: 77, absent: 22 },
];

const AttendanceChart = () => {
  return (
    <div className='bg-white rounded-lg p-4 h-full'>
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-lg font-semibold'>Students Attendance</h1>
        <Image src="/moreDark.png" alt='' width={20} height={20} />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd' />
          <XAxis
            dataKey="name"
            interval={0} // Ensure all labels are displayed
            tick={{ fontSize: 12, fill: '#d1d5db' }}  // Adjust font size for better readability
            axisLine = {false}
            tickLine={false}
            
          />
          <YAxis  axisLine={false} tickLine={false}/>
          <Tooltip />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
          />
          <Bar
            dataKey="present"
            fill="#C3EBFA"
            radius={[10,10,0,0]}
            legendType="circle"
          />
          <Bar
            dataKey="absent"
            fill="#FAE27C"
            radius={[10,10,0,0]}
            legendType="circle"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;