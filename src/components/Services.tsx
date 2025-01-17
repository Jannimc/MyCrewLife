import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { services } from '../data/services';

interface ServicesProps {
  activeService: any;
  setActiveService: (service: any) => void;
}

export function Services({ activeService, setActiveService }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState('residential');

  const categories = {
    residential: {
      title: "Residential Cleaning",
      services: services.home
    },
    moving: {
      title: "Moving Services",
      services: services.moving
    },
    commercial: {
      title: "Commercial Cleaning",
      services: services.commercial
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-white via-emerald-100 to-white py-24" id="services">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-medium mb-4 block">Professional & Reliable</span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Service</h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Tailored cleaning solutions to match your lifestyle and needs
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 space-x-1 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Category Content */}
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories[activeCategory as keyof typeof categories].services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="relative group transform transition-all duration-300 hover:scale-102 h-full"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
                  <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 h-full flex flex-col">
                    <div className="flex items-center mb-6">
                      <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white group-hover:scale-110 transition-transform duration-200">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-500 mb-6 flex-1">{service.description}</p>
                    
                    {/* Features list - always visible */}
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      <button className="mt-6 w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity duration-200 shadow-sm hover:shadow-md">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}