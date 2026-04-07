'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import GeneralDesignSection from '../components/GeneralDesignSection';
import UIUXExamples from '../components/UIUXExamples';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030308]">
      <Navbar />
      <main>
        <Hero />
        <div className="relative z-10 bg-[#030308]">
          <About />
          <Skills />
          <Projects />
          <GeneralDesignSection />
          <UIUXExamples />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
