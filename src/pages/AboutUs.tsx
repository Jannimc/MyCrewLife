import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { ArrowRight, Award, Users, Clock, Shield, Star, Heart, Globe, Leaf, UserCheck, Sparkles, Trophy, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AboutUs() {
  const navigate = useNavigate();
  
  const handleGetQuote = () => {
    navigate('/quote');
  };

  // Team members data
  const teamMembers = [
    {
      name: "Emma Richardson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Emma founded MyCrew in 2018 after experiencing firsthand the challenges of finding reliable cleaning services. With a background in hospitality management and a passion for exceptional service, she built MyCrew on the principles of trust, quality, and customer satisfaction."
    },
    {
      name: "James Wilson",
      role: "Operations Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "With over 15 years of experience in operations management, James oversees all cleaning operations and ensures our high standards are maintained. He's passionate about creating efficient systems that deliver consistent results for our customers."
    },
    {
      name: "Sarah Chen",
      role: "Head of Training",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Sarah leads our comprehensive training program, ensuring every cleaner meets our exacting standards. Her background in hospitality and education helps her develop effective training methods that focus on attention to detail and customer service excellence."
    },
    {
      name: "Michael Thompson",
      role: "Customer Experience Manager",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Michael ensures every customer interaction exceeds expectations. With a background in luxury hospitality, he's dedicated to creating memorable experiences and building lasting relationships with our clients."
    }
  ];

  // Timeline/milestones data
  const milestones = [
    {
      year: "2018",
      title: "MyCrew Founded",
      description: "Started with just 5 cleaners serving Central London"
    },
    {
      year: "2019",
      title: "Expanded to Greater London",
      description: "Grew our team to 50+ professional cleaners"
    },
    {
      year: "2020",
      title: "Launched Online Platform",
      description: "Introduced our digital booking system for seamless service"
    },
    {
      year: "2021",
      title: "Eco-Friendly Initiative",
      description: "Transitioned to 100% environmentally friendly cleaning products"
    },
    {
      year: "2022",
      title: "Quality Certification",
      description: "Received ISO 9001 certification for quality management"
    },
    {
      year: "2023",
      title: "Community Program Launch",
      description: "Started our 'Clean Homes, Clean Communities' initiative"
    },
    {
      year: "2024",
      title: "National Expansion",
      description: "Began operations in Manchester, Birmingham, and Edinburgh"
    }
  ];

  // Values data
  const values = [
    {
      icon: Shield,
      title: "Trust & Reliability",
      description: "We build lasting relationships through consistent, dependable service."
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We strive for perfection in every cleaning task, no matter how small."
    },
    {
      icon: Heart,
      title: "Care",
      description: "We treat every home and office as if it were our own."
    },
    {
      icon: Globe,
      title: "Integrity",
      description: "We operate with honesty and transparency in all we do."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We're committed to environmentally responsible cleaning practices."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in giving back to the communities we serve."
    }
  ];

  // Stats data with icons
  const stats = [
    { value: "200+", label: "Professional Cleaners", icon: UserCheck },
    { value: "50,000+", label: "Completed Cleanings", icon: Sparkles },
    { value: "4.9/5", label: "Customer Rating", icon: Trophy },
    { value: "95%", label: "Retention Rate", icon: Percent }
  ];

  return (
    <MainLayout onGetQuote={handleGetQuote}>
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-emerald-50 via-white to-white py-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                About MyCrew
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                We're on a mission to transform the cleaning industry with exceptional service, trusted professionals, and innovative technology.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="transform transition-all duration-500 hover:translate-y-[-8px]">
              <span className="text-emerald-600 font-medium mb-2 block">Our Story</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">From Small Beginnings to London's Trusted Cleaning Service</h2>
              <div className="space-y-4 text-gray-600">
                <p className="transform transition-all duration-300 hover:translate-x-2">
                  MyCrew was born in 2018 from a simple observation: finding reliable, high-quality cleaning services was unnecessarily difficult. Our founder, Emma Richardson, experienced this frustration firsthand and decided to create a solution.
                </p>
                <p className="transform transition-all duration-300 hover:translate-x-2">
                  Starting with just five carefully selected cleaners serving Central London, we focused on three core principles: exceptional cleaning quality, reliable service, and transparent pricing. Word quickly spread about our attention to detail and trustworthy cleaners.
                </p>
                <p className="transform transition-all duration-300 hover:translate-x-2">
                  Today, MyCrew has grown to a team of over 200 professional cleaners serving all of Greater London and expanding to other major UK cities. Despite our growth, we maintain the same commitment to quality and personal service that defined us from day one.
                </p>
                <p className="transform transition-all duration-300 hover:translate-x-2">
                  Our innovative booking platform makes scheduling effortless, while our rigorous vetting and training ensure every cleaner meets our exacting standards. We're proud to have built a service that thousands of homes and businesses rely on daily.
                </p>
              </div>
            </div>
            <div className="relative transform transition-all duration-500 hover:scale-105">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25"></div>
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="MyCrew team" 
                className="relative rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-gradient-to-b from-white via-emerald-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 transform transition-all duration-500 hover:translate-y-[-8px]">
              <span className="text-emerald-600 font-medium mb-2 block">Our Values</span>
              <h2 className="text-3xl font-bold text-gray-900">What Drives Us Every Day</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                These core principles guide everything we do, from how we train our team to how we interact with our customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 transform hover:translate-y-[-8px]">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h3 className="ml-3 text-lg font-semibold text-gray-900">{value.title}</h3>
                    </div>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Our Journey Timeline */}
        <div className="relative py-16 overflow-hidden">
          {/* Background pattern similar to homepage */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-70" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12 transform transition-all duration-500 hover:translate-y-[-8px]">
              <span className="text-emerald-600 font-medium mb-2 block">Our Journey</span>
              <h2 className="text-3xl font-bold text-gray-900">Key Milestones</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                From our humble beginnings to where we are today, these are the moments that shaped MyCrew.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200 z-0"></div>
              
              <div className="relative z-10">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`mb-8 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-5/12 ${index % 2 !== 0 ? 'order-1' : 'order-none'}`}>
                      <div className="relative group transform transition-all duration-300 hover:translate-y-[-8px]">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
                        <div className="relative bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                          <div className="flex items-center mb-2">
                            <div className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg text-sm">
                              {milestone.year}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{milestone.title}</h3>
                          <p className="text-gray-600 text-sm">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="z-20 flex items-center order-1 bg-emerald-500 shadow-xl w-6 h-6 rounded-full">
                      <div className="mx-auto w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    
                    <div className={`w-5/12 ${index % 2 === 0 ? 'order-1' : 'order-none'}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="bg-gradient-to-b from-white via-emerald-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 transform transition-all duration-500 hover:translate-y-[-8px]">
              <span className="text-emerald-600 font-medium mb-2 block">Meet the Team</span>
              <h2 className="text-3xl font-bold text-gray-900">The People Behind MyCrew</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our leadership team brings together expertise from hospitality, operations, and customer service to deliver exceptional cleaning experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="relative group transform transition-all duration-300 hover:translate-y-[-8px]">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
                  <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-50 mb-4 sm:mb-0 sm:mr-6"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                        <p className="text-gray-600 text-sm">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
            <div className="px-6 py-12 sm:p-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="transform transition-all duration-300 hover:translate-y-[-8px]">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-white/20 rounded-full">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                      <p className="text-emerald-100">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-b from-white via-emerald-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 sm:p-12 border border-emerald-100 transform transition-all duration-500 hover:shadow-xl">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience the MyCrew Difference?</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied customers who trust MyCrew with their homes and offices.
                </p>
                <button
                  onClick={handleGetQuote}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105"
                >
                  Get Your Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}