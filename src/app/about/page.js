"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import ExperienceTimeline from "../../components/ExperienceTimeline";
import Testimonials from "../../components/Testimonials";
import { getAssetPath } from "../../utils/basePath";

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
                src={getAssetPath("/img/profile.jpg")}
                alt="Dr. Chamila Dharmawardhana"
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl object-cover border-2 border-teal-500/30 shadow-xl"
              />
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Biography & Personal Journey</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Computational Physicist • Healthcare Data Scientist • Software Builder</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <a
                    href={getAssetPath("/docs/chamila_dharmawardhana_2page_cv.pdf")}
                    download="Dr_Chamila_Dharmawardhana_Executive_CV.pdf"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors"
                    title="Download 2-Page Executive Recruiter Summary PDF"
                  >
                    <span>📄 2-Page Executive CV</span>
                  </a>
                  <a
                    href={getAssetPath("/docs/linkedin_profile.pdf")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-xs transition-colors"
                    title="Download Full Academic / Technical CV PDF"
                  >
                    <span>📚 Full Academic CV</span>
                  </a>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  I am a <strong>Healthcare Data Scientist and Computational Physicist</strong> with over 15 years of combined experience bridging quantum physics, multi-scale biomolecular simulations, machine learning, and clinical analytics. I earned my <strong>Ph.D. in Computational Physics</strong> (minor in Geosciences) from the University of Missouri - Kansas City under Prof. Wai-Yim Ching, focusing on ab-initio density functional theory (DFT) calculations of complex crystal structures, electronic properties, and high-temperature material oxidation.
                </p>
                <p>
                  My post-doctoral research spans prominent academic institutions: constructing force fields for high-temperature alloys at the <strong>University of Colorado Boulder</strong> (under an ONR MURI grant), developing biomolecular solution potential terms for CHARMM at <strong>Georgetown University</strong> in collaboration with the NIH Laboratory of Computational Biology, and engineering Fast Fourier Transform (FFT) binding affinity algorithms for protein-protein docking at the <strong>Illinois Institute of Technology</strong>.
                </p>
                <p>
                  Transitioning my quantitative skills into industrial data science, I served as Associate Data Scientist at <strong>Promoboxx</strong> (XGBoost recommendation models and spaCy/NLTK sentiment analysis) and Data Scientist at <strong>Bon Secours Mercy Health</strong> (clinical outcome modeling and health system data pipelines). Currently, as a Data Scientist at <strong>Nordic Global</strong>, I lead healthcare data science initiatives, advanced predictive modeling, and clinical intelligence frameworks.
                </p>
                <p>
                  Beyond formal algorithms and peer-reviewed research, I view data science as a deeply human pursuit. Whether building a mobile edtech flashcard engine to study for my US citizenship test, scraping Sinhalese name origins into an interactive voting app with my wife to name our second-born child, or designing commercial web platforms, I am passionate about applying software and data to simplify life, empower people, and deliver meaningful real-world impact.
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
