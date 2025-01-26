import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, CreditCard, LifeBuoy, ArrowRight } from 'lucide-react';

export function QuickLinks() {
  const links = [
    {
      to: '/profile',
      icon: User,
      title: 'Profile',
      description: 'View and edit your details'
    },
    {
      to: '/bookings',
      icon: Calendar,
      title: 'Bookings',
      description: 'Manage your appointments'
    },
    {
      to: '/payment-methods',
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Update payment information'
    },
    {
      to: '/support',
      icon: LifeBuoy,
      title: 'Support',
      description: 'Get help when you need it'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
      <div className="space-y-3">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <Link
              key={index}
              to={link.to}
              className="group flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="p-2 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                  {link.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{link.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}