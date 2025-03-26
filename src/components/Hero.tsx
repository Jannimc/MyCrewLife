import React, { useState } from 'react';
import { Search, Star, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { PostcodeInput } from './common/PostcodeInput';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Professional Home Cleaning",
    subtitle: "Experience the difference of a truly clean home"
  },
  {
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Trusted & Reliable Service",
    subtitle: "Our experienced cleaners take pride in their work"
  },
  {
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Eco-Friendly Cleaning",
    subtitle: "Safe for your family and the environment"
  },
  {
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Attention to Detail",
    subtitle: "Every corner gets the attention it deserves"
  }
];

interface HeroProps {
  postcode: string;
  setPostcode: (postcode: string) => void;
  onGetQuote: () => void;
}

export function Hero({ postcode, setPostcode, onGetQuote }: HeroProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // UK postcode regex pattern
  const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;

  React.useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const validatePostcode = async (postcode: string) => {
    setIsValidating(true);
    setError(null);

    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}/validate`);
      const data = await response.json();
      
      if (data.result) {
        onGetQuote();
      } else {
        setError('Please enter a valid UK postcode');
      }
    } catch (err) {
      setError('Unable to verify postcode. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError(null);

    // Basic format validation
    if (!postcodeRegex.test(postcode)) {
      setError('Please enter a valid UK postcode');
      return;
    }

    // Validate against postcodes.io API
    validatePostcode(postcode);
  };

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
      {/* Slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-32 mx-auto max-w-7xl px-4 sm:mt-40 sm:px-6 lg:mt-48 lg:px-8">
            <div className="text-center">
              {/* Trustpilot-style Rating */}
              <div className="inline-flex items-center justify-center space-x-2 mb-6 bg-emerald-900/70 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="text-sm sm:text-base text-emerald-50 font-medium">Excellent</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 fill-current" />
                  ))}
                </div>
                <span className="text-sm sm:text-base text-emerald-50 font-medium">on Trustpilot</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-extrabold text-white mb-4 sm:mb-6">
                <span className="block">
                  {slides[currentSlide].title}
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl md:text-2xl text-gray-100 md:mt-5 md:max-w-3xl font-light">
                {slides[currentSlide].subtitle}
                <br />
                <span className="font-medium text-white">This is housework that works.</span>
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 max-w-md mx-auto">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200" />
                  <div className="relative flex flex-col sm:flex-row sm:items-stretch gap-2 sm:gap-0">
                    <div className="flex-1 min-w-0">
                      <PostcodeInput
                        value={postcode}
                        onChange={(value) => {
                          setPostcode(value);
                          setError(null);
                        }}
                        error={error}
                        isValidating={isValidating}
                      />
                    </div>
                    <div className="w-full sm:w-[180px] flex-shrink-0">
                      <button 
                        type="submit"
                        disabled={isValidating || !postcode}
                        className="w-full h-[56px] px-6 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg sm:rounded-l-none hover:opacity-90 transition-opacity duration-200 font-medium shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center"
                      >
                        {isValidating ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                          </div>
                        ) : (
                          'Find your cleaner'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="mt-2 flex items-center justify-center text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                  </div>
                )}
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}