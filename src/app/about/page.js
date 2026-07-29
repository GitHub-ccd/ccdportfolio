"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import ExperienceTimeline from "../../components/ExperienceTimeline";
import Testimonials from "../../components/Testimonials";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Background Gradient Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-slate-950 pointer-events-none -z-10" />

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-16">
        
        {/* PAGE HEADER */}
        <div className="space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium">
            Background & Professional Credentials
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            About Dr. Chamila Dharmawardhana
          </h1>
          <p className="text-slate-400 text-base max-w-3xl leading-relaxed">
            Data Scientist at Nordic Global & Former Data Scientist at Bon Secours Mercy Health. Ph.D. in Computational Physics with expertise in Healthcare Data Science, Machine Learning, and Biophysics.
          </p>
        </div>

        {/* FULL BIOGRAPHY WITH PROFILE PHOTO */}
        <section className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="shrink-0 mx-auto md:mx-0">
              <img
                src="/ccdportfolio/img/profile.jpg"
                alt="Dr. Chamila Dharmawardhana"
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl object-cover border-2 border-teal-500/30 shadow-xl"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <h2 className="text-2xl font-bold text-slate-100">Biography & Summary</h2>
                <a
                  href="/ccdportfolio/docs/linkedin_profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors self-start"
                >
                  <span>📄 Download LinkedIn PDF Profile</span>
                </a>
              </div>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  I am a Data Scientist and Computational Chemist with diverse experience building supervised/unsupervised machine learning models for real-world healthcare and industry applications. I earned my <strong>Ph.D. in Computational Physics</strong> from the University of Missouri - Kansas City concentrating on ab-initio quantum simulations and electronic structure calculations of complex materials.
                </p>
                <p>
                  My career spans data science positions at <strong>Nordic Global</strong>, <strong>Bon Secours Mercy Health</strong>, and <strong>Promoboxx</strong>, alongside postdoctoral research appointments at the Illinois Institute of Technology (FFT protein docking algorithms), Georgetown University (CHARMM biomolecular water models & NIH collaborations), and the University of Colorado Boulder (ONR MURI supercomputer simulations).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <ExperienceTimeline />

        {/* TESTIMONIALS */}
        <Testimonials />

      </main>
    </div>
  );
}
