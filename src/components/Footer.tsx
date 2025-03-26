import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const sections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about-us" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "/support" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Regular cleaning", href: "/what-we-offer" },
        { name: "Deep cleaning", href: "/what-we-offer" },
        { name: "End of tenancy", href: "/what-we-offer" }
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
        { name: "Facebook", href: "https://www.facebook.com" },
        { name: "Instagram", href: "https://www.instagram.com" },
        { name: "Twitter", href: "https://www.twitter.com" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-sm sm:text-base text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm sm:text-base text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 sm:mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-400 text-center">
            © 2024 MyCrew. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}