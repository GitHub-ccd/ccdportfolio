"use client";

import React from "react";
import testimonialsData from "../data/testimonials.json";

export default function Testimonials() {
  return (
    <section id="testimonials" className="space-y-8 pt-12 border-t border-slate-900">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Testimonials & Peer Recommendations</h2>
        <p className="text-slate-400 text-sm mt-1">Endorsements from research colleagues, industry collaborators, and fellow data scientists.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonialsData.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-4 hover:border-teal-500/30 transition-all"
          >
            <div className="space-y-3">
              <div className="text-teal-400 text-2xl font-serif">“</div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                {item.quote}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/60 flex items-center space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
              />
              <div>
                <a
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-100 text-sm hover:text-teal-400 transition-colors block"
                >
                  {item.name} ↗
                </a>
                <span className="text-slate-400 text-xs block">{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
