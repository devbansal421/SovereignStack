import React from 'react';
import { Shield, Radio, Terminal, Cpu, HelpCircle, Activity } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenCopilot }) {
  return (
    <header className="border-b border-obsidian-700 bg-obsidian-900/90 backdrop-blur sticky top-0 z-30 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-tactical-amberDim border border-tactical-amber/40 flex items-center justify-center text-tactical-amber font-mono font-bold text-sm shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <Shield className="w-4 h-4 text-tactical-amber" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold tracking-wider text-base text-slate-100 uppercase">SovereignStack</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-tactical-emeraldDim text-tactical-emerald border border-tactical-emerald/30 font-medium">
                DPDP 2023 Compliant
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">Digital Sovereignty & Supply-Chain Telemetry</p>
          </div>
        </div>

        {/* Global Live System Indicator */}
        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-obsidian-700 text-xs font-mono text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-tactical-emerald animate-pulse"></span>
          <span>Sovereign Anchor: <strong className="text-slate-200">IN (New Delhi / Mumbai)</strong></span>
        </div>
      </div>

      {/* Mode Switches */}
      <div className="flex items-center gap-2">
        <nav className="flex items-center p-1 rounded-lg bg-obsidian-850 border border-obsidian-700">
          <button
            onClick={() => setActiveTab('dataflow')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === 'dataflow'
                ? 'bg-obsidian-700 text-slate-100 font-semibold shadow-sm border border-obsidian-600'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-tactical-cyan" />
            <span>Data Flow Auditor</span>
          </button>
          
          <button
            onClick={() => setActiveTab('supplychain')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === 'supplychain'
                ? 'bg-obsidian-700 text-slate-100 font-semibold shadow-sm border border-obsidian-600'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-tactical-amber" />
            <span>Supply Chain Auditor</span>
          </button>
        </nav>

        {/* Copilot Trigger */}
        <button
          onClick={onOpenCopilot}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tactical-amberDim border border-tactical-amber/30 text-tactical-amber hover:bg-tactical-amber/25 text-xs font-mono font-medium transition-all shadow-[0_0_10px_rgba(245,158,11,0.15)]"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sovereignty Copilot</span>
        </button>
      </div>
    </header>
  );
}
