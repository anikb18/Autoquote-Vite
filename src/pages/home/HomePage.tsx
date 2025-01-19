import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { Faqs } from '@/components/Faqs';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { Pricing } from '@/components/Pricing';
import { PrimaryFeatures } from '@/components/PrimaryFeatures';
import { SecondaryFeatures } from '@/components/SecondaryFeatures';
import { Testimonials } from '@/components/Testimonials';
import { CallToAction } from '@/components/CallToAction';
import { useAuth } from '@/features/auth/AuthProvider';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <Header>
        {user && (
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-primary hover:bg-primary/90"
          >
            Go to Dashboard
          </Button>
        )}
      </Header>
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
