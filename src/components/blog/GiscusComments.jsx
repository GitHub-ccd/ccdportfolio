"use client";

import React, { useEffect, useRef, useState } from "react";

export default function GiscusComments({ slug }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!ref.current) return;
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "GitHub-ccd/ccdportfolio");
    // If giscus app is installed on repo, set repo-id here
    script.setAttribute("data-repo-id", process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "R_kgDORX_xxx"); 
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "DIC_kwDORX_xxx");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "dark_dimmed");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    ref.current.appendChild(script);
  }, [slug]);

  return (
    <section className="mt-16 pt-8 border-t border-slate-800/80">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Discussion & Feedback</h3>
            <p className="text-xs text-slate-400">Join the conversation on GitHub Discussions</p>
          </div>
        </div>

        <a
          href="https://github.com/GitHub-ccd/ccdportfolio/discussions"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 hover:border-teal-500/40 transition-all flex items-center gap-1.5"
        >
          <span>Open GitHub Discussions</span>
          <span>↗</span>
        </a>
      </div>

      {/* Embedded Giscus Frame */}
      <div ref={ref} className="giscus-wrapper min-h-[120px] rounded-xl bg-slate-900/30 p-4 border border-slate-800/60" />
    </section>
  );
}
