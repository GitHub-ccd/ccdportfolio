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
            Background & Credentials
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            About Dr. Chamila Dharmawardhana
          </h1>
          <p className="text-slate-400 text-base max-w-3xl leading-relaxed">
            Ph.D. in Physics, Healthcare Data Scientist, and Computational Research Fellow.
          </p>
        </div>

        {/* FULL BIOGRAPHY & DOWNLOAD CV */}
        <section className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-slate-100">Curriculum Vitae</h2>
            <a
              href="/ccdportfolio/img/publications/cv_chamila_2020.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors self-start"
            >
              <span>📄 Download Full PDF CV</span>
            </a>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              Hi, I'm Chamila. All my life I was interested in mathematical modeling and working hard to thoroughly understand and solve complex problems. I earned my Ph.D. in Physics (minor in Geosciences) from the University of Missouri - Kansas City concentrating on computational material science, ab initio quantum simulations, and classical physics.
            </p>
            <p>
              Following postdoctoral research fellowships at the University of Colorado Boulder, Georgetown University, and Illinois Institute of Technology, I expanded into healthcare data science, machine learning, and computer vision through the Flatiron School of Computing.
            </p>
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
