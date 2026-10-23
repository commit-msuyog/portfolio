import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

interface FooterProps {
  onOpenTerminal: () => void;
}

export default function Footer({ onOpenTerminal }: FooterProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = 'suyogverma0057@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <footer id="contact" className="w-full bg-[#F8F7F3] pt-16 sm:pt-24 pb-12 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Collaboration Tag */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#121212]">
          <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
          <span className="font-bold">INITIATE COLLABORATION</span>
        </div>

        {/* Giant Display Typography */}
        <div className="font-display text-[clamp(2.75rem,8.5vw,7.5rem)] font-black uppercase leading-[0.92] tracking-tighter text-[#121212] mb-12 sm:mb-16">
          <div>GOT A GOOD</div>
          <div>
            <span className="text-[#2563EB] inline-block hover:scale-[1.01] transition-transform">
              PROBLEM?
            </span>
          </div>
          <div>LET'S BUILD.</div>
        </div>

        {/* Contact Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[#121212]/15 pt-8 sm:pt-12 items-end">
          {/* Left Notes */}
          <div className="lg:col-span-7 space-y-4 font-sans text-sm text-[#121212]/80 leading-relaxed">
            <p className="max-w-xl">
              Open to technical internships, research assistantships, AI system development, and
              open-source collaborations. Currently available for Summer &amp; Fall 2025 opportunities.
            </p>
            <div className="font-mono text-xs font-semibold uppercase text-[#121212]">
              RESPONSE TIME: &lt; 24 HOURS
            </div>
          </div>

          {/* Right Direct Links */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
            {/* Email with copy button */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={handleCopyEmail}
                data-cursor="EMAIL"
                className="group flex items-center gap-2 font-mono text-lg sm:text-xl font-bold text-[#121212] hover:text-[#2563EB] transition-colors"
              >
                <span>{email}</span>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={handleCopyEmail}
                data-cursor="COPY"
                title="Copy Email"
                className="p-1 text-[#121212]/50 hover:text-[#121212]"
              >
                {copiedEmail ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            {copiedEmail && (
              <span className="text-xs font-mono text-emerald-700 font-semibold mb-2">
                ✓ Copied email to clipboard
              </span>
            )}

            {/* Social & Terminal links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider text-[#121212]/70 pt-1">
              <a
                href="https://github.com/commit-msuyog"
                target="_blank"
                rel="noreferrer"
                data-cursor="GITHUB"
                className="hover:text-[#121212] hover:underline"
              >
                GitHub
              </a>
              <span className="text-[#121212]/30">·</span>
              <a
                href="https://www.linkedin.com/in/suyog01/"
                target="_blank"
                rel="noreferrer"
                data-cursor="LINKEDIN"
                className="hover:text-[#121212] hover:underline"
              >
                LinkedIn
              </a>
              <span className="text-[#121212]/30">·</span>
              <button
                onClick={onOpenTerminal}
                data-cursor="CHAT"
                className="group flex items-center gap-1 font-bold text-[#2563EB] hover:text-[#121212] transition-colors"
              >
                <span>Speak with Portfolio AI</span>
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits Line */}
        <div className="mt-14 pt-6 border-t border-[#121212]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-[#121212]/60 uppercase">
          <div>© 2025 SUYOG VERMA. DESIGNED WITH ART DIRECTION &amp; CODE.</div>
          <div>BUILT ON LINUX • LATENCY OPTIMIZED • ZERO TRACKERS</div>
        </div>
      </div>
    </footer>
  );
}
