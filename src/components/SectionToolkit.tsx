import React, { useState } from 'react';
import { SkillCategory } from '../types';

export default function SectionToolkit() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const categories: SkillCategory[] = [
    {
      num: '01',
      title: 'core languages',
      tag: '[FOUNDATIONAL]',
      items: [
        {
          name: 'Python',
          role: 'Scientific, ML, Scripting',
          details: 'Used for PyTorch embeddings, FastAPI microservices, and automated scraping pipelines in PREHIER.',
        },
        {
          name: 'C++ (C++17 / 20)',
          role: 'Systems, Performance',
          details: 'Core upstream contributions to nlohmann/json and Soup, lock-free queues, and cache-aligned memory.',
        },
        {
          name: 'C',
          role: 'Low-level, OS Principles',
          details: 'POSIX threading, socket multiplexing with epoll/kqueue, and memory mapping benchmarks.',
        },
        {
          name: 'SQL',
          role: 'Relational Schemas, Indexing',
          details: 'Complex index optimization, ACID compliance verification, and analytical vector queries.',
        },
      ],
    },
    {
      num: '02',
      title: 'ai & machine learning',
      tag: '[MODELS & MATH]',
      items: [
        {
          name: 'Scikit-learn & XGBoost',
          role: 'Tabular, Ensembles',
          details: 'Trained and calibrated gradient boosted decision trees with custom cross-validation and loss surfaces.',
        },
        {
          name: 'OpenCV',
          role: 'Image Processing & Filters',
          details: 'Real-time multi-threaded DNN inferencing, frame rectification, and Kalman filter SORT tracking at 44.8 FPS.',
        },
        {
          name: 'SHAP Explainability',
          role: 'Game-theoretic attribution',
          details: 'TreeSHAP polynomial approximations to deliver audited feature impact distributions for credit risk.',
        },
        {
          name: 'LLM App Architecture',
          role: 'RAG, Prompts, Embeddings',
          details: 'Vector database chunking strategies, dense retrieval, and dynamic question synthesis guardrails.',
        },
      ],
    },
    {
      num: '03',
      title: 'TOOLING & SYSTEMS',
      tag: '[DEPLOYMENT]',
      items: [
        {
          name: 'Streamlit & FastAPI',
          role: 'Microservices & Prototypes',
          details: 'Production-ready asynchronous endpoints, Swagger contract validation, and clean reactive analytical dashboards.',
        },
        {
          name: 'Git & GitHub Actions',
          role: 'CI/CD, Collaborative Dev',
          details: 'Matrix test runner across Clang, GCC, and MSVC; upstream pull request workflows; automated fuzzing.',
        },
        {
          name: 'Pandas & NumPy',
          role: 'Vectorized Data Wrangling',
          details: 'High-throughput data cleaning, SIMD-aligned vectorization, and financial feature engineering on 1M+ rows.',
        },
        {
          name: 'Linux / Bash',
          role: 'POSIX Environments',
          details: 'Kernel tracing with perf, valgrind memory leak profiling, systemd service management, and shell pipelines.',
        },
      ],
    },
  ];

  return (
    <section id="toolkit" className="w-full border-b border-[#121212]/15 bg-[#F8F7F3] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#121212]/15 pb-6">
          <div>
            <div className="font-mono text-xs font-semibold text-[#2563EB] tracking-wider uppercase mb-1">
              [04 // CAPABILITY INDEX]
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#121212] tracking-tight">
              ENGINEERING
              <br />
              TOOLKIT
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs text-[#121212]/60 uppercase text-left md:text-right">
            No arbitrary 90% progress bars. Only technologies backed by production implementations
            and verifiable repositories.
          </div>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.num}
              className="border border-[#121212]/20 bg-[#FDFCFB] p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-[#121212]/15 pb-4 mb-4 font-mono text-xs">
                  <h3 className="font-bold text-[#121212] uppercase tracking-wider">
                    {cat.num}. {cat.title}
                  </h3>
                  <span className="text-[#2563EB] font-bold text-[11px] tracking-wider">
                    {cat.tag}
                  </span>
                </div>

                {/* Capability Rows */}
                <div className="space-y-3 font-mono text-xs">
                  {cat.items.map((item) => {
                    const isSelected = selectedSkill === item.name;
                    return (
                      <div
                        key={item.name}
                        onClick={() => setSelectedSkill(isSelected ? null : item.name)}
                        data-cursor="TOOL"
                        className={`border p-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#2563EB] bg-[#EFF6FF]'
                            : 'border-[#121212]/15 bg-[#F8F7F3] hover:border-[#121212]/40 hover:bg-[#F2EFE9]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-[#121212] text-xs sm:text-[13px]">
                            {item.name}
                          </span>
                          <span className="text-[#121212]/60 text-[10px] text-right font-sans">
                            {item.role}
                          </span>
                        </div>

                        {isSelected && (
                          <div className="mt-2.5 pt-2 border-t border-[#2563EB]/20 text-[11px] font-sans text-[#121212]/85 leading-relaxed">
                            {item.details}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#121212]/10 text-[10px] font-mono text-[#121212]/50 text-right uppercase">
                Click any tool for proof context
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
