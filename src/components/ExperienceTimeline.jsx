"use client";

import React, { useState } from "react";

export default function ExperienceTimeline() {
  const [activeTab, setActiveTab] = useState("experience");

  return (
    <section id="experience" className="space-y-8 pt-12 border-t border-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Experience & Education</h2>
          <p className="text-slate-400 text-sm mt-1">Professional analytics trajectory, research appointments, and academic background.</p>
        </div>

        {/* View Switcher */}
        <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800 self-start text-xs font-medium">
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-4 py-1.5 rounded-md transition-all ${
              activeTab === "experience"
                ? "bg-teal-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Professional Experience
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`px-4 py-1.5 rounded-md transition-all ${
              activeTab === "education"
                ? "bg-teal-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Education & Degrees
          </button>
        </div>
      </div>

      {activeTab === "experience" ? (
        <div className="space-y-6">
          
          {/* Item 1 */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-100">Associate Data Scientist</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20">
                Nov 2020 – Present
              </span>
            </div>
            <p className="text-sm font-medium text-teal-300">Promoboxx.com</p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-400 space-y-1.5 leading-relaxed">
              <li>Developed supervised & unsupervised machine learning models generating business value for enterprise marketing clients.</li>
              <li>Built digital campaign recommendation engines utilizing <strong>Python, NumPy, Pandas, Scikit-Learn, and XGBoost</strong>.</li>
              <li>Architected A/B testing frameworks to evaluate marketing campaign performance and statistical significance.</li>
              <li>Constructed ETL feature engineering read patterns, Null value handling strategies, and hyper-parameter tuning pipelines.</li>
              <li>Deployed Natural Language Processing (NLP) models (<strong>spaCy, NLTK, Scikit-Learn</strong>) for consumer sentiment analysis.</li>
            </ul>
          </div>

          {/* Item 2 */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-100">Senior Research Associate</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800 font-medium">
                Aug 2019 – Aug 2020
              </span>
            </div>
            <p className="text-sm font-medium text-teal-300">Illinois Institute of Technology</p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-400 space-y-1.5 leading-relaxed">
              <li>Developed Fast Fourier Transform (FFT) accelerated methods in <strong>Python</strong> to evaluate binding affinity of protein-protein complexes.</li>
              <li>Engineered automated workflow scripts to streamline molecular docking simulations across large biological databases.</li>
              <li>Assisted in writing federal grant proposals for computational biology research.</li>
            </ul>
          </div>

          {/* Item 3 */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-100">Postdoctoral Research Fellow</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800 font-medium">
                2015 – 2019
              </span>
            </div>
            <p className="text-sm font-medium text-teal-300">University of Colorado Boulder / Georgetown University / IIT</p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Conducted advanced atomic-scale computational modeling, reactive molecular dynamics, and electronic structure calculations across high-performance Linux computing clusters.
            </p>
          </div>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Data Science Credential</span>
            <h3 className="text-base font-bold text-slate-100">Certificate in Data Science (2020)</h3>
            <p className="text-xs text-slate-300">Flatiron School of Computing</p>
            <p className="text-xs text-slate-400">Advanced machine learning, deep learning, computer vision, and data engineering capstones.</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Doctoral Degree</span>
            <h3 className="text-base font-bold text-slate-100">Ph.D. in Physics (Minor in Geosciences, 2015)</h3>
            <p className="text-xs text-slate-300">University of Missouri - Kansas City</p>
            <p className="text-xs text-slate-400 italic">Dissertation: Structure and mechanical properties of cement & intermetallics via ab initio simulations (Advisor: Prof. Wai-Yim Ching).</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Master's Degree</span>
            <h3 className="text-base font-bold text-slate-100">M.S. in Physics (2008)</h3>
            <p className="text-xs text-slate-300">Central Michigan University</p>
            <p className="text-xs text-slate-400 italic">Thesis: DFT Calculations of vibrational modes of arsenic sulfide glass (Advisor: Prof. K. A. Jackson).</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Bachelor's Degree</span>
            <h3 className="text-base font-bold text-slate-100">B.S. in Physics & Mathematics (2005)</h3>
            <p className="text-xs text-slate-300">University of Colombo, Sri Lanka</p>
            <p className="text-xs text-slate-400">Microcontroller-based insulation testing and mathematical physics concentration.</p>
          </div>

        </div>
      )}
    </section>
  );
}
