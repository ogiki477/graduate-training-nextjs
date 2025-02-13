"use client";
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import { calendarEvents } from '@/lib/data';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const localizer = momentLocalizer(moment)

const BigCalendar = () => {
    const [view, setview] = useState<View>(Views.DAY);
    const handleOnChangeView = (selectedView: View) => {
        setview(selectedView);
    }
  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["day","week"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 0, 1, 8, 0)}
      max={new Date(2025, 0, 1, 22, 0)}
    />
  );
    
 
};
export default BigCalendar;