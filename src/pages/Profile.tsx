import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
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
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </button>

          <div className="space-y-6">
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
              <>
                <ProfileHeader user={user} />
                <PersonalInfo user={user} isEditing={isEditing} setIsEditing={setIsEditing} />
                <AccountSettings />
                <AddressManager />
                <ProfileFooter />
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}