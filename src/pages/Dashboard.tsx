import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { useUserData } from '../hooks/useUserData';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { QuickLinks } from '../components/dashboard/QuickLinks';
import { RecentActivity } from '../components/dashboard/RecentActivity';

export function Dashboard() {
  const { user } = useAuth();
  const { profile, loading } = useUserData();
  const navigate = useNavigate();

  // Use useEffect for navigation instead of doing it directly in the component body
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // If user is not authenticated, return null (the useEffect will handle navigation)
  if (!user) {
    return null;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {loading ? (
                    <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
                  ) : (
                    <>Welcome back, {profile?.full_name || user.email?.split('@')[0]}!</>
                  )}
                </h1>
                <p className="text-gray-500 mt-1">Here's what's happening with your cleaning services</p>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <DashboardStats />
              <RecentActivity />
            </div>

            {/* Quick Links Sidebar */}
            <div className="space-y-6">
              <QuickLinks />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}