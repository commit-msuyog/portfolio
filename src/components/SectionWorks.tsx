import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Play, Pause, RefreshCw, Sliders, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../types';

interface SectionWorksProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function SectionWorks({ onSelectProject }: SectionWorksProps) {
  // --- PREHIER Interactive State ---
  const [candidateProfile, setCandidateProfile] = useState<'senior' | 'ml' | 'distributed'>('senior');
  const candidateData = {
    senior: {
      title: 'Senior Systems Eng',
      level: 'Level 4 (Senior Systems Eng)',
      tokens: '4,120 TOKENS',
      similarity: '0.942',
      prompt: 'Synthesizing question difficulty curve based on candidate seniority profile: Level 4 (Senior Systems Eng)',
      questionSample: 'Describe cache-invalidation strategies in multi-producer shared-memory queues under high write contention.',
    },
    ml: {
      title: 'ML Research Engineer',
      level: 'Level 3 (Applied ML)',
      tokens: '3,890 TOKENS',
      similarity: '0.918',
      prompt: 'Synthesizing mathematical question set: Gradient attribution & pruning in transformer heads.',
      questionSample: 'How do you mitigate covariance shift in streaming computer vision embeddings under lighting drift?',
    },
    distributed: {
      title: 'Distributed Core Lead',
      level: 'Level 5 (Principal Architect)',
      tokens: '5,210 TOKENS',
      similarity: '0.965',
      prompt: 'Targeting Raft consensus corner cases and zero-copy IPC socket telemetry.',
      questionSample: 'Explain split-brain recovery procedures when quorum loss coincides with persistent disk corruption.',
    },
  };

