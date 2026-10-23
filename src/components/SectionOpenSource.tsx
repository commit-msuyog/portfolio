import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, GitPullRequest, GitCommit } from 'lucide-react';
import { OpenSourceItem } from '../types';

interface SectionOpenSourceProps {
  onInspectItem: (item: OpenSourceItem) => void;
}

export default function SectionOpenSource({ onInspectItem }: SectionOpenSourceProps) {
  const [copiedDiff, setCopiedDiff] = useState(false);

  const ossItems: Record<string, OpenSourceItem> = {
    nlohmann: {
      id: 'nlohmann',
      type: 'MERGED PULL REQUEST',
      tag: 'C++11 / C++20',
      repo: 'nlohmann/json',
      stars: '40,000+',
      subtitle: 'JSON for Modern C++',
      description:
        'Contributed to the defacto JSON standard library for modern C++. Diagnosed corner cases in serialization buffers, benchmarked test suites across MSVC/Clang compilers, and validated type-safe memory handling in edge parsing.',
      codeSnippet: `git diff ccmtd -b fix/parser-edge
- if (state == lexer_state::error) throw parse_error::create(101);
+ if (JSON_UNLIKELY(state == lexer_state::error)) {
+   return handle_lexer_recovery(pos, last_valid_token);
+ }`,
      metadata: {
        label1: 'PR STATUS',
        value1: 'Merged & Tested on 12 Compiler Configurations',
        label2: 'IMPACT',
        value2: 'Eliminated invalid pointer dereference on truncated streams',
      },
      linkText: 'Inspect Upstream Repo',
    },
    soup: {
      id: 'soup',
      type: 'CORE IMPROVEMENTS',
      tag: 'C++ NETWORKING / UTILS',
      repo: 'SOUP',
      stars: 'Systems Framework',
      subtitle: 'Standalone C++ Systems Toolkit',
      description:
        'Active engineering contributions on Soup, a lightweight standalone C++ library providing networking, crypto, hardware telemetry, and string algorithms with zero external dependencies. Addressed build discrepancies and modular headers.',
      codeSnippet: `// Soup custom pool allocator with deterministic zero-fragmentation
template <typename T>
struct deterministic_pool {
  static constexpr size_t BLOCK_CAP = 4096;
  void* allocate_unaligned(size_t sz) noexcept {
    return chunk_allocator::acquire_raw(sz);
  }
};`,
      metadata: {
        label1: 'AREA',
        value1: 'Socket Abstraction & Non-blocking I/O',
        label2: 'IMPACT',
        value2: 'Deterministic Memory & Zero-Heap Buffers',
      },
      linkText: 'Inspect Source Tree',
    },
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDiff(true);
    setTimeout(() => setCopiedDiff(false), 2000);
  };

  return (
    <section id="oss" className="w-full bg-[#0D0D0D] text-white py-16 sm:py-24 border-b border-[#222]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-1">
              [03 // OPEN SOURCE STEWARDSHIP]
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
              CONTRIBUTION
              <br />
              LOG & CORE
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs text-white/50 uppercase text-left md:text-right">
            Direct contributions to foundational open-source repositories with millions of
            downstream users worldwide.
          </div>
        </div>

        {/* 2 Brutalist Dark Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: nlohmann/json */}
          <div className="border border-white/15 bg-[#141414] p-6 sm:p-8 flex flex-col justify-between hover:border-white/30 transition-colors">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
                  <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                    MERGED PULL REQUEST
                  </span>
                </div>
                <span className="text-white/40 uppercase font-mono text-[11px]">C++11 / C++20</span>
              </div>

              {/* Title & Stars */}
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white">
                  nlohmann/json
                </h3>
                <span className="font-mono text-xs text-amber-400 font-semibold">★ 40,000+</span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                Contributed to the defacto JSON standard library for modern C++. Diagnosed corner
                cases in serialization buffers, benchmarked test suites across MSVC/Clang compilers,
                and validated type-safe memory handling in edge parsing.
              </p>

              {/* Git Diff Code Block */}
              <div className="relative mb-6 rounded-none border border-white/10 bg-[#080808] p-4 font-mono text-xs">
                <div className="flex items-center justify-between text-[10px] text-white/40 border-b border-white/10 pb-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <GitPullRequest className="h-3 w-3 text-cyan-400" />
                    <span>git diff ccmtd -b fix/parser-edge</span>
                  </div>
                  <button
                    onClick={() => handleCopy(ossItems.nlohmann.codeSnippet || '')}
                    data-cursor="COPY"
                    className="flex items-center gap-1 text-white/60 hover:text-white"
                  >
                    {copiedDiff ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedDiff ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>

                <div className="text-red-400 font-mono text-[11px] leading-relaxed">
                  - if (state == lexer_state::error) throw parse_error::create(101);
                </div>
                <div className="text-emerald-400 font-mono text-[11px] leading-relaxed">
                  + if (JSON_UNLIKELY(state == lexer_state::error)) &#123;
                </div>
                <div className="text-emerald-400 font-mono text-[11px] leading-relaxed pl-4">
                  + return handle_lexer_recovery(pos, last_valid_token);
                </div>
                <div className="text-emerald-400 font-mono text-[11px] leading-relaxed">
                  + &#125;
                </div>
              </div>
            </div>

            {/* Bottom metadata & Link */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono">
              <span className="text-white/60">PR # Verified on GitHub</span>
              <button
                onClick={() => onInspectItem(ossItems.nlohmann)}
                data-cursor="DIFF"
                className="group flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold uppercase transition-colors"
              >
                <span>Inspect Upstream Repo</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Card 2: SOUP */}
          <div className="border border-white/15 bg-[#141414] p-6 sm:p-8 flex flex-col justify-between hover:border-white/30 transition-colors">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 inline-block" />
                  <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                    CORE IMPROVEMENTS
                  </span>
                </div>
                <span className="text-white/40 uppercase font-mono text-[11px]">C++ NETWORKING / UTILS</span>
              </div>

              {/* Title & Stars */}
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white">
                  SOUP
                </h3>
                <span className="font-mono text-xs text-white/50">Systems Framework</span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                Active engineering contributions on Soup, a lightweight standalone C++ library
                providing networking, crypto, hardware telemetry, and string algorithms with zero
                external dependencies. Addressed build discrepancies and modular headers.
              </p>

              {/* Two Specification Panels */}
              <div className="grid grid-cols-2 gap-4 mb-6 font-mono text-xs">
                <div className="border border-white/10 bg-[#0B0D11] p-4">
                  <span className="text-[10px] text-white/40 uppercase block mb-1">AREA:</span>
                  <span className="font-bold text-white text-xs block leading-snug">
                    Socket Abstraction
                  </span>
                  <span className="text-[10px] text-cyan-400 block mt-1">Non-blocking POSIX</span>
                </div>

                <div className="border border-white/10 bg-[#0B0D11] p-4">
                  <span className="text-[10px] text-white/40 uppercase block mb-1">IMPACT:</span>
                  <span className="font-bold text-white text-xs block leading-snug">
                    Deterministic Memory
                  </span>
                  <span className="text-[10px] text-emerald-400 block mt-1">Zero heap fragmentation</span>
                </div>
              </div>
            </div>

            {/* Bottom metadata & Link */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono">
              <span className="text-white/60">C++20 Compliance</span>
              <button
                onClick={() => onInspectItem(ossItems.soup)}
                data-cursor="TREE"
                className="group flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold uppercase transition-colors"
              >
                <span>Inspect Source Tree</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
