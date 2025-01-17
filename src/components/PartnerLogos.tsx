import React from 'react';
import { partnerLogos } from '../data/partnerLogos';

export function PartnerLogos() {
  return (
    <div className="bg-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-lg font-medium text-gray-600 mb-8">
          Trusted by leading brands
        </p>
        <div className="relative">
          {/* Gradient overlays for seamless loop effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Scrolling container */}
          <div className="overflow-hidden relative">
            <div className="flex space-x-12 animate-scroll hover:pause">
              {/* First set of logos */}
              {partnerLogos.map((logo, index) => (
                <div
                  key={`logo-1-${index}`}
                  className="flex-none grayscale hover:grayscale-0 transition-all duration-200"
                  style={{ height: '50px', minWidth: '120px' }}
                >
                  <img
                    src={logo.url}
                    alt={`${logo.name} logo`}
                    className="h-full w-auto object-contain"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partnerLogos.map((logo, index) => (
                <div
                  key={`logo-2-${index}`}
                  className="flex-none grayscale hover:grayscale-0 transition-all duration-200"
                  style={{ height: '50px', minWidth: '120px' }}
                >
                  <img
                    src={logo.url}
                    alt={`${logo.name} logo`}
                    className="h-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}