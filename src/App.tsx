import React, { useState } from 'react';
import Header from './components/Header';
import MetaSubheader from './components/MetaSubheader';
import Hero from './components/Hero';
import SectionIntent from './components/SectionIntent';
import SectionWorks from './components/SectionWorks';
import SectionOpenSource from './components/SectionOpenSource';
import SectionToolkit from './components/SectionToolkit';
import SectionActivity from './components/SectionActivity';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import TerminalModal from './components/TerminalModal';
import ProjectDetailModal from './components/ProjectDetailModal';
import IndexArchiveModal from './components/IndexArchiveModal';
import { ProjectItem, OpenSourceItem } from './types';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedOssItem, setSelectedOssItem] = useState<OpenSourceItem | null>(null);

  const handleSelectAnchor = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#121212] selection:bg-[#2563EB] selection:text-white relative">
      {/* unseen.co inspired dynamic fluid cursor */}
      <CustomCursor />

      {/* Top Header Bar */}
      <Header onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Meta Subheader Ribbon */}
      <MetaSubheader onOpenArchive={() => setIsArchiveOpen(true)} />

      {/* Hero Section with Brutalist SUYOG VerMa Typography */}
      <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Section 01: Engineering Intent & Philosophy */}
      <div id="intent">
        <SectionIntent />
      </div>

      {/* Section 02: Experiments & Systems (Premier, Investigation Support, CredInsight) */}
      <SectionWorks
        onSelectProject={(project) => {
          setSelectedProject(project);
          setSelectedOssItem(null);
        }}
      />

      {/* Section 03: Open Source Stewardship (nlohmann/json & Soup) */}
      <SectionOpenSource
        onInspectItem={(item) => {
          setSelectedOssItem(item);
          setSelectedProject(null);
        }}
      />

      {/* Section 04: Engineering Toolkit */}
      <SectionToolkit />

      {/* Section 05: Verified Academic Proof */}
      <SectionActivity />

      {/* Footer & Initiate Collaboration */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Interactive AI Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Detailed Project & Open Source Case Study Modal */}
      <ProjectDetailModal
        project={selectedProject}
        ossItem={selectedOssItem}
        onClose={() => {
          setSelectedProject(null);
          setSelectedOssItem(null);
        }}
        onOpenTerminal={() => {
          setSelectedProject(null);
          setSelectedOssItem(null);
          setIsTerminalOpen(true);
        }}
      />

      {/* Index Archive Drawer / Directory Modal */}
      <IndexArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        onSelectAnchor={handleSelectAnchor}
        onOpenTerminal={() => {
          setIsArchiveOpen(false);
          setIsTerminalOpen(true);
        }}
      />
    </div>
  );
}
