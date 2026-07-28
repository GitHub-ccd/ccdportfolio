import React from "react";

export const metadata = {
  title: "Dr. Chamila C. Dharmawardhana | Healthcare Data Scientist & AI Researcher",
  description: "Personal portfolio of Dr. Chamila Chathuranga Dharmawardhana — Healthcare Data Scientist, Computational Physicist, and Health AI Researcher.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Background Subtle Gradient Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-slate-950 pointer-events-none -z-10" />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-bold text-lg tracking-tight text-teal-400 hover:text-teal-300 transition-colors">
            Dr. Chamila Dharmawardhana <span className="text-slate-400 font-normal text-xs ml-2 hidden sm:inline">Ph.D.</span>
          </a>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-teal-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-teal-400 transition-colors">Projects</a>
            <a href="#research" className="hover:text-teal-400 transition-colors">Publications</a>
            <a href="#experience" className="hover:text-teal-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a>
          </nav>
          <a
            href="https://scholar.google.com/citations?hl=en&user=4g3-eUwAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 hover:bg-teal-500/20 transition-all"
          >
            Google Scholar (H-9)
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-24">
        
        {/* HERO SECTION */}
        <section id="hero" className="space-y-8 pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Healthcare Data Scientist & Computational Physicist
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
              Transforming Complex Health & Physical Data into <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Actionable AI Solutions.</span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed">
              Ph.D. in Computational Physics with extensive experience bridging multi-scale computer simulations, machine learning algorithms, computer vision, and healthcare data science.
            </p>
          </div>

          {/* Tech & Domain Badges */}
          <div className="flex flex-wrap gap-2 text-xs">
            {["Health AI", "Medical Imaging (CNN)", "Bioinformatics", "FFT Protein Docking", "XGBoost & NLP", "PyTorch / TensorFlow", "Quantum Espresso / DFT"].map((badge) => (
              <span key={badge} className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                {badge}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-teal-500/20"
            >
              Explore Featured Projects
            </a>
            <a
              href="https://www.youtube.com/embed/2wWTxRMEA2g"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-sm font-medium transition-all"
            >
              🎬 Watch PhD Defense
            </a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="space-y-6 pt-12 border-t border-slate-900">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">About Me</h2>
          <div className="grid md:grid-cols-3 gap-8 text-slate-300 text-sm leading-relaxed">
            <div className="md:col-span-2 space-y-4">
              <p>
                All my life I have been passionate about mathematical modeling and working rigorously to solve complex real-world problems. I earned my <strong>Ph.D. in Physics</strong> (minor in Geosciences) from the University of Missouri - Kansas City under Prof. Wai-Yim Ching, concentrating on quantum and classical atomic simulations of materials.
              </p>
              <p>
                Following postdoctoral appointments at the University of Colorado Boulder, Georgetown University, and the Illinois Institute of Technology, I expanded into modern Machine Learning and Data Science (completing the Flatiron School Data Science program). 
              </p>
              <p>
                My work spans building FFT-based protein docking algorithms for biological complexes, chest X-ray deep learning classification models, emotion-recognition neural networks, and retail recommendation engines.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-slate-100 font-semibold text-base">Quick Statistics</h3>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span>Google Scholar Citations</span>
                  <span className="text-teal-400 font-bold">H-Index 9 | i10-Index 9</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span>Ph.D. Alma Mater</span>
                  <span className="text-slate-200 font-medium">UMKC (2015)</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span>Primary Stack</span>
                  <span className="text-slate-200 font-medium">Python, PyTorch, SQL</span>
                </li>
                <li className="flex justify-between">
                  <span>Research Gate</span>
                  <a href="https://www.researchgate.net/profile/Chamila_Dharmawardhana" target="_blank" rel="noopener noreferrer" className="text-teal-400 underline">Profile Link</a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section id="projects" className="space-y-8 pt-12 border-t border-slate-900">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Featured Case Studies</h2>
            <p className="text-slate-400 text-sm mt-1">End-to-end data science, health AI, and computational research projects.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Project 1 */}
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-4 hover:border-teal-500/40 transition-all group">
              <div className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Health AI & Medical Imaging
              </div>
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-teal-400 transition-colors">
                Pneumonia Detection from Chest X-Rays via Deep CNNs
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Automated diagnostic model evaluating lung X-ray scans using Convolutional Neural Networks to assist medical practitioners in identifying acute pneumonia infections.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">TensorFlow / Keras</span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">OpenCV</span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">Scikit-Learn</span>
              </div>
              <div className="pt-2 flex items-center space-x-4 text-xs font-medium">
                <a href="https://github.com/GitHub-ccd/pneumonia_detection_CNN_MOD_4" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                  GitHub Repository →
                </a>
                <a href="https://findingdata.blogspot.com/2020/08/new-post.html" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200">
                  Read Case Study
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-4 hover:border-teal-500/40 transition-all group">
              <div className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Bioinformatics & Structural Health
              </div>
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-teal-400 transition-colors">
                FFT-Based Protein Docking & Binding Affinity Simulation
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Developed Fast Fourier Transform (FFT) algorithms at Illinois Institute of Technology to evaluate binding affinity of protein complexes and streamline molecular docking pipelines.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">Python / NumPy</span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">Molecular Docking</span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">FFT Algorithms</span>
              </div>
              <div className="pt-2 text-xs text-slate-400">
                Research at Illinois Institute of Technology
              </div>
            </div>

            {/* Project 3 */}
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-4 hover:border-teal-500/40 transition-all group">
              <div className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Computer Vision & Affective Computing
              </div>
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-teal-400 transition-colors">
                Facial Emotion Classification & Journaling App
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transfer-learning Convolutional Neural Network trained to classify Paul Ekman’s 7 primary facial emotions (Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral) for emotion tracking.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">Django</span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">Keras / OpenCV</span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">Transfer Learning</span>
              </div>
              <div className="pt-2 flex items-center space-x-4 text-xs font-medium">
                <a href="https://github.com/GitHub-ccd/emoJ" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                  GitHub Repository →
                </a>
                <a href="https://findingdata.blogspot.com/2020/07/can-computers-really-tell-you-how-you.html" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200">
                  Read Blog Post
                </a>
              </div>
            </div>

            {/* Project 4 */}
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-4 hover:border-teal-500/40 transition-all group">
              <div className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Applied Machine Learning & NLP
              </div>
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-teal-400 transition-colors">
                Retail Recommendation Engines & Sentiment NLP
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Supervised and unsupervised ML models built at Promoboxx, featuring campaign recommendation systems (XGBoost) and consumer sentiment NLP pipelines (spaCy, NLTK).
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">XGBoost</span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">spaCy / NLTK</span>
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">ETL Pipelines</span>
              </div>
              <div className="pt-2 text-xs text-slate-400">
                Industry Analytics at Promoboxx
              </div>
            </div>

          </div>
        </section>

        {/* PEER REVIEWED PUBLICATIONS */}
        <section id="research" className="space-y-6 pt-12 border-t border-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Peer-Reviewed Publications</h2>
              <p className="text-slate-400 text-sm mt-1">Key scientific contributions in computational physics, materials science, and bio-simulations.</p>
            </div>
            <a
              href="https://scholar.google.com/citations?hl=en&user=4g3-eUwAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-400 font-semibold hover:underline"
            >
              View Full Google Scholar Profile →
            </a>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            
            <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800/60 space-y-1">
              <p className="font-semibold text-slate-200">
                Reactive modeling of Mo3Si oxidation and resulting silica morphology
              </p>
              <p className="text-xs text-slate-400">
                <u>Dharmawardhana CC</u>, Zhou J, Taylor M, Miao J, Perepezko JH, Heinz H. (2020) <em>Acta Materialia</em> 187, 93-102.
              </p>
              <a href="https://www.sciencedirect.com/science/article/abs/pii/S1359645420300732" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-teal-400 hover:underline pt-1">
                View Journal Article ↗
              </a>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800/60 space-y-1">
              <p className="font-semibold text-slate-200">
                Theoretical investigations of C-(A)-S-H (I) cement hydrates
              </p>
              <p className="text-xs text-slate-400">
                <u>Dharmawardhana CC</u>, Misra A, Ching WY. (2018) <em>Construction and Building Materials</em> 184:536-548.
              </p>
              <a href="https://www.sciencedirect.com/science/article/abs/pii/S095006181831660X" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-teal-400 hover:underline pt-1">
                View Journal Article ↗
              </a>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800/60 space-y-1">
              <p className="font-semibold text-slate-200">
                Quantitative characterization of high temperature oxidation using electron tomography
              </p>
              <p className="text-xs text-slate-400">
                Zhou J, Taylor M, Melinte GA, Shahani AJ, <u>Dharmawardhana CC</u>, Heinz H, Voorhees P, Perepezko J, Ercius P, Bustillo K, Miao J. (2018) <em>Nature Scientific Reports</em> 8:10239.
              </p>
              <a href="https://www.nature.com/articles/s41598-018-28348-3" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-teal-400 hover:underline pt-1">
                View Journal Article ↗
              </a>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800/60 space-y-1">
              <p className="font-semibold text-slate-200">
                Diffusion of Aqueous Solutions of Ionic, Zwitterionic, and Polar Solutes
              </p>
              <p className="text-xs text-slate-400">
                Teng X, Huang Q, <u>Dharmawardhana CC</u>, Ichiye T. (2018) <em>Journal of Chemical Physics</em> 148:222827.
              </p>
              <a href="https://aip.scitation.org/doi/abs/10.1063/1.5023004" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-teal-400 hover:underline pt-1">
                View Journal Article ↗
              </a>
            </div>

          </div>
        </section>

        {/* EXPERIENCE & EDUCATION TIMELINE */}
        <section id="experience" className="space-y-8 pt-12 border-t border-slate-900">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Experience & Education</h2>

          <div className="grid md:grid-cols-2 gap-8 text-sm">
            
            {/* Experience Column */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-teal-400 border-b border-slate-800 pb-2">Professional Experience</h3>
              
              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>Associate Data Scientist</span>
                  <span className="text-xs text-slate-400">2020 – Present</span>
                </div>
                <p className="text-xs text-teal-300">Promoboxx.com</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Supervised and unsupervised ML models, campaign recommendation engines (XGBoost), consumer sentiment NLP pipelines (spaCy, NLTK), and client A/B testing frameworks.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>Senior Research Associate</span>
                  <span className="text-xs text-slate-400">2019 – 2020</span>
                </div>
                <p className="text-xs text-teal-300">Illinois Institute of Technology</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  FFT-based protein binding affinity evaluation methods and automated docking simulation workflows for computational biology databases.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>Postdoctoral Fellow</span>
                  <span className="text-xs text-slate-400">2015 – 2019</span>
                </div>
                <p className="text-xs text-teal-300">CU Boulder / Georgetown University / IIT</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Atomic-scale computational modeling and materials physics research.
                </p>
              </div>
            </div>

            {/* Education Column */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-teal-400 border-b border-slate-800 pb-2">Education & Certificates</h3>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>Certificate in Data Science</span>
                  <span className="text-xs text-slate-400">2020</span>
                </div>
                <p className="text-xs text-slate-400">Flatiron School of Computing</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>Ph.D. in Physics (minor in Geosciences)</span>
                  <span className="text-xs text-slate-400">2015</span>
                </div>
                <p className="text-xs text-slate-400">University of Missouri - Kansas City (Advisor: Prof. Wai-Yim Ching)</p>
                <p className="text-xs text-slate-500 italic">Dissertation: Structure and mechanical properties of cement via ab initio simulations.</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>M.S. in Physics</span>
                  <span className="text-xs text-slate-400">2008</span>
                </div>
                <p className="text-xs text-slate-400">Central Michigan University (Advisor: Prof. K. A. Jackson)</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>B.S. in Physics & Mathematics</span>
                  <span className="text-xs text-slate-400">2005</span>
                </div>
                <p className="text-xs text-slate-400">University of Colombo, Sri Lanka</p>
              </div>

            </div>

          </div>
        </section>

        {/* CONTACT & FOOTER */}
        <section id="contact" className="space-y-6 pt-12 border-t border-slate-900 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Let's Connect</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Interested in collaborating on Healthcare Data Science, Medical AI, or Computational Biology research? Reach out!
          </p>
          <div className="flex justify-center space-x-6 text-sm font-medium pt-2">
            <a href="https://github.com/GitHub-ccd" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">GitHub</a>
            <a href="https://scholar.google.com/citations?hl=en&user=4g3-eUwAAAAJ" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">Google Scholar</a>
            <a href="https://www.researchgate.net/profile/Chamila_Dharmawardhana" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">ResearchGate</a>
          </div>
          <p className="text-slate-600 text-xs pt-8">
            © {new Date().getFullYear()} Dr. Chamila Chathuranga Dharmawardhana. All rights reserved.
          </p>
        </section>

      </main>
    </div>
  );
}
