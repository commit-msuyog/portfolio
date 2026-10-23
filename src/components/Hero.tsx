import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenTerminal }: HeroProps) {
  const tickerItems = [
    'PYTORCH & SCIKIT-LEARN',
    'C++ HIGH PERFORMANCE COMPUTING',
    'NLOHMANN/JSON CONTRIBUTOR',
    'EXPLAINABLE AI & SHAP',
    'COMPUTER VISION & OPENCV',
    'STREAMLIT & FASTAPI',
    'EMBEDDINGS & VECTOR DBN',
    'SOUP C++ FRAMEWORK',
    'DETERMINISTIC MEMORY',
  ];

  return (
    <section className="relative w-full border-b border-[#121212]/15 bg-[#F8F7F3] pt-10 sm:pt-14 pb-0 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Edition Label */}
        <div className="mb-4 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#121212]/70">
          <span className="font-semibold text-[#121212]">PORTFOLIO '25</span>
          <span className="text-[#121212]/40">·</span>
          <span>EDITION 01</span>
        </div>

        {/* Giant Architectural Headline: SUYOG VerMa */}
        <div className="relative select-none font-display font-black leading-[0.85] tracking-tighter text-[#121212]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(4.5rem,16vw,13.5rem)] font-extrabold uppercase tracking-tight"
          >
            SUYOG
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline text-[clamp(4.5rem,16vw,13.5rem)] tracking-tight -mt-2 sm:-mt-4 lg:-mt-8"
          >
            <span className="font-extrabold">V</span>
            <span className="text-stroke-dark font-extrabold transition-all hover:text-[#2563EB] hover:[-webkit-text-stroke-color:#2563EB]">
              er
            </span>
            <span className="font-extrabold">M</span>
            <span className="text-stroke-dark font-extrabold transition-all hover:text-[#2563EB] hover:[-webkit-text-stroke-color:#2563EB]">
              a
            </span>
          </motion.div>
        </div>

        {/* Split Subheadline and Philosophy Statement */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 sm:pb-16 items-start">
          <div className="lg:col-span-8">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-[1.15] text-[#121212] tracking-tight">
              COMPUTER SCIENCE STUDENT. AI/ML ENGINEER. OPEN-SOURCE CONTRIBUTOR.{' '}
              <span className="font-serif italic font-normal text-[#2563EB] normal-case tracking-normal">
                Building systems, breaking models,
              </span>{' '}
              UNDERSTANDING WHY THEY OPERATE.
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-1 lg:pt-2">
            <p className="text-sm font-sans leading-relaxed text-[#121212]/80">
              Rejecting cookie-cutter SaaS templates in favor of deterministic engineering,
              explainable AI architectures, and low-latency C++ implementations.
            </p>

            <div className="mt-6 pt-2">
              <button
                onClick={onOpenTerminal}
                data-cursor="CLI"
                className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#121212] hover:text-[#2563EB] transition-colors"
              >
                <span className="h-2 w-2 rounded-full bg-[#2563EB] group-hover:scale-125 transition-transform" />
                <span>START TERMINAL CONVERSATION WITH AI</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kinetic Infinite Ticker Ribbon */}
      <div className="w-full border-t border-[#121212]/15 bg-[#F2EFE9] py-3 overflow-hidden select-none">
        <div className="animate-ticker flex items-center whitespace-nowrap text-xs font-mono font-medium tracking-wider text-[#121212]/80 uppercase">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center mx-3">
              <span className="text-[#121212]/40 mr-3">●</span>
              <span className="hover:text-[#2563EB] transition-colors">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
