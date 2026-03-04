'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Projects from '../components/Projects';
import SampleDesign from '../components/SampleDesign';
import MusicPlayer from '../components/MusicPlayer';
import StoryCarousel from '../components/StoryCarousel';
import QuantumCore from '../components/QuantumCore';
import ObsidianCard from '../components/ObsidianCard';
import NeonRunner from '../components/NeonRunner';
import UIUXConclusion from '../components/UIUXConclusion';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <SampleDesign />
        <MusicPlayer />
        <StoryCarousel />
        <QuantumCore />
        <ObsidianCard />
        <NeonRunner />
        <UIUXConclusion />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}