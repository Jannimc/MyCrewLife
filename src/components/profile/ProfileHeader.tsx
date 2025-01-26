import React, { useState, useRef } from 'react';
import { Camera, Check, X } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    const fields = [
      user.user_metadata?.avatar_url,
      user.user_metadata?.full_name,
      user.user_metadata?.phone,
      user.email
    ];
    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const completionPercentage = calculateCompletion();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      
      if (!fileExt || !allowedExtensions.includes(fileExt)) {
        throw new Error('Invalid file type. Please upload a JPG, PNG, or GIF image.');
      }

      // Create a folder structure with user ID for better organization
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload the new image
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update user metadata with new avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;

      // Delete old avatar if exists
      const oldAvatarUrl = user.user_metadata?.avatar_url;
      if (oldAvatarUrl) {
        const oldFileName = oldAvatarUrl.split('/').pop();
        if (oldFileName) {
          await supabase.storage
            .from('avatars')
            .remove([`${user.id}/${oldFileName}`]);
        }
      }

    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-200 hover:shadow-xl">
      {/* Enhanced header background with pattern */}
      <div className="relative h-32 bg-gradient-to-r from-emerald-600 to-teal-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>

      <div className="relative px-6 pb-6">
        {/* Profile picture section */}
        <div className="flex flex-col items-center -mt-16">
          <div 
            className="relative group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
              <img
                src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}&background=10B981&color=fff`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-full transition-all duration-200 ${
                isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              {isUploading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white" />
              ) : (
                <Camera className="w-8 h-8 text-white" />
              )}
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {error && (
            <div className="mt-2 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          {/* Profile completion indicator */}
          <div className="mt-4 w-full max-w-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Profile Completion</span>
              <span className="text-sm font-medium text-emerald-600">{completionPercentage}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            {user.user_metadata?.full_name || user.email}
          </h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
}