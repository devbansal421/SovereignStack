import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Cpu, 
  Search, 
  ShieldAlert, 
  Globe, 
  Activity, 
  ArrowRight, 
  RefreshCw, 
  Terminal, 
  ExternalLink,
  ShieldCheck,
  FileCheck,
  AlertTriangle
} from 'lucide-react';

import Navbar from './components/Navbar.jsx';
import SovereigntyGauge from './components/SovereigntyGauge.jsx';
import SovereigntyRadarMap from './components/SovereigntyRadarMap.jsx';
import DataFlowsTable from './components/DataFlowsTable.jsx';
import SupplyChainGraph from './components/SupplyChainGraph.jsx';
import SovereigntyCopilot from './components/SovereigntyCopilot.jsx';
import PreWarmedSelector from './components/PreWarmedSelector.jsx';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dataflow'); // 'dataflow' | 'supplychain'
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('irctc.co.in');
  const [isLoading, setIsLoading] = useState(false);
  const [showcaseSites, setShowcaseSites] = useState([]);
  
  // Data Flow Audit State
  const [dataFlowAudit, setDataFlowAudit] = useState(null);

  // Supply Chain Audit State
  const [supplyChainAudit, setSupplyChainAudit] = useState(null);

  // Fetch initial showcases and load IRCTC default
  useEffect(() => {
    fetch('/api/showcase')
      .then(res => res.json())
      .then(data => {
        if (data.dataFlowSites) setShowcaseSites(data.dataFlowSites);
      })
      .catch(() => {});

    // Initial audit for default domain
    performDataFlowAudit('irctc.co.in');
    performSupplyChainShowcase('vulnerable-fintech-node');
  }, []);

  const performDataFlowAudit = async (urlToAudit) => {
    const target = urlToAudit || inputUrl;
    if (!target.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/audit/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target })
      });
      const data = await res.json();
      if (!data.error) {
        setDataFlowAudit(data);
        setInputUrl(target);
      }
    } catch (err) {
      console.error('Data flow audit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const performSupplyChainShowcase = async (key) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/audit/manifest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showcaseKey: key })
      });
      const data = await res.json();
      setSupplyChainAudit(data);
    } catch (err) {
      console.error('Supply chain audit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomManifestAudit = async (content, manifestType) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/audit/manifest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, manifestType })
      });
      const data = await res.json();
      if (!data.error) {
        setSupplyChainAudit(data);
      }
    } catch (err) {
      console.error('Custom manifest audit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col telemetry-grid">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenCopilot={() => setIsCopilotOpen(true)} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Master Mission Banner */}
        <section className="bg-obsidian-900/90 border border-obsidian-700 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-tactical-amber/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-tactical-amber bg-tactical-amberDim px-2.5 py-0.5 rounded border border-tactical-amber/30">
                  National Digital Sovereignty Audit Matrix
                </span>
                <span className="text-[11px] font-mono text-slate-400">MeitY & DPDP Act 2023 Ruleset</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-100 tracking-tight leading-tight">
                Where does Indian user data actually flow — and who controls your code?
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 leading-relaxed">
                Autonomous runtime packet interception and software supply-chain provenance. Audits outbound telemetry against cross-border data transfer rules under Section 16 of the Digital Personal Data Protection Act.
              </p>
            </div>

            {/* Live Telemetry Summary Pill */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-obsidian-950 p-3.5 rounded-xl border border-obsidian-750 font-mono text-xs">
              <div className="px-3 py-1 border-r border-obsidian-700">
                <div className="text-slate-400 text-[10px] uppercase">Active Target</div>
                <div className="font-bold text-slate-100 truncate max-w-[140px]">{dataFlowAudit?.domain || 'Idle'}</div>
              </div>
              <div className="px-3 py-1 border-r border-obsidian-700">
                <div className="text-slate-400 text-[10px] uppercase">Jurisdictions</div>
                <div className="font-bold text-tactical-cyan">{dataFlowAudit?.metrics?.uniqueCountries || 1} Countries</div>
              </div>
              <div className="px-3 py-1">
                <div className="text-slate-400 text-[10px] uppercase">Status</div>
                <div className="font-bold text-tactical-emerald flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tactical-emerald animate-pulse"></span>
                  Active Monitor
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab 1: Data Flow Sovereignty Auditor */}
        {activeTab === 'dataflow' && (
          <div className="space-y-6">
            {/* Search Input Bar */}
            <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && performDataFlowAudit()}
                  placeholder="Enter any domain or web application URL (e.g. irctc.co.in, zepto.com, flipkart.com)..."
                  className="w-full bg-obsidian-950 border border-obsidian-750 rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-tactical-amber/50"
                />
              </div>

              <button
                onClick={() => performDataFlowAudit()}
                disabled={isLoading || !inputUrl.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-tactical-amber text-slate-950 font-mono font-bold text-xs rounded-lg hover:bg-tactical-amber/90 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)]"
              >
                {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Radio className="w-3.5 h-3.5" />}
                <span>{isLoading ? 'Intercepting Telemetry...' : 'Audit Data Flows'}</span>
              </button>
            </div>

            {/* Pre-Warmed Showcases */}
            <PreWarmedSelector
              showcaseSites={showcaseSites}
              activeDomain={dataFlowAudit?.domain}
              onSelectDomain={(domain) => performDataFlowAudit(domain)}
            />

            {/* Main Visual Telemetry Deck: Gauge + Radar Map */}
            {dataFlowAudit && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <SovereigntyGauge
                    score={dataFlowAudit.sovereigntyScore}
                    grade={dataFlowAudit.grade}
                    metrics={dataFlowAudit.metrics}
                  />
                </div>

                <div className="lg:col-span-2">
                  <SovereigntyRadarMap
                    dataFlows={dataFlowAudit.dataFlows}
                    domain={dataFlowAudit.domain}
                  />
                </div>
              </div>
            )}

            {/* Intercepted Egress Telemetry & DPDP Breakdown */}
            {dataFlowAudit && (
              <DataFlowsTable
                dataFlows={dataFlowAudit.dataFlows}
                dpdpFindings={dataFlowAudit.dpdpFindings}
              />
            )}
          </div>
        )}

        {/* Tab 2: Software Supply-Chain Sovereignty Auditor */}
        {activeTab === 'supplychain' && (
          <SupplyChainGraph
            auditData={supplyChainAudit}
            onUploadManifest={handleCustomManifestAudit}
            onSelectShowcase={performSupplyChainShowcase}
            isAuditing={isLoading}
          />
        )}
      </main>

      {/* Floating Copilot Drawer */}
      <SovereigntyCopilot
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        auditContext={activeTab === 'dataflow' ? dataFlowAudit : supplyChainAudit}
      />

      {/* Footer */}
      <footer className="border-t border-obsidian-800 bg-obsidian-950 px-6 py-4 text-center font-mono text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>SovereignStack © 2026 • Digital Sovereignty & DPDP Compliance Engine</span>
          <span className="text-slate-400">Strictly Localized • No External Telemetry Exfiltration</span>
        </div>
      </footer>
      </div>
      <Analytics />
    </>
  );
}
