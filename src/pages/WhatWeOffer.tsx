import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Home, Sparkles, Brush, Key, Box, Building, SprayCan, Hammer, Store, CheckCircle2, Star } from 'lucide-react';
import { services } from '../data/services';

export function WhatWeOffer() {
  const allServices = [...services.home, ...services.moving, ...services.commercial];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-emerald-50 via-white to-white py-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Professional Cleaning Services
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                From regular home cleaning to specialized commercial services, we offer comprehensive solutions tailored to your needs.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
                  <div className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white group-hover:scale-110 transition-transform duration-200">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="ml-4 text-xl font-semibold text-gray-900">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-b from-white via-emerald-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Why Choose MyCrew</h2>
              <p className="mt-4 text-lg text-gray-600">Experience the difference of professional cleaning services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Professional Staff",
                  description: "Our cleaners undergo rigorous training and background checks",
                  features: ["Fully trained", "Background checked", "Insured", "Uniformed staff"]
                },
                {
                  title: "Quality Guarantee",
                  description: "100% satisfaction guaranteed or we'll re-clean for free",
                  features: ["Quality control", "Satisfaction guarantee", "Consistent results", "Attention to detail"]
                },
                {
                  title: "Flexible Service",
                  description: "Customizable cleaning plans to fit your schedule and needs",
                  features: ["24/7 booking", "Flexible scheduling", "Custom cleaning plans", "Regular or one-off service"]
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-8 h-8 text-emerald-500" />
                    <h3 className="ml-3 text-xl font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <ul className="space-y-3">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Ready to experience the difference?
                  </h2>
                  <p className="mt-3 max-w-lg text-lg text-emerald-100">
                    Get started with your personalized cleaning plan today.
                  </p>
                </div>
                <div className="mt-8 lg:mt-0 lg:ml-8">
                  <div className="inline-flex rounded-lg shadow">
                    <button
                      onClick={() => window.location.href = '/quote'}
                      className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-emerald-600 bg-white hover:bg-emerald-50 transition-colors duration-200"
                    >
                      Get a Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}