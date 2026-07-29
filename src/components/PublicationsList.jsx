"use client";

import React, { useState } from "react";
import publicationsData from "../data/publications.json";

const categories = ["All", "Journal Article", "Conference Talk", "Conference Poster"];

export default function PublicationsList() {
  const [selectedType, setSelectedType] = useState("All");
  const [copiedId, setCopiedId] = useState(null);
  const [activeBibtex, setActiveBibtex] = useState(null);

  const filteredPublications = selectedType === "All"
    ? publicationsData
    : publicationsData.filter((p) => p.type === selectedType);

  const handleCopyBibtex = (pub) => {
    if (!pub.bibtex) return;
    navigator.clipboard.writeText(pub.bibtex);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="publications" className="space-y-6 pt-12 border-t border-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Publications & Conference Presentations</h2>
          <p className="text-slate-400 text-sm mt-1">16 Peer-Reviewed Journal Articles, 6 Conference Talks, and 7 Conference Posters.</p>
        </div>
        <a
          href="https://scholar.google.com/citations?hl=en&user=4g3-eUwAAAAJ"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-teal-400 font-semibold hover:underline self-start sm:self-auto"
        >
          Google Scholar Profile (H-9, i10-9) →
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-medium pt-2">
        {categories.map((cat) => {
          const count = cat === "All"
            ? publicationsData.length
            : publicationsData.filter(p => p.type === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedType(cat)}
              className={`px-3.5 py-1.5 rounded-lg border transition-all ${
                selectedType === cat
                  ? "bg-teal-500 text-slate-950 border-teal-400 font-bold"
                  : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
            >
              {cat === "Journal Article" ? "Journal Articles" : cat === "Conference Talk" ? "Conference Talks" : cat === "Conference Poster" ? "Conference Posters" : "All Publications"} ({count})
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-4 text-sm text-slate-300">
        {filteredPublications.map((pub) => (
          <div key={pub.id} className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-4 hover:border-slate-700 transition-all">
            
            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                    pub.type === "Journal Article"
                      ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                      : pub.type === "Conference Talk"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                  }`}>
                    {pub.type}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">({pub.year})</span>
                </div>

                <h3 className="font-bold text-slate-100 text-base">{pub.title}</h3>

                <p className="text-xs text-slate-400">
                  {pub.authors.split("Dharmawardhana CC").map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < array.length - 1 && <u className="text-slate-200 font-semibold">Dharmawardhana CC</u>}
                    </React.Fragment>
                  ))}
                </p>

                <p className="text-xs text-slate-400 italic">
                  {pub.journal} {pub.volume && `— ${pub.volume}`}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium">
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:underline flex items-center gap-1"
                    >
                      View Publication Link ↗
                    </a>
                  )}
                  {pub.bibtex && (
                    <>
                      <button
                        onClick={() => handleCopyBibtex(pub)}
                        className="px-3 py-1 rounded bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs transition-colors"
                      >
                        {copiedId === pub.id ? "✓ BibTeX Copied!" : "📋 Copy BibTeX"}
                      </button>
                      <button
                        onClick={() => setActiveBibtex(activeBibtex === pub.id ? null : pub.id)}
                        className="text-slate-400 hover:text-slate-200 text-xs"
                      >
                        {activeBibtex === pub.id ? "Hide Citation" : "Show Citation"}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Original Publication Figure */}
              {pub.figure && (
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0 flex items-center justify-center p-2">
                  <img
                    src={pub.figure}
                    alt={pub.title}
                    className="max-h-full max-w-full object-contain rounded"
                  />
                </div>
              )}
            </div>

            {activeBibtex === pub.id && pub.bibtex && (
              <pre className="mt-3 p-3 rounded-lg bg-slate-950 text-[11px] font-mono text-slate-400 overflow-x-auto border border-slate-800 select-all">
                {pub.bibtex}
              </pre>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