  // --- Investigation Support System Interactive State ---
  const [currentCam, setCurrentCam] = useState<'CAM_NORTH_02' | 'CAM_METRO_07' | 'CAM_PLAZA_01'>('CAM_NORTH_02');
  const [isVisionPlaying, setIsVisionPlaying] = useState(true);
  const [detectionConfidence, setDetectionConfidence] = useState(0.94);
  const [fps, setFps] = useState(44.8);
  const [boxOffset, setBoxOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isVisionPlaying) return;
    const interval = setInterval(() => {
      // Subtle real-time oscillation simulating camera object tracking
      const t = Date.now() / 1000;
      setBoxOffset({
        x: Math.sin(t * 1.5) * 16,
        y: Math.cos(t * 1.2) * 10,
      });
      setFps(Number((44.2 + Math.random() * 0.9).toFixed(1)));
      setDetectionConfidence(Number((0.92 + Math.random() * 0.05).toFixed(2)));
    }, 150);
    return () => clearInterval(interval);
  }, [isVisionPlaying]);

  // --- CredInsight AI Interactive State ---
  const [dti, setDti] = useState(0.384); // Debt-to-income risk (+ is risk)
  const [reserves, setReserves] = useState(-0.412); // Liquid reserves (- mitigates risk)
  const [history, setHistory] = useState(-0.298); // Regularity (- mitigates risk)

  const netShap = dti + reserves + history;
  const isApproved = netShap < 0;
  const confidencePercent = Math.min(99.2, Math.max(78.5, Math.abs(netShap * 80 + 60))).toFixed(1);

  // Projects data for modals
  const projectsData: Record<string, ProjectItem> = {
    prehier: {
      id: 'prehier',
      tag: 'FEATURED 01',
      category: 'AI INTERVIEW & SCREENING',
      year: '2024-2025',
      title: 'PREHIER',
      summary:
        'An intelligent candidate evaluation engine that replaces generic keyword filtering with deep semantic resume-to-role vector alignment, dynamic adaptive question generation, and real-time candidate assessment analytics.',
      architecture: {
        stack1: 'Python / FastAPI / Streamlit UI',
        stack2: 'LangChain / Vector DB',
        stack3: 'Semantic Scoring',
      },
      status: 'Private Deployment',
      figNumber: 'FIG 1.0',
      figTitle: 'CANDIDATE VECTOR EMBEDDING ATTRIBUTION PIPELINE',
      figMetric: 'ACCURACY 94.2%',
      details: {
        problem:
          'Traditional ATS platforms rely on brittle keyword matching that rejects exceptional engineers with non-standard resumes while passing unqualified candidates who keyword-stuffed their profiles.',
        solution:
          'Engineered a multi-phase vector pipeline using chunked semantic embeddings, dimensional reduction, and cosine distance clustering against indexed job specifications.',
        technicalHighlights: [
          'Dual-stage embedding pipeline with localized embedding caching for <150ms retrieval.',
          'Dynamic prompt synthesis generating technical questions calibrated to the candidate’s specific code samples.',
          'Anti-hallucination guardrails verifying candidate answers against canonical technical documentation.',
        ],
        benchmarkData: [
          { label: 'Evaluation Latency', value: '142ms' },
          { label: 'Keyword Bypass Precision', value: '94.2%' },
          { label: 'Candidate Calibration Agreement', value: '89.7%' },
        ],
      },
    },
    investigation: {
      id: 'investigation',
      tag: 'PROJECT 02',
      category: 'COMPUTER VISION / OPENCV',
      year: '2024',
      title: 'INVESTIGATION SUPPORT SYSTEM',
      summary:
        'Automated video surveillance triage and object tracking tool designed for forensic video analysis. Detects suspicious anomalies, tags moving objects across frame sequences, and optimizes processing speed using OpenCV multithreading.',
      architecture: {
        stack1: 'Python / OpenCV / Multithreaded Video Triage',
        stack2: 'YOLOv8 Inference',
        stack3: 'SORT Tracking',
      },
      status: 'Production Prototype',
      figNumber: 'FIG 2.0',
      figTitle: 'MULTI-STREAM FORENSIC VIDEO ANALYTICS & BOUNDING RECTIFICATION',
      figMetric: '44.6 FPS ACCELERATED',
      details: {
        problem:
          'Investigators manually scrub hundreds of hours of raw CCTV surveillance footage, causing cognitive fatigue and missed investigative windows.',
        solution:
          'Architected an end-to-end forensic triage engine that decouples frame ingestion, YOLOv8 object detection, and SORT Kalman-filter tracking onto worker thread pools.',
        technicalHighlights: [
          'Multithreaded ring-buffer frame queue preventing I/O starvation on 4K multi-camera streams.',
          'Spatial trajectory extrapolation predicting object entry/exit points between camera blind spots.',
          'Automated anomaly timestamp logging with bounding box coordinate rectification.',
        ],
        benchmarkData: [
          { label: 'Throughput', value: '44.8 FPS' },
          { label: 'Frame Ingestion Latency', value: '22ms' },
          { label: 'Multi-stream Concurrency', value: '4 Simultaneous Feeds' },
        ],
      },
    },
    credinsight: {
      id: 'credinsight',
      tag: 'PROJECT 03',
      category: 'EXPLAINABLE MACHINE LEARNING',
      year: '2024',
      title: 'CREDINSIGHT AI',
      summary:
        'Transparent, accountable credit-risk classification built to combat algorithmic bias. Employs XGBoost and tree ensembles paired with SHAP (Shapley Additive exPlanations) for human-interpretable credit scoring.',
      architecture: {
        stack1: 'Scikit-learn / Pandas / NumPy',
        stack2: 'XGBoost',
        stack3: 'SHAP / Explainability',
      },
      status: 'Dataset: Kaggle / LendingClub',
      figNumber: 'FIG 3.0',
      figTitle: 'SHAPLEY VALUE DECOMPOSITION & RISK INTERVALS',
      figMetric: 'AUC-ROC: 0.912',
      details: {
        problem:
          'Deep neural models and black-box gradient boosters in financial underwriting expose institutions to regulatory non-compliance and implicit demographic bias.',
        solution:
          'Integrated TreeSHAP algorithm directly into the XGBoost inference loop, calculating exact Shapley contributions per credit parameter in real time.',
        technicalHighlights: [
          'Calculates game-theoretic marginal contributions without full power-set evaluation costs.',
          'Generates human-readable compliance denial/approval notices detailing primary contributing drivers.',
          'Evaluated and audited on LendingClub dataset with 0.912 AUC-ROC.',
        ],
        benchmarkData: [
          { label: 'AUC-ROC Score', value: '0.912' },
          { label: 'SHAP Decomposition Time', value: '18ms/record' },
          { label: 'Adverse Impact Ratio', value: '0.96 (Compliant)' },
        ],
      },
    },
  };

  return (
    <section id="works" className="w-full border-b border-[#121212]/15 bg-[#F8F7F3] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#121212]/15 pb-6">
          <div>
            <div className="font-mono text-xs font-semibold text-[#2563EB] tracking-wider uppercase mb-1">
              [02 // SELECTED WORK]
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#121212] tracking-tight">
              EXPERIMENTS &
              <br />
              SYSTEMS
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs text-[#121212]/60 uppercase text-left md:text-right">
            THREE BESPOKE ARCHITECTURES DEMONSTRATING MACHINE LEARNING, VISION, AND REASONING.
          </div>
        </div>

        {/* ========================================================
            PROJECT 1: PREHIER
           ======================================================== */}
        <div className="border border-[#121212]/15 bg-[#FDFCFB] p-6 sm:p-10 mb-16 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono mb-3">
                  <span className="bg-[#121212] text-white px-2 py-0.5 font-bold uppercase tracking-wider text-[10px]">
                    FEATURED 01
                  </span>
                  <span className="text-[#121212]/40">·</span>
                  <span className="text-[#121212]/75 uppercase">AI INTERVIEW & SCREENING</span>
                  <span className="text-[#121212]/40">·</span>
                  <span className="text-[#2563EB] font-bold">2024-2025</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#121212] tracking-tight mb-4">
                  PREHIER
                </h3>

                <p className="font-sans text-sm leading-relaxed text-[#121212]/80 mb-6">
                  An intelligent candidate evaluation engine that replaces generic keyword
                  filtering with deep semantic resume-to-role vector alignment, dynamic adaptive
                  question generation, and real-time candidate assessment analytics.
                </p>

                {/* Core Architecture Boxes */}
                <div className="mb-8">
                  <div className="font-mono text-[10px] font-bold uppercase text-[#121212]/50 tracking-wider mb-2">
                    CORE ARCHITECTURE
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-[#121212]/85">
                    <div className="border border-[#121212]/20 bg-[#F8F7F3] p-2 leading-tight">
                      Python /<br />FastAPI /<br />Streamlit UI
                    </div>
                    <div className="border border-[#121212]/20 bg-[#F8F7F3] p-2 leading-tight">
                      LangChain /<br />Vector DB
                    </div>
                    <div className="border border-[#121212]/20 bg-[#F8F7F3] p-2 leading-tight">
                      Semantic<br />Scoring
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Link & Status */}
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#121212]/10 font-mono text-xs">
                <button
                  onClick={() => onSelectProject(projectsData.prehier)}
                  data-cursor="CASE STUDY"
                  className="group flex items-center gap-1.5 bg-[#121212] text-white px-4 py-2 font-bold uppercase tracking-wider text-[11px] hover:bg-[#2563EB] transition-colors"
                >
                  <span>VIEW CASE STUDY</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <span className="text-[#121212]/60 text-[11px]">
                  Status: <strong className="text-[#121212]">Private Deployment</strong>
                </span>
              </div>
            </div>

            {/* Right Interactive Diagram: Candidate Vector Pipeline */}
            <div className="lg:col-span-7 border border-[#121212]/20 bg-[#F2EFE9] p-5 sm:p-6 font-mono">
              <div className="flex items-center justify-between border-b border-[#121212]/15 pb-3 text-xs mb-5">
                <span className="text-[#121212] font-bold uppercase tracking-tight">
                  FIG 1.0 — CANDIDATE VECTOR EMBEDDING ATTRIBUTION PIPELINE
                </span>
                <span className="text-emerald-700 font-bold text-[11px] tracking-wider">
                  ACCURACY 94.2%
                </span>
              </div>

              {/* Profile Selector Tabs */}
              <div className="mb-4 flex items-center gap-2 text-[10px]">
                <span className="text-[#121212]/60">SAMPLE CANDIDATE:</span>
                {(['senior', 'ml', 'distributed'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setCandidateProfile(key)}
                    data-cursor="SELECT"
                    className={`px-2 py-1 uppercase font-semibold border transition-all ${
                      candidateProfile === key
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-white text-[#121212]/70 border-[#121212]/20 hover:text-[#121212]'
                    }`}
                  >
                    {candidateData[key].title}
                  </button>
                ))}
              </div>

              {/* 3 Step Interactive Pipeline Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 text-center">
                <div className="border border-[#121212]/25 bg-white p-3">
                  <div className="text-[10px] text-[#121212]/50 uppercase mb-1">RESUME PARSE</div>
                  <div className="font-bold text-xs text-[#121212] uppercase tracking-wider">
                    [TOKEN STREAM]
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                    {candidateData[candidateProfile].tokens}
                  </div>
                </div>

                <div className="border-2 border-[#2563EB] bg-[#EFF6FF] p-3 relative">
                  <div className="text-[10px] text-[#2563EB] font-bold uppercase mb-1">
                    SEMANTIC ALIGN
                  </div>
                  <div className="font-bold text-xs text-[#121212] uppercase tracking-wider">
                    [COSINE SIMILARITY]
                  </div>
                  <div className="text-[10px] text-[#2563EB] font-bold mt-1">
                    SIM: {candidateData[candidateProfile].similarity}
                  </div>
                </div>

                <div className="border border-[#121212]/25 bg-white p-3">
                  <div className="text-[10px] text-[#121212]/50 uppercase mb-1">INTERVIEW GEN</div>
                  <div className="font-bold text-xs text-[#121212] uppercase tracking-wider">
                    [TARGETED PROMPTS]
                  </div>
                  <div className="text-[10px] text-[#121212]/70 font-semibold mt-1">
                    ADAPTIVE CURVE
                  </div>
                </div>
              </div>

              {/* Terminal Log Console */}
              <div className="bg-[#121212] text-emerald-400 p-4 font-mono text-[11px] leading-relaxed shadow-inner">
                <div className="flex items-center justify-between text-[#FFFFFF]/50 text-[10px] border-b border-[#FFFFFF]/10 pb-1.5 mb-2">
                  <span>INFERENCE LOG [BATCH #409]</span>
                  <span className="text-amber-400">LATENCY: 142ms</span>
                </div>
                <div className="text-white/90">
                  <span className="text-[#2563EB] font-bold">&gt;</span>{' '}
                  {candidateData[candidateProfile].prompt}
                </div>
                <div className="mt-2 text-xs text-amber-200/90 pl-3 border-l border-amber-400/40 font-mono">
                  "{candidateData[candidateProfile].questionSample}"
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PROJECT 2: INVESTIGATION SUPPORT SYSTEM
           ======================================================== */}
        <div className="border border-[#121212]/15 bg-[#FDFCFB] p-6 sm:p-10 mb-16 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono mb-3">
                  <span className="bg-[#121212] text-white px-2 py-0.5 font-bold uppercase tracking-wider text-[10px]">
                    PROJECT 02
                  </span>
                  <span className="text-[#121212]/40">·</span>
                  <span className="text-[#121212]/75 uppercase">COMPUTER VISION / OPENCV</span>
                  <span className="text-[#121212]/40">·</span>
                  <span className="text-[#2563EB] font-bold">2024</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#121212] tracking-tight mb-4">
                  INVESTIGATION
                  <br />
                  SUPPORT SYSTEM
                </h3>

                <p className="font-sans text-sm leading-relaxed text-[#121212]/80 mb-6">
                  Automated video surveillance triage and object tracking tool designed for
                  forensic video analysis. Detects suspicious anomalies, tags moving objects across
                  frame sequences, and optimizes processing speed using OpenCV multithreading.
                </p>

                {/* Core Architecture Boxes */}
                <div className="mb-8">
                  <div className="font-mono text-[10px] font-bold uppercase text-[#121212]/50 tracking-wider mb-2">
                    CORE ARCHITECTURE & PIPELINE
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-[#121212]/85">
                    <div className="border border-[#121212]/20 bg-[#F8F7F3] p-2 leading-tight">
                      Python / OpenCV /<br />Multithreaded Video<br />Triage
                    </div>
                    <div className="border border-[#121212]/20 bg-[#F8F7F3] p-2 leading-tight">
                      YOLOv8<br />Inference
                    </div>
                    <div className="border border-[#121212]/20 bg-[#F8F7F3] p-2 leading-tight">
                      SORT<br />Tracking
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Link & Status */}
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#121212]/10 font-mono text-xs">
                <button
                  onClick={() => onSelectProject(projectsData.investigation)}
                  data-cursor="PIPELINE"
                  className="group flex items-center gap-1.5 bg-[#121212] text-white px-4 py-2 font-bold uppercase tracking-wider text-[11px] hover:bg-[#2563EB] transition-colors"
                >
                  <span>EXPLORE PIPELINE</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <span className="text-[#121212]/60 text-[11px]">
                  Status: <strong className="text-[#121212]">Production Prototype</strong>
                </span>
              </div>
            </div>

            {/* Right Interactive Dark Video Surveillance Canvas */}
            <div className="lg:col-span-7 border border-[#121212]/20 bg-[#0F1115] text-white p-5 sm:p-6 font-mono relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs mb-4">
                <span className="text-white/90 font-bold uppercase tracking-tight">
                  FIG 2.0 — MULTI-STREAM FORENSIC VIDEO ANALYTICS & BOUNDING RECTIFICATION
                </span>
                <span className="text-emerald-400 font-bold text-[11px] tracking-wider">
                  44.6 FPS ACCELERATED
                </span>
              </div>

              {/* Feed Controls */}
              <div className="flex items-center justify-between mb-3 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="text-white/50">ACTIVE FEED:</span>
                  {(['CAM_NORTH_02', 'CAM_METRO_07', 'CAM_PLAZA_01'] as const).map((cam) => (
                    <button
                      key={cam}
                      onClick={() => setCurrentCam(cam)}
                      data-cursor="CAM"
                      className={`px-2 py-0.5 uppercase transition-colors ${
                        currentCam === cam
                          ? 'bg-[#2563EB] text-white font-bold'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {cam}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsVisionPlaying(!isVisionPlaying)}
                  data-cursor="TOGGLE"
                  className="flex items-center gap-1 text-white/70 hover:text-white"
                >
                  {isVisionPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  <span>{isVisionPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>
              </div>

              {/* Simulated CCTV Screen Viewport */}
              <div className="relative h-64 w-full bg-[#050608] border border-white/15 scanlines overflow-hidden flex flex-col justify-between p-3 select-none">
                {/* HUD Top Bar */}
                <div className="flex items-center justify-between text-[11px] text-white/70 z-10">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                    <span className="font-bold text-white uppercase">STREAM1: {currentCam}</span>
                  </div>
                  <div className="font-mono text-emerald-400">
                    LATENCY: 22ms / FPS: {fps}
                  </div>
                </div>

                {/* Animated Object Tracking Bounding Box */}
                <div
                  style={{
                    transform: `translate(${boxOffset.x}px, ${boxOffset.y}px)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="absolute left-1/3 top-1/4 w-44 h-28 border border-[#2563EB] bg-[#2563EB]/10 p-1 flex flex-col justify-between z-10"
                >
                  <div className="flex items-center justify-between text-[9px] bg-[#2563EB] text-white px-1 font-bold">
                    <span>OBJ_ID: #014 [{detectionConfidence}]</span>
                    <span>PERSON</span>
                  </div>

                  {/* Crosshair target overlay */}
                  <div className="self-center text-center text-[10px] text-cyan-300 font-bold">
                    +
                  </div>

                  <div className="text-[8px] text-cyan-300 font-mono">
                    REAL-TIME BOUNDING BOX RECTIFICATION & SPATIAL OVERLAY
                  </div>
                </div>

                {/* Secondary Target Box */}
                <div className="absolute right-8 bottom-10 w-28 h-20 border border-emerald-500/80 bg-emerald-500/5 p-1 flex flex-col justify-between z-10">
                  <div className="text-[8px] bg-emerald-600 text-white px-1 font-bold">
                    OBJ_ID: #082 [0.89]
                  </div>
                  <div className="text-[8px] text-emerald-400 font-mono">
                    TRAJECTORY: VECTOR (+12)
                  </div>
                </div>

                {/* Video Grid overlay lines */}
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 pointer-events-none opacity-20">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="border border-white/30" />
                  ))}
                </div>

                {/* HUD Bottom Bar */}
                <div className="flex items-center justify-between text-[10px] text-white/50 border-t border-white/10 pt-1 z-10">
                  <span>INFERENCE: YOLOv8 / OPENCV DNN</span>
                  <span className="text-cyan-400">TRACKING: SORT MULTI-OBJECT FILTER</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PROJECT 3: CREDINSIGHT AI (Graphic on Left, Text on Right)
           ======================================================== */}
        <div className="border border-[#121212]/15 bg-[#FDFCFB] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Interactive Graphic: SHAP Value Decomposition */}
            <div className="lg:col-span-7 border border-[#121212]/20 bg-[#F2EFE9] p-5 sm:p-6 font-mono order-2 lg:order-1">
              <div className="flex items-center justify-between border-b border-[#121212]/15 pb-3 text-xs mb-5">
                <span className="text-[#121212] font-bold uppercase tracking-tight">
                  FIG 3.0 — SHAPLEY VALUE DECOMPOSITION & RISK INTERVALS
                </span>
                <span className="text-[#2563EB] font-bold text-[11px] tracking-wider">
                  AUC-ROC: 0.912
                </span>
              </div>

              {/* SHAP Bars with Live Visual Weight */}
              <div className="space-y-4 mb-6">
                {/* Feature 1: Debt to income */}
                <div className="border border-[#121212]/15 bg-white p-3">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                    <span className="text-[#121212]">Debt-to-Income Volatility</span>
                    <span className="text-red-600 font-mono">
                      +{dti.toFixed(3)} (Increases Risk)
                    </span>
                  </div>
                  <div className="h-3 w-full bg-[#121212]/10 overflow-hidden relative">
                    <div
                      style={{ width: `${Math.min(100, (dti / 0.8) * 100)}%` }}
                      className="h-full bg-red-500 transition-all duration-300"
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-[#121212]/60">
                    <span>Adjust Parameter:</span>
                    <input
                      type="range"
                      min="0.05"
                      max="0.75"
                      step="0.02"
                      value={dti}
                      onChange={(e) => setDti(parseFloat(e.target.value))}
                      className="w-36 accent-red-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Feature 2: Liquid reserves */}
                <div className="border border-[#121212]/15 bg-white p-3">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                    <span className="text-[#121212]">Liquid Reserves Margin</span>
                    <span className="text-cyan-700 font-mono">
                      {reserves.toFixed(3)} (Mitigates Risk)
                    </span>
                  </div>
                  <div className="h-3 w-full bg-[#121212]/10 overflow-hidden relative">
                    <div
                      style={{ width: `${Math.min(100, (Math.abs(reserves) / 0.8) * 100)}%` }}
                      className="h-full bg-cyan-600 transition-all duration-300"
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-[#121212]/60">
                    <span>Adjust Parameter:</span>
                    <input
                      type="range"
                      min="-0.7"
                      max="-0.1"
                      step="0.02"
                      value={reserves}
                      onChange={(e) => setReserves(parseFloat(e.target.value))}
                      className="w-36 accent-cyan-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Feature 3: Payment history regularity */}
                <div className="border border-[#121212]/15 bg-white p-3">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                    <span className="text-[#121212]">Payment History Regularity (36M)</span>
                    <span className="text-emerald-700 font-mono">
                      {history.toFixed(3)} (Mitigates Risk)
                    </span>
                  </div>
                  <div className="h-3 w-full bg-[#121212]/10 overflow-hidden relative">
                    <div
                      style={{ width: `${Math.min(100, (Math.abs(history) / 0.8) * 100)}%` }}
                      className="h-full bg-emerald-600 transition-all duration-300"
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-[#121212]/60">
                    <span>Adjust Parameter:</span>
                    <input
                      type="range"
                      min="-0.6"
                      max="-0.05"
                      step="0.02"
                      value={history}
                      onChange={(e) => setHistory(parseFloat(e.target.value))}
                      className="w-36 accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Model Verdict Card */}
              <div className="border border-[#121212]/20 bg-white p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[#121212]/50 uppercase text-[10px] block">MODEL VERDICT:</span>
                  <span
                    className={`font-black text-sm uppercase ${
                      isApproved ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {isApproved ? 'APPROVED (LOW RISK TIER)' : 'FLAGGED (HIGH RISK TIER)'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#121212]/50 uppercase text-[10px] block">CONFIDENCE:</span>
                  <span className="font-bold text-sm text-[#121212]">{confidencePercent}%</span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full order-1 lg:order-2">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono mb-3">
                  <span className="bg-[#121212] text-white px-2 py-0.5 font-bold uppercase tracking-wider text-[10px]">
                    PROJECT 03
                  </span>
                  <span className="text-[#121212]/40">·</span>
                  <span className="text-[#121212]/75 uppercase">EXPLAINABLE MACHINE LEARNING</span>
                  <span className="text-[#121212]/40">·</span>
                  <span className="text-[#2563EB] font-bold">2024</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#121212] tracking-tight mb-4">
                  CREDINSIGHT AI
                </h3>

                <p className="font-sans text-sm leading-relaxed text-[#121212]/80 mb-6">
                  Transparent, accountable credit-risk classification built to combat algorithmic
                  bias. Employs XGBoost and tree ensembles paired with SHAP (Shapley Additive
                  exPlanations) for human-interpretable credit scoring.
                </p>

                {/* Stack & Metrics Boxes */}
                <div className="mb-8">
                  <div className="font-mono text-[10px] font-bold uppercase text-[#121212]/50 tracking-wider mb-2">
                    STACK & METRICS
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-[#121212]/85">
                    <div className="border border-[#121212]/20 bg-[#F8F7F3] p-2 leading-tight">
                      Scikit-learn /<br />Pandas /<br />NumPy
                    </div>
                    <div className="border border-[#121212]/20 bg-[#F8F7F3] p-2 leading-tight">
                      XGBoost
                    </div>
                    <div className="border border-[#121212]/20 bg-[#F8F7F3] p-2 leading-tight">
                      SHAP /<br />Explainability
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Link & Status */}
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#121212]/10 font-mono text-xs">
                <button
                  onClick={() => onSelectProject(projectsData.credinsight)}
                  data-cursor="INSPECT"
                  className="group flex items-center gap-1.5 bg-[#121212] text-white px-4 py-2 font-bold uppercase tracking-wider text-[11px] hover:bg-[#2563EB] transition-colors"
                >
                  <span>INSPECT PIPELINE</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <span className="text-[#121212]/60 text-[11px]">
                  Dataset: <strong className="text-[#121212]">Kaggle / LendingClub</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
