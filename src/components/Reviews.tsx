import React from 'react';
import { Star, Quote } from 'lucide-react';
import { reviews } from '../data/reviews';

export function Reviews() {
  return (
    <div className="relative bg-gradient-to-b from-white via-emerald-100 to-white py-16 sm:py-24" id="reviews">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-medium mb-4 block">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-500">Real reviews from satisfied customers</p>
        </div>

        {/* Reviews Grid - Single column on mobile, multi-column on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
              <div className="relative bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                  />
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 fill-current" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 text-emerald-200 transform -scale-x-100" />
                  <p className="text-sm sm:text-base text-gray-600 relative z-10 pl-4 sm:pl-6">{review.review}</p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}