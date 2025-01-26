import React from 'react';
import { Calendar, Clock, Star, Sparkles } from 'lucide-react';

export function DashboardStats() {
  const stats = [
    {
      label: 'Next Cleaning',
      value: 'March 15, 2024',
      subtext: '9:00 AM',
      icon: Calendar,
      color: 'emerald'
    },
    {
      label: 'Total Bookings',
      value: '12',
      subtext: 'Last 12 months',
      icon: Clock,
      color: 'teal'
    },
    {
      label: 'Average Rating',
      value: '4.9',
      subtext: 'From 8 reviews',
      icon: Star,
      color: 'emerald'
    },
    {
      label: 'Loyalty Points',
      value: '250',
      subtext: 'Silver Member',
      icon: Sparkles,
      color: 'teal'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, index) => {
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