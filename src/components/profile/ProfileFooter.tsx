import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, FileText, Shield, ExternalLink } from 'lucide-react';

export function ProfileFooter() {
  const links = [
    { 
      icon: HelpCircle, 
      label: 'Support', 
      href: '/support',
      description: 'Get help with your account and services'
    },
    { 
      icon: FileText, 
      label: 'FAQ', 
      href: '/faq',
      description: 'Find answers to common questions'
    },
    { 
      icon: Shield, 
      label: 'Privacy', 
      href: '/privacy',
      description: 'Learn how we protect your data'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <Link
            key={index}
            to={link.href}
            className="group flex flex-col p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg group-hover:scale-110 transition-transform duration-200 inline-block">
                <Icon className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                  {link.label}
                </h3>
                <ExternalLink className="w-4 h-4 ml-2 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" />
              </div>
              <p className="text-sm text-gray-600">{link.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}