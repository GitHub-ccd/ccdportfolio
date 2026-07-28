"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ProjectGrid from "../components/ProjectGrid";
import PublicationsList from "../components/PublicationsList";
import ExperienceTimeline from "../components/ExperienceTimeline";

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Background Subtle Gradient Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-slate-950 pointer-events-none -z-10" />

      {/* Navigation Bar Component */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-24">
        
        {/* HERO SECTION */}
        <section id="hero" className="space-y-8 pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Healthcare Data Scientist & Computational Physicist
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
              Transforming Complex Health & Physical Data into <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Actionable AI Solutions.</span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed">
              Ph.D. in Computational Physics with extensive experience bridging multi-scale computer simulations, machine learning algorithms, computer vision, and healthcare data science.
            </p>
          </div>

          {/* Tech & Domain Badges */}
          <div className="flex flex-wrap gap-2 text-xs">
            {["Health AI", "Medical Imaging (CNN)", "Bioinformatics", "FFT Protein Docking", "XGBoost & NLP", "PyTorch / TensorFlow", "Quantum Espresso / DFT"].map((badge) => (
              <span key={badge} className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                {badge}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-teal-500/20"
            >
              Explore Featured Projects
            </a>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-sm font-medium transition-all flex items-center space-x-2"
            >
              <span>🎬 Watch PhD Defense</span>
            </button>
            <a
              href="https://www.youtube.com/watch?v=2wWTxRMEA2g"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800/60 text-slate-400 text-xs font-medium transition-all flex items-center"
            >
              YouTube Link ↗
            </a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="space-y-6 pt-12 border-t border-slate-900">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">About Me</h2>
          <div className="grid md:grid-cols-3 gap-8 text-slate-300 text-sm leading-relaxed">
            <div className="md:col-span-2 space-y-4">
              <p>
                All my life I have been passionate about mathematical modeling and working rigorously to solve complex real-world problems. I earned my <strong>Ph.D. in Physics</strong> (minor in Geosciences) from the University of Missouri - Kansas City under Prof. Wai-Yim Ching, concentrating on quantum and classical atomic simulations of materials.
              </p>
              <p>
                Following postdoctoral appointments at the University of Colorado Boulder, Georgetown University, and the Illinois Institute of Technology, I expanded into modern Machine Learning and Data Science (completing the Flatiron School Data Science program). 
              </p>
              <p>
                My work spans building FFT-based protein docking algorithms for biological complexes, chest X-ray deep learning classification models, emotion-recognition neural networks, and retail recommendation engines.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-slate-100 font-semibold text-base">Quick Statistics</h3>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span>Google Scholar Citations</span>
                  <span className="text-teal-400 font-bold">H-Index 9 | i10-Index 9</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span>Ph.D. Alma Mater</span>
                  <span className="text-slate-200 font-medium">UMKC (2015)</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span>Primary Stack</span>
                  <span className="text-slate-200 font-medium">Python, PyTorch, SQL</span>
                </li>
                <li className="flex justify-between">
                  <span>Research Gate</span>
                  <a href="https://www.researchgate.net/profile/Chamila_Dharmawardhana" target="_blank" rel="noopener noreferrer" className="text-teal-400 underline">Profile Link</a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS COMPONENT */}
        <ProjectGrid />

        {/* PUBLICATIONS COMPONENT */}
        <PublicationsList />

        {/* EXPERIENCE & EDUCATION TIMELINE COMPONENT */}
        <ExperienceTimeline />

        {/* CONTACT & FOOTER SECTION */}
        <section id="contact" className="space-y-6 pt-12 border-t border-slate-900 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Let's Connect</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Interested in collaborating on Healthcare Data Science, Medical AI, or Computational Biology research? Reach out!
          </p>
          <div className="flex justify-center space-x-6 text-sm font-medium pt-2">
            <a href="https://github.com/GitHub-ccd" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">GitHub</a>
            <a href="https://scholar.google.com/citations?hl=en&user=4g3-eUwAAAAJ" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">Google Scholar</a>
            <a href="https://www.researchgate.net/profile/Chamila_Dharmawardhana" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">ResearchGate</a>
          </div>
          <p className="text-slate-600 text-xs pt-8">
            © {new Date().getFullYear()} Dr. Chamila Chathuranga Dharmawardhana. All rights reserved.
          </p>
        </section>

      </main>

      {/* VIDEO MODAL POPUP */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h3 className="text-sm font-semibold text-slate-200">
                Ph.D. Defense Presentation — Dr. Chamila Dharmawardhana
              </h3>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="px-3 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                ✕ Close
              </button>
            </div>
            <div className="relative aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/2wWTxRMEA2g?autoplay=1"
                title="Ph.D. Defense Presentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
