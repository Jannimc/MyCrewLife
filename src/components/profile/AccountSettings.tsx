import React, { useState } from 'react';
import { Lock, Bell } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AccountSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    marketing: true
  });
  const [isResetting, setIsResetting] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handlePasswordReset = async () => {
    setIsResetting(true);
    setResetError('');
    setResetSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        supabase.auth.getUser().then(({ data }) => data.user?.email || ''),
        { redirectTo: `${window.location.origin}/reset-password` }
      );

      if (error) throw error;
      setResetSuccess(true);
    } catch (err: any) {
      setResetError(err.message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Password & Security</h3>
          {resetSuccess && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
              Password reset email sent. Please check your inbox.
            </div>
          )}
          {resetError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              {resetError}
            </div>
          )}
          <button
            onClick={handlePasswordReset}
            disabled={isResetting}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {isResetting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 mr-2" />
            ) : (
              <Lock className="w-4 h-4 mr-2" />
            )}
            Reset Password
          </button>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
            <Bell className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">
                  {key === 'sms' ? 'SMS' : key} notifications
                </span>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                    value ? 'bg-emerald-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}