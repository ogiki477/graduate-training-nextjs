import Link from 'next/link';
import Image from 'next/image';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDEBAR */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-white border-r border-gray-200 fixed h-screen overflow-y-auto scrollbar-hide">
        <Link href="/" className="flex items-center justify-center lg:justify-start gap-2 h-11 m-1 p-4">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block">GTTS</span>
        </Link>
        <Menu />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] ml-[14%] md:ml-[8%] lg:ml-[16%] xl:ml-[14%] overflow-y-auto">
        <Navbar />
        {children}
      </div>
    </div>
  );
}