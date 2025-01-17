import React, { useState } from 'react';
import { Search, Star, Calendar, Clock, UserCheck } from 'lucide-react';

function App() {
  const [postcode, setPostcode] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                CleanConnect
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#how" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                How it works
              </a>
              <a href="#professionals" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Professionals
              </a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Services
              </a>
              <a href="#reviews" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Reviews
              </a>
              <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                Log in
              </button>
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-blue-500/25 text-sm font-medium">
                Get a quote
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center" />
        <div className="max-w-7xl mx-auto relative">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="text-center">
                {/* Trustpilot-style Rating */}
                <div className="inline-flex items-center justify-center space-x-2 mb-8 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                  <span className="text-gray-600 font-medium">Excellent</span>
                  <div className="flex animate-pulse">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-green-500 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">on Trustpilot</span>
                </div>

                <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl mb-6">
                  <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Brilliant local cleaners
                  </span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-5 md:max-w-3xl font-light">
                  5★ service. Vetted cleaners. All managed online.
                  <br />
                  <span className="font-medium text-gray-700">This is housework that works.</span>
                </p>

                {/* Search Bar */}
                <div className="mt-10 max-w-md mx-auto">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200" />
                    <div className="relative flex">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        className="block w-full pl-11 pr-32 py-4 border border-gray-200 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-gray-900"
                        placeholder="Enter your postcode"
                      />
                      <button className="absolute inset-y-0 right-0 px-8 py-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-blue-500/25">
                        Find your cleaner
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Featured In Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-lg mb-12 font-medium">We've featured in</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 w-full max-w-xs">
                <img src="https://images.unsplash.com/photo-1622473590773-f588134b6ce7?auto=format&fit=crop&w=200&q=80" alt="The Guardian" className="h-12 object-contain mx-auto filter grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 w-full max-w-xs">
                <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=200&q=80" alt="The Times" className="h-12 object-contain mx-auto filter grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 w-full max-w-xs">
                <img src="https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&w=200&q=80" alt="Clean & Tidy Award" className="h-12 object-contain mx-auto filter grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how" className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-16">
                Hassle-free house cleans
              </h2>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                {[
                  {
                    icon: Calendar,
                    title: "Book online",
                    description: "Select your service, choose your schedule, and book instantly"
                  },
                  {
                    icon: UserCheck,
                    title: "Meet your cleaner",
                    description: "We'll match you with a trusted, experienced cleaner"
                  },
                  {
                    icon: Clock,
                    title: "Manage everything",
                    description: "Reschedule, skip, or cancel visits easily through our platform"
                  }
                ].map((step, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-200" />
                    <div className="relative bg-white p-8 rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-200">
                      <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-blue-600 text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                        <step.icon className="h-7 w-7" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                      <p className="text-gray-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Company",
                  links: [
                    { name: "About", href: "#about" },
                    { name: "Careers", href: "#careers" },
                    { name: "Contact", href: "#contact" }
                  ]
                },
                {
                  title: "Services",
                  links: [
                    { name: "Regular cleaning", href: "#regular" },
                    { name: "Deep cleaning", href: "#deep" },
                    { name: "End of tenancy", href: "#end" }
                  ]
                },
                {
                  title: "Legal",
                  links: [
                    { name: "Privacy", href: "#privacy" },
                    { name: "Terms", href: "#terms" }
                  ]
                },
                {
                  title: "Social",
                  links: [
                    { name: "Facebook", href: "#facebook" },
                    { name: "Instagram", href: "#instagram" },
                    { name: "Twitter", href: "#twitter" }
                  ]
                }
              ].map((section, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-base text-gray-500 hover:text-blue-600 transition-colors duration-200"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-12 border-t border-gray-200 pt-8">
              <p className="text-base text-gray-400 text-center">
                © 2024 CleanConnect. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;