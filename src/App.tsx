import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Quote } from './pages/Quote';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { Bookings } from './pages/Bookings';
import { Support } from './pages/Support';
import { Dashboard } from './pages/Dashboard';
import { WhatWeOffer } from './pages/WhatWeOffer';
import { MeetMyCrew } from './pages/MeetMyCrew';
import { AboutUs } from './pages/AboutUs';
import { BecomeACleaner } from './pages/BecomeACleaner';
import { BookingDetails } from './pages/BookingDetails';
import { AuthProvider } from './components/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-offer" element={<WhatWeOffer />} />
          <Route path="/meet-my-crew" element={<MeetMyCrew />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings/:id" element={<BookingDetails />} />
          <Route path="/support" element={<Support />} />
          <Route path="/become-cleaner" element={<BecomeACleaner />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}