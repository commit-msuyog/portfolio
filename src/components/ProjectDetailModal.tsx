import React from 'react';
import { X, ArrowUpRight, CheckCircle2, Cpu, Database, GitBranch } from 'lucide-react';
import { ProjectItem, OpenSourceItem } from '../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  ossItem: OpenSourceItem | null;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export default function ProjectDetailModal({
  project,
  ossItem,
  onClose,
  onOpenTerminal,
}: ProjectDetailModalProps) {
  if (!project && !ossItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-6 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl border border-[#121212]/20 bg-[#F8F7F3] text-[#121212] shadow-2xl p-6 sm:p-10 my-auto relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="CLOSE"
          className="absolute top-5 right-5 p-2 text-[#121212]/60 hover:text-[#121212] hover:bg-[#121212]/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {project ? (
          <div>
            {/* Header Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-4">
              <span className="bg-[#121212] text-white px-2.5 py-0.5 font-bold uppercase tracking-wider text-[10px]">
                {project.tag}
              </span>
              <span className="text-[#121212]/40">·</span>
              <span className="text-[#121212]/75 uppercase">{project.category}</span>
              <span className="text-[#121212]/40">·</span>
              <span className="text-[#2563EB] font-bold">{project.year}</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#121212] tracking-tight mb-4">
              {project.title}
            </h2>

            <p className="font-sans text-base leading-relaxed text-[#121212]/85 mb-8">
              {project.summary}
            </p>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-[#121212]/15 bg-[#F2EFE9] p-5">
                <div className="font-mono text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
                  THE ARCHITECTURAL PROBLEM
                </div>
                <p className="font-sans text-sm text-[#121212]/80 leading-relaxed">
                  {project.details.problem}
                </p>
              </div>

              <div className="border border-[#121212]/15 bg-[#EFF6FF] p-5">
                <div className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">
                  THE ENGINEERING SOLUTION
                </div>
                <p className="font-sans text-sm text-[#121212]/80 leading-relaxed">
                  {project.details.solution}
                </p>
              </div>
            </div>

            {/* Technical Highlights */}
            <div className="mb-8">
              <div className="font-mono text-xs font-bold text-[#121212] uppercase tracking-wider mb-3">
                SYSTEM INVARIANTS &amp; IMPLEMENTATION HIGHLIGHTS
              </div>
              <ul className="space-y-2.5 font-sans text-sm text-[#121212]/80">
                {project.details.technicalHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benchmarks Strip */}
            <div className="border-t border-b border-[#121212]/15 py-4 mb-8">
              <div className="font-mono text-[11px] text-[#121212]/50 uppercase tracking-wider mb-3">
                VERIFIED BENCHMARKS
              </div>
              <div className="grid grid-cols-3 gap-4 font-mono">
                {project.details.benchmarkData.map((b, i) => (
                  <div key={i} className="border border-[#121212]/10 bg-white p-3 text-center">
                    <div className="text-[10px] text-[#121212]/60 uppercase">{b.label}</div>
                    <div className="text-base sm:text-lg font-bold text-[#121212] mt-0.5">
                      {b.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTAs */}
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <button
                onClick={() => {
                  onClose();
                  onOpenTerminal();
                }}
                data-cursor="QUERY"
                className="flex items-center gap-2 bg-[#2563EB] text-white px-5 py-2.5 font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors"
              >
                <span>Ask AI about {project.title}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <button
                onClick={onClose}
                className="text-[#121212]/70 hover:text-[#121212] uppercase font-bold"
              >
                Close Case Study
              </button>
            </div>
          </div>
        ) : (
          /* Open Source Deep Inspection */
          ossItem && (
            <div>
              <div className="flex items-center gap-3 text-xs font-mono mb-4">
                <span className="bg-emerald-600 text-white px-2.5 py-0.5 font-bold uppercase tracking-wider text-[10px]">
                  {ossItem.type}
                </span>
                <span className="text-[#121212]/40">·</span>
                <span className="text-[#121212]/75 uppercase">{ossItem.tag}</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#121212] tracking-tight mb-2">
                {ossItem.repo}
              </h2>
              <div className="font-mono text-xs text-[#2563EB] font-bold uppercase tracking-wider mb-4">
                {ossItem.subtitle} {ossItem.stars && `• ${ossItem.stars}`}
              </div>

              <p className="font-sans text-base leading-relaxed text-[#121212]/85 mb-6">
                {ossItem.description}
              </p>

              {/* Code Snippet */}
              {ossItem.codeSnippet && (
                <div className="bg-[#121212] text-white p-4 font-mono text-xs sm:text-sm mb-6 overflow-x-auto">
                  <div className="text-white/40 text-[10px] border-b border-white/10 pb-1.5 mb-2 uppercase">
                    Source Inspection
                  </div>
                  <pre className="text-emerald-400 leading-relaxed">{ossItem.codeSnippet}</pre>
                </div>
              )}

              {/* Verification Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#121212]/15 pt-4 mb-6 font-mono text-xs">
                <div className="border border-[#121212]/15 bg-white p-3">
                  <div className="text-[10px] text-[#121212]/50 uppercase">{ossItem.metadata.label1}</div>
                  <div className="font-bold text-[#121212] mt-1">{ossItem.metadata.value1}</div>
                </div>
                <div className="border border-[#121212]/15 bg-white p-3">
                  <div className="text-[10px] text-[#121212]/50 uppercase">{ossItem.metadata.label2}</div>
                  <div className="font-bold text-emerald-700 mt-1">{ossItem.metadata.value2}</div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => {
                    onClose();
                    onOpenTerminal();
                  }}
                  className="flex items-center gap-2 bg-[#121212] text-white px-5 py-2 font-bold uppercase tracking-wider hover:bg-[#2563EB] transition-colors"
                >
                  <span>Query Systems Details</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  className="text-[#121212]/70 hover:text-[#121212] uppercase font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
