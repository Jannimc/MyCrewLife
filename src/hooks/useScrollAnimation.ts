import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once the animation is triggered, we can stop observing this element
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, {
      root: null, // Use viewport as root
      threshold: 0.1, // Trigger when at least 10% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Slightly offset the trigger point
    });

    // Get all elements with scroll-fade-in class
    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
}