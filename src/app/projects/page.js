"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import projectsData from "../../data/projects.json";
import { getAssetPath } from "../../utils/basePath";

const categories = [
  "All",
  "Health AI & Medical Imaging",
  "Bioinformatics & Computational Biology",
  "Applied Machine Learning & NLP",
  "Applied Machine Learning & Explainable AI",
  "Computational Physics"
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Background Gradient Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-slate-950 pointer-events-none -z-10" />

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-12">
        
        {/* PAGE HEADER */}
        <div className="space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium">
            Full Living Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            Projects & Case Studies Hub
          </h1>
          <p className="text-slate-400 text-base max-w-3xl leading-relaxed">
            Explore all end-to-end data science projects, deep learning medical imaging models, computational biology pipelines, and physics simulations.
          </p>
        </div>

        {/* CONTROLS: SEARCH & CATEGORY FILTERS */}
        <div className="space-y-6 pt-4 border-t border-slate-900">
          
          {/* Search Input */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search projects by keyword or tech (e.g. PyTorch, CNN, FFT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg border transition-all ${
                  selectedCategory === cat
                    ? "bg-teal-500 text-slate-950 border-teal-400 font-bold"
                    : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-teal-500/40 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between overflow-hidden shadow-lg"
            >
              <div>
                {project.image && (
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden border-b border-slate-800/60 bg-slate-950">
                    <img
                      src={getAssetPath(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                  </div>
                )}
                <div className="p-6 space-y-3">
                  <div className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    {project.category}
                  </div>
                  <h2 className="text-xl font-bold text-slate-100 group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="pt-3 border-t border-slate-800/60 flex flex-wrap gap-1.5 text-[11px] text-slate-400">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs font-medium pt-1">
                  <span className="text-teal-400 group-hover:underline">View Full Case Study →</span>
                  {project.institution && (
                    <span className="text-slate-500 text-[11px]">{project.institution}</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-2 text-center py-16 text-slate-500 text-sm">
              No projects found matching "{searchQuery}".
            </div>
          )}
        </div>

        {/* DETAIL MODAL */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-2">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-100">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-3 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  ✕ Close
                </button>
              </div>

              {selectedProject.image && (
                <div className="w-full h-56 sm:h-64 overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
                  <img
                    src={getAssetPath(selectedProject.image)}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p className="whitespace-pre-line">{selectedProject.description || selectedProject.summary}</p>
              </div>

              {/* Key Metrics Grid */}
              {selectedProject.keyMetrics && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Performance & Model Metrics</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedProject.keyMetrics.map((m, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
                        <div className="text-xs text-slate-400 font-medium">{m.label}</div>
                        <div className="text-sm sm:text-base font-extrabold text-teal-400">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights List */}
              {selectedProject.highlights && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Technical Highlights</h4>
                  <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-300">
                    {selectedProject.highlights.map((h, idx) => (
                      <li key={idx} className="leading-relaxed">{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Technologies Used</h4>
                <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-md bg-slate-950 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Links */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800 text-xs font-medium">
                {selectedProject.liveDemoUrl && (
                  <a
                    href={selectedProject.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>
                      {selectedProject.liveDemoLabel ||
                        (selectedProject.liveDemoUrl.includes("huggingface")
                          ? "🚀 Launch Live Gradio Demo ↗"
                          : "🚀 Launch Live Streamlit Demo ↗")}
                    </span>
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>GitHub Repository ↗</span>
                  </a>
                )}
                {selectedProject.blog && (
                  <a
                    href={selectedProject.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>Read Detailed Blog Post ↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
