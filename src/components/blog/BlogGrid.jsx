"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getAssetPath } from "@/utils/basePath";

export default function BlogGrid({ posts = [], allTags = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag =
        selectedTag === "All" || (post.tags && post.tags.includes(selectedTag));
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(query)));

      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Controls Bar: Search & Tag Filter Pills */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-6 shadow-xl">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, topic, or keyword..."
            className="w-full pl-11 pr-10 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setSelectedTag("All")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedTag === "All"
                ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50"
            }`}
          >
            All Articles ({posts.length})
          </button>
          {allTags.map((tag) => {
            const tagCount = posts.filter((p) => p.tags && p.tags.includes(tag)).length;
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isSelected ? "All" : tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50"
                }`}
              >
                <span>{tag}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isSelected ? "bg-slate-900/30 text-slate-950" : "bg-slate-900 text-slate-400"}`}>
                  {tagCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-900/40 rounded-2xl border border-slate-800">
          <svg className="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-lg font-bold text-slate-200 mb-1">No matching articles found</h3>
          <p className="text-sm text-slate-400 mb-4">Try adjusting your search query or topic filter.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("All");
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30 hover:bg-teal-500/20 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-teal-500/40 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300"
            >
              {/* Cover Image Header */}
              <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                <img
                  src={getAssetPath(post.coverImage)}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Historical Blogger Badge */}
                {post.originalBloggerUrl && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-semibold flex items-center gap-1.5 shadow-lg">
                    <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.16 3H4.84C3.82 3 3 3.82 3 4.84v14.32C3 20.18 3.82 21 4.84 21h14.32c1.02 0 1.84-.82 1.84-1.84V4.84C21 3.82 20.18 3 19.16 3zM12 17H8v-2h4v2zm4-4H8v-2h8v2zm0-4H8V7h8v2z" />
                    </svg>
                    <span>2020 Blogger Origin</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 font-medium">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {post.date}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900/80 text-teal-300 border border-slate-700/60 font-mono text-[11px]">
                    {post.readingTime}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-100 group-hover:text-teal-300 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-800/60">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-500">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 group-hover:text-teal-300 transition-all pt-1"
                  >
                    <span>Read Technical Article</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
