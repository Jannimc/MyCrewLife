import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Quote } from './pages/Quote';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { PaymentMethods } from './pages/PaymentMethods';
import { Bookings } from './pages/Bookings';
import { Support } from './pages/Support';
import { Dashboard } from './pages/Dashboard';
import { WhatWeOffer } from './pages/WhatWeOffer';
import { MeetMyCrew } from './pages/MeetMyCrew';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { AboutUs } from './pages/AboutUs';
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
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}