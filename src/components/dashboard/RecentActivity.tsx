import React from 'react';
import { Calendar, MapPin, Star, ArrowRight } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      type: 'upcoming',
      date: 'March 15, 2024',
      time: '9:00 AM',
      address: '123 Main St, London SW1A 1AA',
      service: 'Regular Cleaning',
      cleaner: 'Sarah Johnson'
    },
    {
      type: 'completed',
      date: 'March 1, 2024',
      time: '2:00 PM',
      address: '456 Park Ave, London E1 6AN',
      service: 'Deep Cleaning',
      cleaner: 'Michael Brown',
      rating: 5
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <button
          onClick={() => {}}
          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
            <div className="relative bg-white rounded-xl border border-gray-200 p-4 hover:border-emerald-200 transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-base font-medium text-gray-900">
                    {activity.service}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {activity.type === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </span>
                </div>
                {activity.type === 'completed' && activity.rating && (
                  <div className="flex items-center">
                    {[...Array(activity.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-emerald-500 fill-current" />
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                    <span className="text-sm">{activity.date} at {activity.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                    <span className="text-sm truncate">{activity.address}</span>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  {activity.type === 'upcoming' ? (
                    <button className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700">
                      View Details
                    </button>
                  ) : (
                    <button className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700">
                      Book Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}