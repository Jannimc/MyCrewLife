import React from 'react';
import { Search, Star } from 'lucide-react';

interface HeroProps {
  postcode: string;
  setPostcode: (postcode: string) => void;
  onGetQuote: () => void;
}

export function Hero({ postcode, setPostcode, onGetQuote }: HeroProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode) {
      onGetQuote();
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/90" />
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.15]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="text-center">
              {/* Trustpilot-style Rating */}
              <div className="inline-flex items-center justify-center space-x-2 mb-6 bg-white/90 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="text-sm sm:text-base text-gray-600 font-medium">Excellent</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 fill-current" />
                  ))}
                </div>
                <span className="text-sm sm:text-base text-gray-600 font-medium">on Trustpilot</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-extrabold text-gray-900 mb-4 sm:mb-6">
                <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Brilliant local cleaners
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:text-2xl text-gray-500 md:mt-5 md:max-w-3xl font-light">
                5★ service. Vetted cleaners.
                <br className="hidden sm:block" />
                All managed online.
                <br />
                <span className="font-medium text-gray-700">This is housework that works.</span>
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 max-w-md mx-auto">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200" />
                  <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-0">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        className="block w-full pl-11 pr-4 py-4 border border-gray-200 rounded-lg sm:rounded-r-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm text-gray-900"
                        placeholder="Enter your postcode"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg sm:rounded-l-none hover:opacity-90 transition-opacity duration-200 font-medium shadow-lg hover:shadow-emerald-500/25"
                    >
                      Find your cleaner
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}