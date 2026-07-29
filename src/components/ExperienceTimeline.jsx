"use client";

import React, { useState } from "react";

export default function ExperienceTimeline() {
  const [activeTab, setActiveTab] = useState("experience");

  return (
    <section id="experience" className="space-y-8 pt-12 border-t border-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Experience & Credentials</h2>
          <p className="text-slate-400 text-sm mt-1">Healthcare data science leadership, industry analytics, and computational physics appointments.</p>
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
            Education & Honors
          </button>
        </div>
      </div>

      {activeTab === "experience" ? (
        <div className="space-y-6">
          
          {/* Nordic Global */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3 hover:border-teal-500/30 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-100">Data Scientist</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/20">
                Jan 2024 – Present
              </span>
            </div>
            <p className="text-sm font-semibold text-teal-300">Nordic Global</p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Leading healthcare data science initiatives, advanced predictive modeling, supervised and unsupervised machine learning algorithms, and clinical analytics.
            </p>
          </div>

          {/* Bon Secours Mercy Health */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3 hover:border-teal-500/30 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-100">Data Scientist</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800 font-medium">
                Jan 2022 – Dec 2023
              </span>
            </div>
            <p className="text-sm font-semibold text-teal-300">Bon Secours Mercy Health</p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Architected healthcare data pipelines, patient outcome modeling, statistical intelligence frameworks, and clinical machine learning models across major health system datasets.
            </p>
          </div>

          {/* Promoboxx */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3 hover:border-teal-500/30 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-100">Associate Data Scientist</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800 font-medium">
                Nov 2020 – Jan 2022
              </span>
            </div>
            <p className="text-sm font-semibold text-teal-300">Promoboxx (Boston, MA)</p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-400 space-y-1.5 leading-relaxed">
              <li>Developed supervised & unsupervised machine learning models generating business value for enterprise marketing clients.</li>
              <li>Built recommendation engines utilizing <strong>Python, NumPy, Pandas, Scikit-Learn, and XGBoost</strong>.</li>
              <li>Architected A/B testing frameworks and deployed NLP models (<strong>spaCy, NLTK, Scikit-Learn</strong>) for consumer sentiment analysis.</li>
            </ul>
          </div>

          {/* Illinois Tech */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3 hover:border-teal-500/30 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-100">Senior Research Associate</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800 font-medium">
                2019 – 2020
              </span>
            </div>
            <p className="text-sm font-semibold text-teal-300">Illinois Institute of Technology (Chicago, IL)</p>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-400 space-y-1.5 leading-relaxed">
              <li>Developed Fast Fourier Transform (FFT) algorithms in Python/NumPy to evaluate protein-protein docking binding affinities.</li>
              <li>Engineered automated workflow scripts to streamline docking simulations across large biological databases.</li>
            </ul>
          </div>

          {/* Georgetown University */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3 hover:border-teal-500/30 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-100">Postdoctoral Researcher</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800 font-medium">
                2017 – 2019
              </span>
            </div>
            <p className="text-sm font-semibold text-teal-300">Georgetown University (Washington, D.C.)</p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Developed computational biomolecular simulation methods, added potential terms to the CHARMM package for ionic solution simulations, and collaborated with NIH Laboratory of Computational Biology.
            </p>
          </div>

          {/* CU Boulder */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3 hover:border-teal-500/30 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-100">Postdoctoral Fellow</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800 font-medium">
                2016 – 2017
              </span>
            </div>
            <p className="text-sm font-semibold text-teal-300">University of Colorado Boulder (Boulder, CO)</p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Constructed force fields for high-temperature Mo-Si-B super-alloys under ONR MURI grant across 5 universities, performing multi-million atom supercomputer simulations on ALCF & NERSC.
            </p>
          </div>

        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Doctoral Degree</span>
              <h3 className="text-base font-bold text-slate-100">Ph.D. in Computational Physics (2011 – 2015)</h3>
              <p className="text-xs text-slate-300">University of Missouri - Kansas City</p>
              <p className="text-xs text-slate-400 italic">Ab-initio quantum simulations & electronic structure of cement hydrates and Mo-Si-B alloys (Advisor: Prof. Wai-Yim Ching).</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Data Science Credential</span>
              <h3 className="text-base font-bold text-slate-100">Data Science Program (2020)</h3>
              <p className="text-xs text-slate-300">Flatiron School</p>
              <p className="text-xs text-slate-400">Supervised/unsupervised machine learning, deep learning computer vision (CNNs), and natural language processing.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Master's Degree</span>
              <h3 className="text-base font-bold text-slate-100">M.S. in Theoretical & Mathematical Physics (2006 – 2008)</h3>
              <p className="text-xs text-slate-300">Central Michigan University</p>
              <p className="text-xs text-slate-400 italic">DFT gas-phase calculations and optical characterization of chalcogenide glasses.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Bachelor's Degree & Diploma</span>
              <h3 className="text-base font-bold text-slate-100">B.S. in Physics & Mathematics (2001 – 2005)</h3>
              <p className="text-xs text-slate-300">University of Colombo, Sri Lanka</p>
              <p className="text-xs text-slate-400">Diploma in Computer Systems Design (NIBM, 2000–2001).</p>
            </div>

          </div>

          {/* Honors & Awards Box */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>🏆</span> Honors & Academic Scholarships
            </h3>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 space-y-1">
              <li><strong>Lester Touby Kurtz Scholarship</strong> in Graduate Physics</li>
              <li><strong>Wai-Yim Ching and Mon Yin Lung Scholarship</strong> in Physics</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
