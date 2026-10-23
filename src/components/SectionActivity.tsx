import React from 'react';

export default function SectionActivity() {
  const proofItems = [
    {
      label: 'EDUCATION',
      main: 'B.Tech in CSE',
      sub: 'AI/ML Specialization',
    },
    {
      label: 'PROBLEM SOLVING',
      main: 'Algorithmic Practice',
      sub: 'Data Structures & DP',
    },
    {
      label: 'CODE HOSTING',
      main: 'GitHub Verified',
      sub: 'Active commit streaks',
    },
    {
      label: 'PEER CONTRIBUTIONS',
      main: '2+ Global Libraries',
      sub: 'Public Upstream PRs',
    },
  ];

  return (
    <section className="w-full border-b border-[#121212]/15 bg-[#F8F7F3] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Title */}
          <div className="lg:col-span-3">
            <div className="font-mono text-xs font-semibold text-[#2563EB] tracking-wider uppercase mb-1">
              [05 // VERIFIED PROOF]
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#121212] tracking-tight">
              academic &amp;
              <br />
              activity
            </h2>
          </div>

          {/* 4 Proof Cards */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            {proofItems.map((item) => (
              <div
                key={item.label}
                className="border border-[#121212]/20 bg-[#FDFCFB] p-5 flex flex-col justify-between hover:border-[#2563EB] transition-colors"
              >
                <div className="text-[10px] text-[#121212]/50 uppercase tracking-wider mb-3">
                  {item.label}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#121212] mb-1">{item.main}</div>
                  <div className="text-[11px] text-[#121212]/70 font-sans">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
