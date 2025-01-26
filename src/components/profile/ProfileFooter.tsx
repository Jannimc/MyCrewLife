import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, FileText, Shield, ExternalLink } from 'lucide-react';

export function ProfileFooter() {
  const links = [
    { 
      icon: HelpCircle, 
      label: 'Support', 
      href: '/support',
      description: 'Get help with your account'
    },
    { 
      icon: FileText, 
      label: 'FAQ', 
      href: '/faq',
      description: 'Common questions answered'
    },
    { 
      icon: Shield, 
      label: 'Privacy', 
      href: '/privacy',
      description: 'Your data protection'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <Link
            key={index}
            to={link.href}
            className="group flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex-shrink-0 mr-4">
              <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg group-hover:scale-110 transition-transform duration-200">
                <Icon className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                  {link.label}
                </span>
                <ExternalLink className="w-4 h-4 ml-1 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" />
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{link.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}