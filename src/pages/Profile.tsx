import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { PageLayout } from '../components/layout/PageLayout';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { PersonalInfo } from '../components/profile/PersonalInfo';
import { AccountSettings } from '../components/profile/AccountSettings';
import { AddressManager } from '../components/profile/AddressManager';
import { ProfileFooter } from '../components/profile/ProfileFooter';
import { useAuth } from '../hooks/useAuth';
import { useUserData } from '../hooks/useUserData';

export function Profile() {
  const { user } = useAuth();
  const { loading } = useUserData();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <MainLayout>
      <PageLayout
        title="Profile"
        subtitle="Manage your personal information and preferences"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Header */}
          <div className="lg:col-span-3">
            <ProfileHeader user={user} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
          {loading ? (
            // Loading skeleton
            <>
              <div className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
                  <div className="w-full max-w-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                  </div>
                </div>
              </div>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-10 bg-gray-200 rounded w-full"></div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="space-y-6">
              <PersonalInfo user={user} isEditing={isEditing} setIsEditing={setIsEditing} />
              <AddressManager />
            </div>
          )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AccountSettings />
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h2>
              <div className="space-y-4">
                <p className="text-gray-600">Complete your profile to get the most out of MyCrew:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                    Add a profile photo
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                    Verify your email
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                    Add a phone number
                  </li>
                </ul>
              </div>
            </div>
            <ProfileFooter />
          </div>
        </div>
      </PageLayout>
    </MainLayout>
  );
}