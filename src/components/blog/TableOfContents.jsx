"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({ toc = [] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  return (
    <nav className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-lg">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/80">
        <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          Table of Contents
        </h3>
      </div>
      <ul className="space-y-2 text-xs font-medium">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? "0.75rem" : "0" }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(item.id);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`block transition-all hover:text-teal-300 ${
                activeId === item.id
                  ? "text-teal-400 font-semibold translate-x-1"
                  : "text-slate-400 hover:translate-x-0.5"
              }`}
            >
              {item.level === 3 && <span className="mr-1.5 text-slate-600">•</span>}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
