import React from 'react';
import { Header } from '../Header';
import { Hero } from '../Hero';
import { Features } from '../Features';
import { Security } from '../Security';
import { Footer } from '../Footer';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Security />
      </main>
      <Footer />
    </div>
  );
}