"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import PublicationsList from "../../components/PublicationsList";

export default function PublicationsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Background Gradient Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-slate-950 pointer-events-none -z-10" />

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-12">
        
        {/* PAGE HEADER */}
        <div className="space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium">
            Peer-Reviewed Literature & Research Figures
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            Publications Library
          </h1>
          <p className="text-slate-400 text-base max-w-3xl leading-relaxed">
            Peer-reviewed scientific journal articles, computational physics models, and biophysical research with 1-click BibTeX citations and original research figures.
          </p>
        </div>

        {/* PUBLICATIONS LIST COMPONENT */}
        <PublicationsList />

      </main>
    </div>
  );
}
