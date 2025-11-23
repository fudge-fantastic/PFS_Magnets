import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Skeleton } from '../ui/skeleton';

interface AdminLayoutProps {
  title?: string;
}

export function AdminLayout({ title }: AdminLayoutProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/admin/login');
      } else if (!isAdmin) {
        navigate('/');
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <div className="w-64 border-r border-gray-200 bg-white p-4">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="h-16 border-b border-gray-200 bg-white px-6 flex items-center">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="flex-1 p-6">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
