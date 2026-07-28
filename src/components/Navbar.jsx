"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="font-bold text-base sm:text-lg tracking-tight text-teal-400 hover:text-teal-300 transition-colors">
          Dr. Chamila Dharmawardhana <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">Ph.D.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-teal-400 transition-colors">About</a>
          <a href="#projects" className="hover:text-teal-400 transition-colors">Projects</a>
          <a href="#publications" className="hover:text-teal-400 transition-colors">Publications</a>
          <a href="#experience" className="hover:text-teal-400 transition-colors">Experience</a>
          <a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a>
        </nav>

        <div className="flex items-center space-x-3">
          <a
            href="https://scholar.google.com/citations?hl=en&user=4g3-eUwAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 hover:bg-teal-500/20 transition-all"
          >
            Google Scholar (H-9)
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-3 text-sm text-slate-200">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-teal-400 transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-teal-400 transition-colors"
          >
            Projects
          </a>
          <a
            href="#publications"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-teal-400 transition-colors"
          >
            Publications
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-teal-400 transition-colors"
          >
            Experience & Education
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-teal-400 transition-colors"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
