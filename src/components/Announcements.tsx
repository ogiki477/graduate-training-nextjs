import React from 'react';

const announcements = [
  {
    title: 'Upcoming Semester Registration Now Open!',
    date: '13-02-2025',
    description: 'All students are reminded to complete their course registration for the upcoming semester before the deadline on March 15.',
    bgColor: 'bg-lamaSkyLight',
  },
  {
    title: 'Mid-Semester Exams Timetable Released',
    date: '13-02-2025',
    description: 'The mid-semester exams timetable is now available on the university portal. Please check your exam schedule and prepare accordingly.',
    bgColor: 'bg-lamaYellow',
  },
  {
    title: 'University Wi-Fi Maintenance Scheduled',
    date: '13-02-2025',
    description: 'There will be scheduled maintenance on the university Wi-Fi network on February 20 from 10 PM to 2 AM. Expect intermittent connectivity during this period.',
    bgColor: 'bg-lamaYellowLight',
  }
];

const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-500 cursor-pointer hover:underline">View All</span>
      </div>

      {/* Announcements List */}
      <div className="flex flex-col gap-4 mt-4">
        {announcements.map((announcement, index) => (
          <div key={index} className={`${announcement.bgColor} rounded-md p-4`}>
            {/* Title & Date */}
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-lg font-medium">{announcement.title}</h1>
              <span className="text-xs text-gray-500 bg-white rounded-md px-2 py-1">{announcement.date}</span>
            </div>
            {/* Description */}
            <p className="text-xs text-gray-600">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
