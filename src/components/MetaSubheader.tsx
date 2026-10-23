import React from 'react';
import { ArrowDown } from 'lucide-react';

interface MetaSubheaderProps {
  onOpenArchive: () => void;
}

export default function MetaSubheader({ onOpenArchive }: MetaSubheaderProps) {
  return (
    <div className="w-full border-b border-[#121212]/15 bg-[#F8F7F3] py-2.5 text-[11px] font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-2 md:grid-cols-4 md:gap-x-6 items-center">
          {/* Item 1 */}
          <div>
            <span className="text-[#121212]/50 tracking-wider">[SPECIALIZATION]</span>
            <div className="font-medium text-[#121212] uppercase truncate">
              AI / ML + COMPUTER VISION + C++ SYSTEMS
            </div>
          </div>

          {/* Item 2 */}
          <div>
            <span className="text-[#121212]/50 tracking-wider">[CURRENT WORK]</span>
            <div className="font-medium text-[#121212] uppercase truncate">
              PREHIER ENGINE & OSS CORE
            </div>
          </div>

          {/* Item 3 */}
          <div>
            <span className="text-[#121212]/50 tracking-wider">[DEGREE / FOCUS]</span>
            <div className="font-medium text-[#121212] uppercase truncate">
              B.TECH CSE (AI/ML HONORS)
            </div>
          </div>

          {/* Item 4: Interactive trigger */}
          <div className="text-left md:text-right">
            <span className="text-[#121212]/50 tracking-wider">[INTERACTIVE]</span>
            <div>
              <button
                onClick={onOpenArchive}
                data-cursor="ARCHIVE"
                className="group inline-flex items-center gap-1 font-semibold text-[#121212] hover:text-[#2563EB] transition-colors uppercase"
              >
                <span>INDEX ARCHIVE</span>
                <ArrowDown className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
