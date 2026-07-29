"use client";

import React, { useState } from "react";
import Link from "next/link";
import publicationsData from "../data/publications.json";
import { getAssetPath } from "../utils/basePath";

const categories = ["All", "Journal Article", "Conference Talk", "Conference Poster"];

export default function PublicationsList({ limit = null }) {
  const [selectedType, setSelectedType] = useState("All");
  const [copiedId, setCopiedId] = useState(null);
  const [activeBibtex, setActiveBibtex] = useState(null);
  const [activeMediaModal, setActiveMediaModal] = useState(null);

  // Exact 4 Top Featured Papers chosen for landing page based on Google Scholar citations & animations
  const topFeaturedIds = ["srep-2014", "cemconres-2013", "jace-2016", "acta-mat-2020"];

  let displayedPublications = publicationsData;

  if (limit) {
    // Preserve exact ordering as specified by user
    displayedPublications = topFeaturedIds
      .map(id => publicationsData.find(p => p.id === id))
      .filter(Boolean);
  } else if (selectedType !== "All") {
    displayedPublications = publicationsData.filter((p) => p.type === selectedType);
  }

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
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            {limit ? "Featured Key Publications" : "Publications & Conference Presentations"}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {limit
              ? "Top-cited research papers in computational materials science and atomic-scale simulation animations."
              : "16 Peer-Reviewed Journal Articles, 6 Conference Talks, and 7 Conference Posters."}
          </p>
        </div>
        <div className="flex items-center space-x-4 self-start sm:self-auto">
          {limit && (
            <Link
              href="/publications"
              className="text-xs text-teal-400 font-semibold hover:underline bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-lg"
            >
              View All 29 Publications →
            </Link>
          )}
          <a
            href="https://scholar.google.com/citations?hl=en&user=4g3-eUwAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-teal-400 font-semibold"
          >
            Google Scholar (H-9) ↗
          </a>
        </div>
      </div>

      {/* Filter Tabs (Only show if not limited) */}
      {!limit && (
        <div className="flex flex-wrap gap-2 text-xs font-medium pt-2">
          {categories.map((cat) => {
            const count = cat === "All"
              ? publicationsData.length
              : publicationsData.filter(p => p.type === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-3.5 py-1.5 rounded-lg border transition-all ${selectedType === cat
                  ? "bg-teal-500 text-slate-950 border-teal-400 font-bold"
                  : "bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                  }`}
              >
                {cat === "Journal Article" ? "Journal Articles" : cat === "Conference Talk" ? "Conference Talks" : cat === "Conference Poster" ? "Conference Posters" : "All Publications"} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Publication Cards List */}
      <div className="space-y-6 text-sm text-slate-300">
        {displayedPublications.map((pub, idx) => (
          <div key={pub.id} className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-5 hover:border-slate-700 transition-all">

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {limit && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-500 text-slate-950">
                      #{idx + 1} Top Cited
                    </span>
                  )}
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${pub.type === "Journal Article"
                    ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                    : pub.type === "Conference Talk"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                    }`}>
                    {pub.type}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">({pub.year})</span>
                </div>

                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-teal-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    View Journal Link ↗
                  </a>
                )}
              </div>

              <h3 className="font-bold text-slate-100 text-lg sm:text-xl leading-snug">{pub.title}</h3>

              <p className="text-xs sm:text-sm text-slate-400">
                {pub.authors.split("Dharmawardhana CC").map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < array.length - 1 && <u className="text-slate-100 font-bold decoration-teal-400">Dharmawardhana CC</u>}
                  </React.Fragment>
                ))}
              </p>

              <p className="text-xs text-slate-400 italic">
                {pub.journal} {pub.volume && `— ${pub.volume}`}
              </p>
            </div>

            {/* FEATURED MEDIA: PROMINENT VIDEO OR RESEARCH DIAGRAM */}
            {pub.video ? (
              <div
                onClick={() => setActiveMediaModal({ type: 'video', src: pub.video, title: pub.title })}
                className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer group max-w-2xl mx-auto shadow-xl"
              >
                <video
                  src={getAssetPath(pub.video)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-h-[380px] object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded bg-slate-950/80 text-teal-400 text-xs font-semibold backdrop-blur border border-slate-800">
                  🔍 Click to Enlarge Video Simulation
                </div>
              </div>
            ) : pub.figure ? (
              <div
                onClick={() => setActiveMediaModal({ type: 'image', src: pub.figure, title: pub.title })}
                className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 p-4 cursor-pointer group max-w-2xl mx-auto shadow-lg hover:border-teal-500/40 transition-all"
              >
                <img
                  src={getAssetPath(pub.figure)}
                  alt={pub.title}
                  className="w-full max-h-[320px] object-contain mx-auto rounded group-hover:scale-[1.01] transition-transform duration-300"
                />
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded bg-slate-950/90 text-teal-400 text-xs font-semibold backdrop-blur border border-slate-800">
                  🔍 Expand Figure
                </div>
              </div>
            ) : null}

            {/* ACTION BUTTONS & CITATION */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium border-t border-slate-800/60">
              {pub.bibtex && (
                <>
                  <button
                    onClick={() => handleCopyBibtex(pub)}
                    className="px-3.5 py-1.5 rounded bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    {copiedId === pub.id ? "✓ BibTeX Copied!" : "📋 Copy BibTeX Citation"}
                  </button>
                  <button
                    onClick={() => setActiveBibtex(activeBibtex === pub.id ? null : pub.id)}
                    className="text-slate-400 hover:text-slate-200 text-xs"
                  >
                    {activeBibtex === pub.id ? "Hide BibTeX" : "Show BibTeX"}
                  </button>
                </>
              )}
            </div>

            {activeBibtex === pub.id && pub.bibtex && (
              <pre className="mt-3 p-4 rounded-lg bg-slate-950 text-[11px] font-mono text-slate-300 overflow-x-auto border border-slate-800 select-all">
                {pub.bibtex}
              </pre>
            )}
          </div>
        ))}
      </div>

      {limit && (
        <div className="text-center pt-4">
          <Link
            href="/publications"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-teal-400 font-semibold text-sm transition-all"
          >
            <span>Explore All 29 Publications & Presentations →</span>
          </Link>
        </div>
      )}

      {/* FULLSCREEN HIGH-RES MEDIA MODAL */}
      {activeMediaModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
          onClick={() => setActiveMediaModal(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-200 line-clamp-1">{activeMediaModal.title}</h4>
              <button
                onClick={() => setActiveMediaModal(null)}
                className="px-3 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex items-center justify-center bg-slate-950 rounded-lg p-2 max-h-[80vh] overflow-hidden">
              {activeMediaModal.type === 'video' ? (
                <video
                  src={getAssetPath(activeMediaModal.src)}
                  controls
                  autoPlay
                  loop
                  className="max-h-[75vh] w-auto max-w-full rounded"
                />
              ) : (
                <img
                  src={getAssetPath(activeMediaModal.src)}
                  alt={activeMediaModal.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
