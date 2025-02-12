"use client";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Image from 'next/image';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const events = [
    {
        id: 1,
        title: 'Thesis Defense',
        time: '2:00 PM - 4:00 PM',
        description: 'Thesis defense for the PhD students',
    },
    {
        id: 2,
        title: 'Proposal Submission',
        time: '10:00 AM - 12:00 PM',
        description: 'Submission of proposals for the Master students in Room 3A ',
    },
    {
        id: 3,
        title: 'Seminar',
        time: '8:00 AM - 4:00 PM',
        description: 'Seminar on the topic "The Future of AI" in the main Hall for All Students',
    }  
]


const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
        <Calendar onChange={onChange} value={value} />
        <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold my-4 '>Events</h1>
            <Image src="/moreDark.png" alt="" width={20} height={20}></Image>
        </div>
        <div className='flex flex-col gap-4'>
            {events.map(event=>(
                <div className='' key={event.id}>
                    <div className='flex items-center justify-between'>
                        <h1>{event.title}</h1>
                        <span>{event.time}</span>
                    </div>
                    <p>{event.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EventCalendar