import React from 'react';

export default function SectionIntent() {
  return (
    <section className="w-full border-b border-[#121212]/15 bg-[#F8F7F3] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Metadata & Philosophy */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs font-semibold text-[#2563EB] tracking-wider uppercase mb-2">
                [01 // INTENT]
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#121212] tracking-tight leading-none mb-8">
                CRAFT OVER
                <br />
                CONVENTION
              </h2>

              <div className="space-y-2 border-t border-[#121212]/15 pt-6 font-mono text-xs text-[#121212]/70 uppercase">
                <div className="flex justify-between sm:justify-start sm:gap-4">
                  <span className="text-[#121212]/40">ACADEMIC TRACK:</span>
                  <span className="text-[#121212] font-semibold">CSE AI/ML</span>
                </div>
                <div className="flex justify-between sm:justify-start sm:gap-4">
                  <span className="text-[#121212]/40">STATUS:</span>
                  <span className="text-[#121212] font-semibold">UNDERGRADUATE</span>
                </div>
                <div className="flex justify-between sm:justify-start sm:gap-4">
                  <span className="text-[#121212]/40">PHILOSOPHY:</span>
                  <span className="text-[#121212] font-semibold">VERIFIABLE CODE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Statement & Detailed Prose */}
          <div className="lg:col-span-8">
            {/* The Big Architectural Manifesto Quote */}
            <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-[1.12] text-[#121212] tracking-tight mb-10 sm:mb-12">
              "MOST MACHINE LEARNING PORTFOLIOS LOOK LIKE IDENTICAL CLONES OF THE SAME KAGGLE NOTEBOOK. I CARE ABOUT WHAT HAPPENS WHEN ALGORITHMS COLLIDE WITH REAL-WORLD INFRASTRUCTURE."
            </blockquote>

            {/* Two-column Body Narrative */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-[#121212]/85 font-sans">
              <div className="space-y-4">
                <p>
                  As a Computer Science student specializing in AI & Machine Learning, my
                  engineering work balances rigorous mathematical foundations with practical,
                  deployable systems. I don't build vaporware or wrapper apps with zero substance.
                </p>
                <p>
                  Whether implementing multi-stage feature attribution for credit-risk evaluation
                  or profiling memory overhead in open-source C++ JSON parsers, my focus is on{' '}
                  <strong className="text-[#121212] font-semibold">
                    transparency, efficiency, and verifiable performance
                  </strong>
                  .
                </p>
              </div>

              <div className="space-y-6">
                <p>
                  I spend equal parts of my week reading research papers, benchmarking vision
                  pipelines in OpenCV, and submitting pull requests to foundational libraries used
                  by millions of developers worldwide.
                </p>

                {/* Key Tenets Box */}
                <div className="border border-[#121212]/20 bg-[#F2EFE9] p-5 font-sans text-xs">
                  <div className="font-mono text-[11px] font-bold text-[#121212] uppercase tracking-wider mb-2">
                    KEY TENETS
                  </div>
                  <ul className="space-y-2 text-[#121212]/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[#2563EB] font-bold">•</span>
                      <span>
                        <strong className="text-[#121212]">No black boxes:</strong> explainability built-in.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#2563EB] font-bold">•</span>
                      <span>
                        <strong className="text-[#121212]">Systems-level discipline</strong> applied to data pipelines.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#2563EB] font-bold">•</span>
                      <span>
                        <strong className="text-[#121212]">Open-source stewardship</strong> over vanity metrics.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
