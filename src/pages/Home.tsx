import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Hero } from '../components/Hero';
import { PartnerLogos } from '../components/PartnerLogos';
import { Services } from '../components/Services';
import { Reviews } from '../components/Reviews';
import { FAQ } from '../components/FAQ';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Home() {
  const [postcode, setPostcode] = useState('');
  const [activeService, setActiveService] = useState(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const navigate = useNavigate();

  useScrollAnimation();

  const handleGetQuote = () => {
    navigate('/quote', { 
      state: { 
        postcode,
        selectedAddress 
      } 
    });
  };

  return (
    <MainLayout onGetQuote={handleGetQuote}>
      <Hero 
        postcode={postcode} 
        setPostcode={setPostcode} 
        onAddressSelect={setSelectedAddress}
        onGetQuote={handleGetQuote} 
      />
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
    </MainLayout>
  );
}