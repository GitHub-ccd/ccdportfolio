import React from "react";
import Navbar from "@/components/Navbar";
import BlogGrid from "@/components/blog/BlogGrid";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const metadata = {
  title: "Technical Writing & Machine Learning Insights | Dr. Chamila Dharmawardhana",
  description: "Deep-dive technical publications on Explainable AI, XGBoost, LightGBM, NLP, and Healthcare Data Science by Chamila Dharmawardhana, Ph.D.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const allTags = getAllTags();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 space-y-10">
        {/* Hero Header */}
        <section className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-teal-950/40 border border-slate-800/80 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Technical Writing & Engineering Publication
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Machine Learning, Explainable AI & Computational Insights
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              In-depth algorithm breakdowns, modern PyTorch & XGBoost architectures, TreeSHAP diagnostics, and retrospective technical evolutions from my early 2020 Data Science bootcamp exploration to 2026 production standards.
            </p>
          </div>
        </section>

        {/* Article Grid Component */}
        <BlogGrid posts={posts} allTags={allTags} />
      </main>

      <footer className="border-t border-slate-800/80 py-8 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Chamila Dharmawardhana, Ph.D. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Powered by Next.js & Markdown</span>
            <span>•</span>
            <a href="https://findingdata.blogspot.com/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
              Historical Blogger Archive ↗
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
