"use client";

import { useEffect, useState } from "react";

export default function ArticleReactions({ slug }) {
  const [claps, setClaps] = useState(12); // Default starting baseline
  const [views, setViews] = useState(148);
  const [hasClapped, setHasClapped] = useState(false);
  const [isClapping, setIsClapping] = useState(false);

  useEffect(() => {
    // Check localStorage for client-side persistence
    const localClapKey = `ccd_clap_${slug}`;
    const localViewKey = `ccd_view_${slug}`;

    const savedClaps = localStorage.getItem(localClapKey);
    const userClapped = localStorage.getItem(`${localClapKey}_user`);

    if (savedClaps) {
      setClaps(parseInt(savedClaps, 10));
    }
    if (userClapped) {
      setHasClapped(true);
    }

    // Increment view count locally
    const currentViews = localStorage.getItem(localViewKey);
    const newViews = currentViews ? parseInt(currentViews, 10) + 1 : 149;
    localStorage.setItem(localViewKey, newViews.toString());
    setViews(newViews);

    // Optional Upstash Redis integration check
    const redisUrl = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN;

    if (redisUrl && redisToken) {
      fetch(`${redisUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", `views:${slug}`],
          ["GET", `claps:${slug}`],
        ]),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data[0] && data[0].result) setViews(data[0].result);
          if (data && data[1] && data[1].result) setClaps(parseInt(data[1].result, 10));
        })
        .catch((err) => console.log("Upstash Redis fallback active:", err));
    }
  }, [slug]);

  const handleClap = async () => {
    setIsClapping(true);
    const newClaps = claps + 1;
    setClaps(newClaps);
    setHasClapped(true);

    const localClapKey = `ccd_clap_${slug}`;
    localStorage.setItem(localClapKey, newClaps.toString());
    localStorage.setItem(`${localClapKey}_user`, "true");

    const redisUrl = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN;

    if (redisUrl && redisToken) {
      try {
        await fetch(`${redisUrl}/incr/claps:${slug}`, {
          headers: { Authorization: `Bearer ${redisToken}` },
        });
      } catch (e) {
        console.log("Upstash clap increment error:", e);
      }
    }

    setTimeout(() => setIsClapping(false), 300);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 my-8 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={handleClap}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md ${
            hasClapped
              ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
              : "bg-slate-800 hover:bg-teal-500/20 text-slate-200 border border-slate-700 hover:border-teal-500/30"
          } ${isClapping ? "scale-110" : "scale-100"}`}
          title="Clap for this article"
        >
          <span className="text-lg">👏</span>
          <span>{claps} Claps</span>
        </button>
        {hasClapped && <span className="text-xs text-teal-400 font-medium">Thanks for reading!</span>}
      </div>

      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>{views} Reads</span>
      </div>
    </div>
  );
}
