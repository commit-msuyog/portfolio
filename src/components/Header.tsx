import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenTerminal: () => void;
}

export default function Header({ onOpenTerminal }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#121212]/15 bg-[#F8F7F3]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 text-xs font-mono">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2 tracking-tight">
          <span className="h-2 w-2 rounded-full bg-[#121212] inline-block" />
          <a
            href="#"
            className="font-bold text-[#121212] tracking-wider hover:opacity-80 transition-opacity"
            data-cursor="TOP"
          >
            SUYOG VERMA
          </a>
          <span className="text-[#121212]/40 hidden sm:inline">/</span>
          <span className="text-[#121212]/70 hidden sm:inline uppercase">AI & SYSTEMS SPEC.</span>
        </div>

        {/* Center: Live Telemetry Metadata */}
        <div className="hidden lg:flex items-center gap-6 text-[#121212]/75">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 inline-block" />
            <span className="uppercase tracking-tight">STATUS: ACTIVE IN OPEN SOURCE</span>
          </div>
          <span className="text-[#121212]/30">·</span>
          <div>LOC: 28.6139° N, 77.2090° E</div>
          <span className="text-[#121212]/30">·</span>
          <div>YEAR: 2025</div>
        </div>

        {/* Right: Navigation Links & Ask AI CTA */}
        <div className="flex items-center gap-5 sm:gap-6">
          <nav className="hidden md:flex items-center gap-5 tracking-tight uppercase">
            <a
              href="#works"
              className="text-[#121212]/80 hover:text-[#121212] hover:underline transition-colors"
              data-cursor="GO TO"
            >
              WORKS <span className="text-[#121212]/50">[03]</span>
            </a>
            <a
              href="#oss"
              className="text-[#121212]/80 hover:text-[#121212] hover:underline transition-colors"
              data-cursor="GO TO"
            >
              OSS
            </a>
            <a
              href="#toolkit"
              className="text-[#121212]/80 hover:text-[#121212] hover:underline transition-colors"
              data-cursor="GO TO"
            >
              TOOLKIT
            </a>
            <a
              href="#contact"
              className="text-[#121212]/80 hover:text-[#121212] hover:underline transition-colors"
              data-cursor="GO TO"
            >
              CONTACT
            </a>
          </nav>

          {/* Ask AI Pill Button */}
          <button
            onClick={onOpenTerminal}
            data-cursor="ASK AI"
            className="group flex items-center gap-1.5 rounded-full bg-[#121212] px-3.5 py-1.5 text-white transition-all hover:bg-[#2563EB] active:scale-95 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:bg-white transition-colors" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">ASK MY AI</span>
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
