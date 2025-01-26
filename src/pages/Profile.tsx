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

export function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return null; // Handle unauthorized access
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
            <ProfileHeader user={user} />
            <PersonalInfo user={user} isEditing={isEditing} setIsEditing={setIsEditing} />
            <AccountSettings />
            <AddressManager />
            <ProfileFooter />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}