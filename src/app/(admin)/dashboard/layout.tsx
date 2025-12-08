
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Sidebar from '../../../components/layout/Sidebar';
import DashboardNavbar from '@/components/layout/DashboardNavbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

   const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/"); 
  }
  return (
     <div className="flex min-h-screen">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
        {/* TOP NAVBAR (ALWAYS VISIBLE) */}
        <DashboardNavbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <MobileBottomNav />
    </div>
  );
}
