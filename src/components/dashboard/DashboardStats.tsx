import React from 'react';
import { Calendar, Clock, Star, Sparkles } from 'lucide-react';
import { useUserData } from '../../hooks/useUserData';

export function DashboardStats() {
  const { stats, loading } = useUserData();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-200 rounded-lg h-12 w-12"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const stats_data = [
    {
      label: 'Next Cleaning',
      value: stats.nextCleaning ? formatDate(stats.nextCleaning.date) : 'No upcoming bookings',
      subtext: stats.nextCleaning ? stats.nextCleaning.time : 'Book your first cleaning',
      icon: Calendar,
      color: 'emerald'
    },
    {
      label: 'Total Bookings',
      value: stats.totalBookings.toString(),
      subtext: 'Last 12 months',
      icon: Clock,
      color: 'teal'
    },
    {
      label: 'Average Rating',
      value: stats.averageRating > 0 ? stats.averageRating.toString() : 'No ratings yet',
      subtext: stats.reviewCount > 0 ? `From ${stats.reviewCount} reviews` : 'Leave a review after your cleaning',
      icon: Star,
      color: 'emerald'
    },
    {
      label: 'Loyalty Points',
      value: stats.loyaltyPoints.toString(),
      subtext: `${stats.loyaltyTier} Member`,
      icon: Sparkles,
      color: 'teal'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats_data.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                <Icon className={`w-6 h-6 text-${stat.color}-500`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-semibold text-gray-900 mt-0.5">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{stat.subtext}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}