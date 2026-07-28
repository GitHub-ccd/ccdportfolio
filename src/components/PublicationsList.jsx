"use client";

import React, { useState } from "react";
import publicationsData from "../data/publications.json";

export default function PublicationsList() {
  const [copiedId, setCopiedId] = useState(null);
  const [activeBibtex, setActiveBibtex] = useState(null);

  const handleCopyBibtex = (pub) => {
    navigator.clipboard.writeText(pub.bibtex);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="publications" className="space-y-6 pt-12 border-t border-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Peer-Reviewed Publications</h2>
          <p className="text-slate-400 text-sm mt-1">Scientific journal articles in computational physics, materials science, and biophysics.</p>
        </div>
        <a
          href="https://scholar.google.com/citations?hl=en&user=4g3-eUwAAAAJ"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-teal-400 font-semibold hover:underline"
        >
          Google Scholar Profile (H-Index 9) →
        </a>
      </div>

      <div className="space-y-4 text-sm text-slate-300">
        {publicationsData.map((pub) => (
          <div key={pub.id} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-all">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-100 text-base flex-1">{pub.title}</h3>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-950 text-teal-400 border border-slate-800">
                {pub.year}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              {pub.authors.split("Dharmawardhana CC").map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && <u className="text-slate-200 font-semibold">Dharmawardhana CC</u>}
                </React.Fragment>
              ))}
            </p>

            <p className="text-xs text-slate-400 italic">
              {pub.journal} — {pub.volume}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium">
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline flex items-center gap-1"
              >
                View Journal Publication ↗
              </a>
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
            </div>

            {activeBibtex === pub.id && (
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
