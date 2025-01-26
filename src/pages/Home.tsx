import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Hero } from '../components/Hero';
import { PartnerLogos } from '../components/PartnerLogos';
import { Services } from '../components/Services';
import { Reviews } from '../components/Reviews';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Home() {
  const [postcode, setPostcode] = useState('');
  const [activeService, setActiveService] = useState(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  useScrollAnimation();

  const handleGetQuote = () => {
    navigate('/quote', { state: { postcode } });
  };

  return (
    <MainLayout onGetQuote={handleGetQuote}>
      <Hero postcode={postcode} setPostcode={setPostcode} onGetQuote={handleGetQuote} />
      <div className="scroll-fade-in">
        <PartnerLogos />
      </div>
      <div className="scroll-fade-in">
        <Services activeService={activeService} setActiveService={setActiveService} />
      </div>
      <div className="scroll-fade-in">
        <Reviews />
      </div>
      <div className="scroll-fade-in">
        <FAQ activeFaq={activeFaq} setActiveFaq={setActiveFaq} />
      </div>
      <div className="scroll-fade-in">
        <Footer />
      </div>
    </MainLayout>
  );
}