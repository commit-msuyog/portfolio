import React from 'react';
import { X, ArrowUpRight, FileCode, Layers, ShieldCheck, Mail } from 'lucide-react';

interface IndexArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAnchor: (anchorId: string) => void;
  onOpenTerminal: () => void;
}

export default function IndexArchiveModal({
  isOpen,
  onClose,
  onSelectAnchor,
  onOpenTerminal,
}: IndexArchiveModalProps) {
  if (!isOpen) return null;

  const archiveEntries = [
    {
      index: '01',
      title: 'CRAFT OVER CONVENTION',
      category: 'ENGINEERING INTENT & PHILOSOPHY',
      year: '2025',
      anchor: 'intent',
      status: 'VERIFIABLE CODE',
    },
    {
      index: '02.1',
      title: 'PREHIER: CANDIDATE VECTOR EMBEDDING PIPELINE',
      category: 'AI INTERVIEW & SCREENING',
      year: '2024-2025',
      anchor: 'works',
      status: 'PRIVATE DEPLOYMENT',
    },
    {
      index: '02.2',
      title: 'INVESTIGATION SUPPORT SYSTEM (YOLOv8 + SORT)',
      category: 'COMPUTER VISION / OPENCV',
      year: '2024',
      anchor: 'works',
      status: '44.8 FPS PROTOTYPE',
    },
    {
      index: '02.3',
      title: 'CREDINSIGHT AI (XGBOOST + SHAP DECOMPOSITION)',
      category: 'EXPLAINABLE MACHINE LEARNING',
      year: '2024',
      anchor: 'works',
      status: 'AUC-ROC: 0.912',
    },
    {
      index: '03.1',
      title: 'NLOHMANN/JSON PULL REQUEST #FIX/PARSER-EDGE',
      category: 'OPEN SOURCE STEWARDSHIP',
      year: '2024',
      anchor: 'oss',
      status: 'MERGED UPSTREAM',
    },
    {
      index: '03.2',
      title: 'SOUP C++ SYSTEMS FRAMEWORK SOCKET ABSTRACTION',
      category: 'OPEN SOURCE STEWARDSHIP',
      year: '2024',
      anchor: 'oss',
      status: 'DETERMINISTIC MEMORY',
    },
    {
      index: '04',
      title: 'FULL CAPABILITY & TOOLKIT MATRIX',
      category: 'TECHNICAL ARTIFACTS',
      year: '2025',
      anchor: 'toolkit',
      status: '12 CORE TECHNOLOGIES',
    },
    {
      index: '05',
      title: 'INITIATE COLLABORATION & INQUIRY',
      category: 'DISPATCH',
      year: '2025',
      anchor: 'contact',
      status: '< 24H RESPONSE TIME',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl border border-[#121212]/30 bg-[#F8F7F3] text-[#121212] shadow-2xl p-6 sm:p-10 my-auto relative animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#121212]/15 pb-4 mb-6">
          <div>
            <div className="font-mono text-xs font-bold text-[#2563EB] uppercase tracking-wider">
              [MASTER ARCHIVE]
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#121212] tracking-tight">
              INDEX &amp; SYSTEM DIRECTORY
            </h2>
          </div>

          <button
            onClick={onClose}
            data-cursor="CLOSE"
            className="p-2 text-[#121212]/60 hover:text-[#121212] hover:bg-[#121212]/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#121212]/20 text-[#121212]/50 text-[10px] uppercase">
                <th className="py-2.5 pr-4">INDEX</th>
                <th className="py-2.5 px-4">SYSTEM / ARTIFACT</th>
                <th className="py-2.5 px-4 hidden md:table-cell">DOMAIN</th>
                <th className="py-2.5 px-4 hidden sm:table-cell">STATUS</th>
                <th className="py-2.5 pl-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#121212]/10">
              {archiveEntries.map((row) => (
                <tr
                  key={row.index}
                  onClick={() => {
                    onClose();
                    onSelectAnchor(row.anchor);
                  }}
                  data-cursor="GOTO"
                  className="hover:bg-[#121212]/5 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 pr-4 font-bold text-[#2563EB]">{row.index}</td>
                  <td className="py-3.5 px-4 font-bold text-[#121212] group-hover:text-[#2563EB] transition-colors">
                    {row.title}
                  </td>
                  <td className="py-3.5 px-4 text-[#121212]/70 hidden md:table-cell">
                    {row.category}
                  </td>
                  <td className="py-3.5 px-4 hidden sm:table-cell">
                    <span className="border border-[#121212]/15 bg-white px-2 py-0.5 text-[10px] uppercase font-semibold">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 pl-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#121212] group-hover:text-[#2563EB]">
                      <span>JUMP</span>
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Quick Tools */}
        <div className="mt-8 pt-4 border-t border-[#121212]/15 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                onClose();
                onOpenTerminal();
              }}
              data-cursor="CLI"
              className="flex items-center gap-1.5 font-bold text-[#2563EB] hover:underline uppercase"
            >
              <span>Open AI Terminal Query</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-[#121212]/70 hover:text-[#121212] uppercase font-bold"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}
