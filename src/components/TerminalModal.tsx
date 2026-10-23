import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Send, Sparkles, CornerDownLeft } from 'lucide-react';
import { TerminalMessage } from '../types';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: '1',
      type: 'system',
      content:
        'SUYOG VERMA // PORTFOLIO INTELLIGENCE ENGINE v2.5\nDeterministic AI Agent initialized. Connected to portfolio vector knowledge base.\nType any question or use predefined commands: `projects`, `c++`, `prehier`, `vision`, `contact`, `help`.',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const userMsg: TerminalMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Handle local CLI commands
    const lower = trimmed.toLowerCase();
    if (lower === 'clear') {
      setMessages([]);
      return;
    }
    if (lower === 'help') {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: `AVAILABLE COMMANDS:
• projects : Summarize featured machine learning & vision systems
• c++      : Inspect nlohmann/json and Soup C++ systems work
• prehier  : Deep dive into the vector interview evaluation engine
• vision   : Video triage pipeline and YOLOv8 / SORT tracking details
• shap     : Explainable credit risk model & feature attributions
• contact  : Email, location, and internship availability
• clear    : Clear terminal buffer
Or simply type any natural language question!`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      return;
    }

    // Call /api/ask-ai
    setIsLoading(true);
    try {
      const res = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed }),
      });
      const data = await res.json();
      const reply = data.reply || 'No output received from inference engine.';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: reply,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content:
            'Suyog Verma is a B.Tech CSE (AI/ML) engineer specializing in deterministic AI architectures and C++ systems. Direct contact: suyogverma.dev@gmail.com.',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'Explain C++ contributions',
    'How does PREHIER work?',
    'What is your design philosophy?',
    'Available for Summer 2025?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl border border-[#2563EB]/40 bg-[#0B0D11] text-white shadow-2xl flex flex-col h-[82vh] max-h-[720px] font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#12151B] px-4 py-2.5 text-xs select-none">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-bold text-white/90 flex items-center gap-1.5 text-[11px]">
              <TerminalIcon className="h-3.5 w-3.5 text-[#2563EB]" />
              suyog-verma@portfolio-engine: ~/interactive
            </span>
          </div>

          <button
            onClick={onClose}
            data-cursor="CLOSE"
            className="text-white/50 hover:text-white p-1 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick prompt suggestions chips */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-white/10 bg-[#0E1015] px-4 py-2 text-[10px] select-none">
          <span className="text-white/40 uppercase whitespace-nowrap">TRY:</span>
          {samplePrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleCommand(p)}
              data-cursor="RUN"
              className="whitespace-nowrap border border-white/15 bg-white/5 px-2 py-0.5 text-white/80 hover:border-[#2563EB] hover:text-white hover:bg-[#2563EB]/20 transition-all"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Terminal Output Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-[13px] leading-relaxed scanlines">
          {messages.map((m) => (
            <div key={m.id} className="space-y-1">
              {m.type === 'system' && (
                <div className="text-white/50 text-[11px] whitespace-pre-wrap border-l-2 border-[#2563EB] pl-3 py-1">
                  {m.content}
                </div>
              )}
              {m.type === 'user' && (
                <div className="flex items-start gap-2 text-cyan-300 font-bold">
                  <span className="text-[#2563EB]">&gt;</span>
                  <span>{m.content}</span>
                  <span className="text-[10px] text-white/30 ml-auto font-normal">
                    {m.timestamp}
                  </span>
                </div>
              )}
              {m.type === 'assistant' && (
                <div className="text-white/90 whitespace-pre-wrap pl-4 bg-white/5 p-3 border-l-2 border-emerald-500/70">
                  {m.content}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-amber-400 pl-4 py-2 text-xs">
              <Sparkles className="h-3.5 w-3.5 animate-spin" />
              <span>Synthesizing response through Suyog's portfolio inference engine...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
          className="border-t border-white/10 bg-[#12151B] p-3 flex items-center gap-2"
        >
          <span className="text-emerald-400 font-bold text-sm select-none">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about systems work, C++ PRs, ML architectures, or type 'help'..."
            className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none font-mono"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            data-cursor="SUBMIT"
            className="bg-[#2563EB] text-white p-2 hover:bg-blue-600 disabled:opacity-40 transition-colors"
          >
            <CornerDownLeft className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
