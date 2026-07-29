"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Background Gradient Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-slate-950 pointer-events-none -z-10" />

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24 space-y-12">
        
        {/* PAGE HEADER */}
        <div className="space-y-4 pt-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium">
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
            Contact Dr. Chamila Dharmawardhana
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Interested in healthcare data science collaborations, biophysics research, consulting, or technical advisory? Connect with me directly on LinkedIn or send a message.
          </p>
        </div>

        {/* MAIN CONTACT GRID */}
        <div className="grid md:grid-cols-3 gap-8 items-start pt-6 border-t border-slate-900">
          
          {/* CONTACT INFO CARD */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <h2 className="text-lg font-bold text-slate-100">Primary Contact Channels</h2>

            {/* LinkedIn Prominent Box */}
            <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/30 space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Top Recommendation</span>
              <h3 className="text-base font-bold text-slate-100">LinkedIn Profile</h3>
              <p className="text-xs text-slate-300">My most active professional network for messaging and collaboration.</p>
              <a
                href="https://www.linkedin.com/in/chamila-dharmawardhana/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20"
              >
                Connect on LinkedIn ↗
              </a>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <span className="text-teal-400 text-lg">📧</span>
                <div>
                  <h3 className="font-semibold text-slate-200">Direct Email</h3>
                  <a href="mailto:chathurangad@gmail.com" className="text-teal-400 hover:underline text-xs">
                    chathurangad@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-teal-400 text-lg">📍</span>
                <div>
                  <h3 className="font-semibold text-slate-200">Location</h3>
                  <p className="text-slate-400 text-xs">Chicago, Illinois, USA</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-teal-400 text-lg">🌐</span>
                <div>
                  <h3 className="font-semibold text-slate-200">Other Profiles</h3>
                  <div className="flex flex-col space-y-1.5 pt-1 text-xs">
                    <a href="https://scholar.google.com/citations?hl=en&user=4g3-eUwAAAAJ" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                      Google Scholar (H-Index 9) ↗
                    </a>
                    <a href="https://www.researchgate.net/profile/Chamila_Dharmawardhana" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                      ResearchGate Profile ↗
                    </a>
                    <a href="https://github.com/GitHub-ccd" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                      GitHub Profile ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE FORM */}
          <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-slate-100">Send a Direct Message</h2>

            {submitted ? (
              <div className="p-6 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-center space-y-2">
                <span className="text-2xl">✓</span>
                <h3 className="font-bold text-slate-100">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-400">
                  Thank you for reaching out, {formData.name || "friend"}. Dr. Dharmawardhana will reply to your email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane.doe@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Research Collaboration / Healthcare AI Query"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-teal-500/20"
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
