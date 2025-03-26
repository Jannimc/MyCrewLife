import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Shield, Award, Star, CheckCircle2, Users, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function MeetMyCrew() {
  const navigate = useNavigate();
  
  const handleGetQuote = () => {
    navigate('/quote');
  };
  
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Senior Cleaner",
      experience: "8 years",
      specialties: ["Deep Cleaning", "End of Tenancy", "Commercial Spaces"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4.9,
      reviews: 156
    },
    {
      name: "Michael Chen",
      role: "Team Leader",
      experience: "6 years",
      specialties: ["Office Cleaning", "Post-Construction", "Training"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4.8,
      reviews: 132
    },
    {
      name: "Emma Wilson",
      role: "Specialist Cleaner",
      experience: "5 years",
      specialties: ["Eco-Friendly Cleaning", "Residential", "Carpet Care"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4.9,
      reviews: 98
    },
    {
      name: "David Thompson",
      role: "Commercial Specialist",
      experience: "7 years",
      specialties: ["Retail Spaces", "Office Buildings", "Industrial"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4.7,
      reviews: 143
    },
    {
      name: "Lisa Martinez",
      role: "Senior Cleaner",
      experience: "4 years",
      specialties: ["Residential", "Move In/Out", "Deep Cleaning"],
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4.8,
      reviews: 87
    },
    {
      name: "James Wilson",
      role: "Specialist Cleaner",
      experience: "5 years",
      specialties: ["Window Cleaning", "Pressure Washing", "External Cleaning"],
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      rating: 4.9,
      reviews: 112
    }
  ];

  return (
    <MainLayout onGetQuote={handleGetQuote}>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-emerald-50 via-white to-white py-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Meet Our Professional Crew
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our experienced and dedicated cleaning professionals are committed to delivering exceptional service
              </p>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
                <div className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-50"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-emerald-600 font-medium">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-5 h-5 text-emerald-500 mr-2" />
                      {member.experience} experience
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-5 h-5 text-emerald-500 mr-2" />
                      {member.rating} rating ({member.reviews} reviews)
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, specIndex) => (
                          <span
                            key={specIndex}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Standards Section */}
        <div className="bg-gradient-to-b from-white via-emerald-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Our High Standards</h2>
              <p className="mt-4 text-lg text-gray-600">Every member of our crew meets our rigorous requirements</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Thoroughly Vetted",
                  description: "Comprehensive background checks and reference verification for every team member",
                  points: ["Identity verification", "Criminal record check", "Reference checks", "Right to work verification"]
                },
                {
                  icon: GraduationCap,
                  title: "Professionally Trained",
                  description: "Extensive training program covering all aspects of professional cleaning",
                  points: ["Technical skills", "Safety procedures", "Customer service", "Environmental awareness"]
                },
                {
                  icon: Users,
                  title: "Regularly Evaluated",
                  description: "Ongoing performance monitoring and customer feedback analysis",
                  points: ["Quality audits", "Customer feedback", "Performance reviews", "Continuous improvement"]
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h3 className="ml-3 text-lg font-semibold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
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
                    Ready to work with our crew?
                  </h2>
                  <p className="mt-3 max-w-lg text-lg text-emerald-100">
                    Book your cleaning service today and experience the difference.
                  </p>
                </div>
                <div className="mt-8 lg:mt-0 lg:ml-8">
                  <div className="inline-flex rounded-lg shadow">
                    <button
                      onClick={handleGetQuote}
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