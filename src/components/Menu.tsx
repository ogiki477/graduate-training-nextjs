import Link from 'next/link';
import Image from 'next/image';
const menuItems = [
  
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        visible: ["admin", "supervisor", "student", "alumni"],
      },
      
      {
        icon: "/supervisor1.png",
        label: "Supervisors",
        href: "/list/supervisors",
        visible: ["admin", "supervisor"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "supervisor"],
      },
      {
        icon: "/alumni.png",
        label: "Alumnis",
        href: "/list/alumnis",
        visible: ["admin", "supervisor"],
      },
      // {
      //   icon: "/subject.png",
      //   label: "Subjects",
      //   href: "/list/subjects",
      //   visible: ["admin"],
      // },
      // {
      //   icon: "/class.png",
      //   label: "Classes",
      //   href: "/list/classes",
      //   visible: ["admin", "supervisor"],
      // },
      // {
      //   icon: "/lesson.png",
      //   label: "Lessons",
      //   href: "/list/lessons",
      //   visible: ["admin", "supervisor"],
      // },
      // {
      //   icon: "/exam.png",
      //   label: "Exams",
      //   href: "/list/exams",
      //   visible: ["admin", "supervisor", "student", "alumni"],
      // },
      // {
      //   icon: "/assignment.png",
      //   label: "Assignments",
      //   href: "/list/assignments",
      //   visible: ["admin", "supervisor", "student", "alumni"],
      // },
      // {
      //   icon: "/result.png",
      //   label: "Results",
      //   href: "/list/results",
      //   visible: ["admin", "supervisor", "student", "alumni"],
      // },
      // {
      //   icon: "/attendance.png",
      //   label: "Attendance",
      //   href: "/list/attendance",
      //   visible: ["admin", "supervisor", "student", "alumni"],
      // },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "supervisor", "student", "alumni"],
      },
      // {
      //   icon: "/message.png",
      //   label: "Messages",
      //   href: "/list/messages",
      //   visible: ["admin", "supervisor", "student", "alumni"],
      // },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "supervisor", "student", "alumni"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "supervisor", "student", "alumni"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "supervisor", "student", "alumni"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "supervisor", "student", "alumni"],
      },
    ],
  },
];

import React from 'react'
import { role } from '@/lib/data';

const Menu = () => {
  return (
    <div className='mt-4 text-sm'>
      {menuItems.map((menu) => (
        <div key={menu.title} className="flex flex-col gap-2">
          <span className="hidden lg:block text-gray-400 font-light my-4">{menu.title}</span>
          {menu.items.map((item) => {
            if(item.visible.includes(role)){
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className='flex items-center md:px-2 justify-center lg:justify-start gap-4 text-gray-500 py-2 rounded-md hover:bg-lamaSkyLight'
                >
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                  <span className='hidden lg:block'>{item.label}</span>
                </Link>
                
    
              )
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu