"use client";

import React, { useState } from "react";
import resumeData from "../data/resume.json";
import { getAssetPath } from "../utils/basePath";

export default function ExperienceTimeline() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [activePdfModal, setActivePdfModal] = useState(null);

  const handleCopyTextResume = () => {
    navigator.clipboard.writeText(resumeData.plainTextResume);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper to check if item matches search query
  const matchesSearch = (text) => {
    if (!searchQuery) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const roles = [
    {
      id: "nordic",
      title: "Data Scientist",
      company: "Nordic Global",
      period: "Jan 2024 – Present",
      isCurrent: true,
      category: "health",
      description: "Leading healthcare data science initiatives, advanced predictive modeling, supervised and unsupervised machine learning algorithms, and clinical analytics across enterprise healthcare datasets.",
      skills: ["Healthcare ML", "Predictive Modeling", "Supervised Learning", "Clinical Analytics", "Python", "SQL"]
    },
    {
      id: "bsmh",
      title: "Data Scientist",
      company: "Bon Secours Mercy Health",
      period: "Jan 2022 – Dec 2023",
      isCurrent: false,
      category: "health",
      description: "Architected healthcare data pipelines, patient outcome modeling, statistical intelligence frameworks, and clinical machine learning models across major health system datasets.",
      skills: ["Healthcare Pipelines", "Patient Outcomes", "Statistical Modeling", "Python", "SQL", "Clinical Data"]
    },
    {
      id: "promoboxx",
      title: "Associate Data Scientist",
      company: "Promoboxx (Boston, MA)",
      period: "Nov 2020 – Jan 2022",
      isCurrent: false,
      category: "industry",
      bullets: [
        "Developed supervised & unsupervised machine learning models generating business value for enterprise marketing clients.",
        "Built recommendation engines utilizing Python, NumPy, Pandas, Scikit-Learn, and XGBoost.",
        "Architected A/B testing frameworks and deployed NLP models (spaCy, NLTK, Scikit-Learn) for consumer sentiment analysis."
      ],
      skills: ["XGBoost", "spaCy", "NLTK", "Scikit-Learn", "Recommendation Engines", "A/B Testing", "Python"]
    },
    {
      id: "iit",
      title: "Senior Research Associate",
      company: "Illinois Institute of Technology (Chicago, IL)",
      period: "2019 – 2020",
      isCurrent: false,
      category: "physics",
      bullets: [
        "Developed Fast Fourier Transform (FFT) algorithms in Python/NumPy to evaluate protein-protein docking binding affinities.",
        "Engineered automated workflow scripts to streamline docking simulations across large biological databases."
      ],
      skills: ["FFT Algorithms", "Protein Docking", "Biopython", "Python", "NumPy", "Pandas", "Bioinformatics"]
    },
    {
      id: "georgetown",
      title: "Postdoctoral Researcher",
      company: "Georgetown University (Washington, D.C.)",
      period: "2017 – 2019",
      isCurrent: false,
      category: "physics",
      description: "Developed computational biomolecular simulation methods, added potential terms to the CHARMM package for ionic solution simulations, and collaborated with NIH Laboratory of Computational Biology.",
      skills: ["CHARMM", "Biomolecular Simulations", "NIH Collaboration", "Ionic Solutions", "C/Fortran/Python"]
    },
    {
      id: "cuboulder",
      title: "Postdoctoral Fellow",
      company: "University of Colorado Boulder (Boulder, CO)",
      period: "2016 – 2017",
      isCurrent: false,
      category: "physics",
      description: "Constructed force fields for high-temperature Mo-Si-B super-alloys under ONR MURI grant across 5 universities, performing multi-million atom supercomputer simulations on ALCF & NERSC.",
      skills: ["Force Field Modeling", "Mo-Si-B Alloys", "HPC Linux", "ALCF & NERSC Supercomputers", "ONR Grant"]
    }
  ];

  const filteredRoles = roles.filter(role => {
    const matchesCategory = activeTab === "all" || 
      (activeTab === "health" && (role.category === "health" || role.category === "industry")) ||
      (activeTab === "physics" && role.category === "physics");
    
    const roleContent = `${role.title} ${role.company} ${role.description || ''} ${(role.bullets || []).join(' ')} ${role.skills.join(' ')}`;
    return matchesCategory && matchesSearch(roleContent);
  });

  return (
    <section id="experience" className="space-y-8 pt-12 border-t border-slate-900">
      
      {/* SECTION HEADER & RECRUITER ACTION TOOLBAR */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold border border-teal-500/20 mb-2">
              Interactive Recruiter Dashboard
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Experience & Credentials</h2>
            <p className="text-slate-400 text-sm mt-1">
              Healthcare data science leadership, industry machine learning, and computational physics appointments.
            </p>
          </div>

          {/* DUAL CV DOWNLOAD & COPY RECRUITER BUTTONS */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <a
              href={getAssetPath(resumeData.cvFiles.twoPageExecutivePdf)}
              download="Dr_Chamila_Dharmawardhana_Executive_CV.pdf"
              className="px-3.5 py-2 rounded-lg bg-teal-500 text-slate-950 hover:bg-teal-400 transition-all font-bold flex items-center gap-1.5 shadow-md shadow-teal-500/10"
              title="Download 2-Page Executive Recruiter Summary PDF"
            >
              <span>📄 2-Page Executive CV</span>
            </a>

            <a
              href={getAssetPath(resumeData.cvFiles.fullAcademicPdf)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:border-slate-700 hover:text-white transition-all flex items-center gap-1.5"
              title="Download Full Technical / Academic CV PDF"
            >
              <span>📚 Full Academic CV</span>
            </a>

            <button
              onClick={handleCopyTextResume}
              className={`px-3.5 py-2 rounded-lg border transition-all flex items-center gap-1.5 ${
                isCopied
                  ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold"
                  : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
              }`}
              title="Copy ATS-friendly Plain-Text Resume to Clipboard"
            >
              <span>{isCopied ? "✓ Copied to Clipboard!" : "📋 Copy ATS Text"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all print:hidden"
              title="Print 2-Page CV Document"
            >
              <span>🖨️ Print 2-Page CV</span>
            </button>
          </div>
        </div>

        {/* SEARCH INPUT & DOMAIN TABS */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
          
          {/* Keyword Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search skills or roles (e.g. XGBoost, Healthcare, FFT, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-teal-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-[11px] text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Category Tabs */}
          <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs font-medium self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === "all" ? "bg-teal-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All Roles ({roles.length})
            </button>
            <button
              onClick={() => setActiveTab("health")}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === "health" ? "bg-teal-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Health & ML
            </button>
            <button
              onClick={() => setActiveTab("physics")}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === "physics" ? "bg-teal-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Physics & Postdocs
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === "education" ? "bg-teal-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Education
            </button>
          </div>
        </div>
      </div>

      {/* WORK EXPERIENCE LIST */}
      {activeTab !== "education" ? (
        <div className="space-y-6">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3 hover:border-teal-500/30 transition-all group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors">
                  {role.title}
                </h3>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                  role.isCurrent
                    ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                    : "bg-slate-950 text-slate-400 border-slate-800"
                }`}>
                  {role.period}
                </span>
              </div>
              <p className="text-sm font-semibold text-teal-300">{role.company}</p>
              
              {role.description && (
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {role.description}
                </p>
              )}

              {role.bullets && (
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-400 space-y-1.5 leading-relaxed">
                  {role.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}

              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                {role.skills.map((skill) => {
                  const isHighlighted = searchQuery && skill.toLowerCase().includes(searchQuery.toLowerCase());
                  return (
                    <span
                      key={skill}
                      className={`px-2.5 py-0.5 rounded border transition-all ${
                        isHighlighted
                          ? "bg-teal-500 text-slate-950 border-teal-400 font-bold scale-105"
                          : "bg-slate-950 text-slate-400 border-slate-800"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredRoles.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No positions found matching "{searchQuery}".
            </div>
          )}
        </div>
      ) : (
        /* EDUCATION & HONORS GRID */
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Doctoral Degree</span>
              <h3 className="text-base font-bold text-slate-100">Ph.D. in Computational Physics (2011 – 2015)</h3>
              <p className="text-xs text-slate-300">University of Missouri - Kansas City</p>
              <p className="text-xs text-slate-400 italic">Ab-initio quantum simulations & electronic structure of cement hydrates and Mo-Si-B alloys (Advisor: Prof. Wai-Yim Ching).</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Data Science Credential</span>
              <h3 className="text-base font-bold text-slate-100">Data Science Program (2020)</h3>
              <p className="text-xs text-slate-300">Flatiron School</p>
              <p className="text-xs text-slate-400">Supervised/unsupervised machine learning, deep learning computer vision (CNNs), and natural language processing.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Master's Degree</span>
              <h3 className="text-base font-bold text-slate-100">M.S. in Theoretical & Mathematical Physics (2006 – 2008)</h3>
              <p className="text-xs text-slate-300">Central Michigan University</p>
              <p className="text-xs text-slate-400 italic">DFT gas-phase calculations and optical characterization of chalcogenide glasses.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Bachelor's Degree & Diploma</span>
              <h3 className="text-base font-bold text-slate-100">B.S. in Physics & Mathematics (2001 – 2005)</h3>
              <p className="text-xs text-slate-300">University of Colombo, Sri Lanka</p>
              <p className="text-xs text-slate-400">Diploma in Computer Systems Design (NIBM, 2000–2001).</p>
            </div>
          </div>

          {/* Honors & Awards Box */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>🏆</span> Honors & Academic Scholarships
            </h3>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 space-y-1">
              <li><strong>Lester Touby Kurtz Scholarship</strong> in Graduate Physics</li>
              <li><strong>Wai-Yim Ching and Mon Yin Lung Scholarship</strong> in Physics</li>
            </ul>
          </div>
        </div>
      )}

      {/* FULLSCREEN PDF PREVIEW MODAL */}
      {activePdfModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
          onClick={() => setActivePdfModal(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 space-y-4 shadow-2xl h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-200">
                {activePdfModal === '2page' ? "2-Page Executive CV (PDF)" : "Full Academic / Technical CV (PDF)"}
              </h4>
              <div className="flex items-center space-x-2">
                <a
                  href={getAssetPath(activePdfModal === '2page' ? resumeData.cvFiles.twoPageExecutivePdf : resumeData.cvFiles.fullAcademicPdf)}
                  download
                  className="px-3 py-1 text-xs font-semibold rounded bg-teal-500 text-slate-950 font-bold hover:bg-teal-400"
                >
                  Download PDF
                </a>
                <button
                  onClick={() => setActivePdfModal(null)}
                  className="px-3 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
              <iframe
                src={getAssetPath(activePdfModal === '2page' ? resumeData.cvFiles.twoPageExecutivePdf : resumeData.cvFiles.fullAcademicPdf)}
                className="w-full h-full border-none"
                title="CV Document Preview"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
