import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: 'Zoles Punkti',
  description: 'Panelis',
};

export default function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      <div className='flex h-screen overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-hidden pt-16'>{children}</main>
        <Toaster />
      </div>
    </>
  );
}
