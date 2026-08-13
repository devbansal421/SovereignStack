import React, { useState } from 'react';
import { Cpu, AlertOctagon, UserX, ShieldCheck, ArrowRight, CheckCircle2, FileCode, Upload, RefreshCw } from 'lucide-react';

export default function SupplyChainGraph({ auditData = {}, onUploadManifest, onSelectShowcase, isAuditing }) {
  const [manifestText, setManifestText] = useState('');
  const [manifestType, setManifestType] = useState('package.json');

  const packages = auditData?.packages || [];
  const score = auditData?.sovereigntyScore || 75;

  const handleCustomAudit = (e) => {
    e.preventDefault();
    if (!manifestText.trim()) return;
    onUploadManifest(manifestText, manifestType);
  };

  return (
    <div className="space-y-5">
      {/* Manifest Input & Quick Showcase Bar */}
      <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-obsidian-700/80 pb-4 mb-4">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-tactical-amber" />
              Software Supply-Chain Sovereignty Auditor
            </h3>
            <p className="text-[11px] font-mono text-slate-400">Audit Maintainer Provenance, Bus-Factor Hazards & Domestic Sovereign Alternatives</p>
          </div>

          {/* Quick Pre-warmed Presets */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400">Test Presets:</span>
            <button
              onClick={() => onSelectShowcase('vulnerable-fintech-node')}
              className="px-2.5 py-1 rounded bg-tactical-crimsonDim border border-tactical-crimson/30 text-tactical-crimson hover:bg-tactical-crimson/20 text-xs font-mono transition-all"
            >
              Vulnerable Node Stack (Event-Stream)
            </button>
            <button
              onClick={() => onSelectShowcase('sovereign-hardened-python')}
              className="px-2.5 py-1 rounded bg-tactical-emeraldDim border border-tactical-emerald/30 text-tactical-emerald hover:bg-tactical-emerald/20 text-xs font-mono transition-all"
            >
              Sovereign Python Banking Stack
            </button>
          </div>
        </div>

        {/* Custom Manifest Paste / Upload Area */}
        <form onSubmit={handleCustomAudit} className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <FileCode className="w-3.5 h-3.5 text-tactical-cyan" />
              <span>Paste Manifest or Dependency List:</span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={manifestType}
                onChange={(e) => setManifestType(e.target.value)}
                className="bg-obsidian-850 border border-obsidian-700 rounded px-2 py-1 text-xs font-mono text-slate-200 focus:outline-none"
              >
                <option value="package.json">package.json (Node.js)</option>
                <option value="requirements.txt">requirements.txt (Python)</option>
              </select>
            </div>
          </div>

          <textarea
            rows={4}
            value={manifestText}
            onChange={(e) => setManifestText(e.target.value)}
            placeholder={`{\n  "dependencies": {\n    "event-stream": "3.3.6",\n    "colors": "1.4.0",\n    "axios": "^1.7.9"\n  }\n}`}
            className="w-full bg-obsidian-950 border border-obsidian-800 rounded-lg p-3 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-tactical-amber/50 font-mono"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isAuditing || !manifestText.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-tactical-amber text-slate-950 font-mono font-bold text-xs rounded-lg hover:bg-tactical-amber/90 disabled:opacity-50 transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)]"
            >
              {isAuditing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span>{isAuditing ? 'Analyzing Provenance...' : 'Audit Supply Chain'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Manifest Overview Telemetry */}
      {auditData && auditData.packages && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono text-slate-400">Supply-Chain Score</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-3xl font-display font-bold tabular-nums ${score >= 75 ? 'text-tactical-emerald' : score >= 50 ? 'text-tactical-amber' : 'text-tactical-crimson'}`}>
                {score}
              </span>
              <span className="text-xs font-mono text-slate-400">/ 100</span>
            </div>
            <span className="text-[11px] font-mono text-slate-300 mt-2 truncate">{auditData.grade}</span>
          </div>

          <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono text-slate-400">Total Dependencies</span>
            <div className="text-3xl font-display font-bold text-slate-100 mt-1 tabular-nums">
              {auditData.totalDependencies || 0}
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-2">Direct & Top Transitive</span>
          </div>

          <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono text-slate-400">Bus-Factor Hazards</span>
            <div className="text-3xl font-display font-bold text-tactical-amber mt-1 tabular-nums">
              {auditData.busFactorHazardCount || 0}
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-2">Single Unbacked Maintainers</span>
          </div>

          <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono text-slate-400">High-Risk Packages</span>
            <div className="text-3xl font-display font-bold text-tactical-crimson mt-1 tabular-nums">
              {auditData.highRiskCount || 0}
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-2">Ownership Anomaly / Hijacked</span>
          </div>
        </div>
      )}

      {/* Packages Telemetry Table */}
      {packages.length > 0 && (
        <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-5">
          <div className="flex items-center justify-between border-b border-obsidian-700/80 pb-3 mb-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold">
              Dependency Provenance & Sovereign Alternatives
            </h4>
            <span className="text-xs font-mono text-slate-400">Audited Manifest: {auditData.manifestType || 'package.json'}</span>
          </div>

          <div className="space-y-3">
            {packages.map((pkg, idx) => {
              const isCrit = pkg.sovereigntyRisk === 'Critical';
              const isHigh = pkg.sovereigntyRisk === 'High';

              return (
                <div
                  key={idx}
                  className="bg-obsidian-850 border border-obsidian-800 hover:border-obsidian-700 rounded-lg p-4 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-sm text-slate-100">{pkg.name}</span>
                      <span className="text-xs font-mono text-slate-400">v{pkg.version}</span>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                        isCrit 
                          ? 'bg-tactical-crimsonDim text-tactical-crimson border-tactical-crimson/30' 
                          : isHigh 
                          ? 'bg-tactical-amberDim text-tactical-amber border-tactical-amber/30' 
                          : 'bg-tactical-emeraldDim text-tactical-emerald border-tactical-emerald/30'
                      }`}>
                        {pkg.sovereigntyRisk} Risk
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                      <span>Maintainer Origin: <strong className="text-slate-200">{pkg.provenanceCountry}</strong></span>
                      <span>Bus Factor: <strong className={pkg.busFactor <= 1 ? 'text-tactical-crimson font-bold' : 'text-slate-200'}>{pkg.busFactor}</strong></span>
                    </div>
                  </div>

                  <p className="text-xs font-mono text-slate-300 leading-relaxed mb-3">
                    {pkg.ownershipAnomalies}
                  </p>

                  {pkg.sovereignAlternative && pkg.sovereignAlternative !== 'Compliant' && (
                    <div className="bg-obsidian-950 p-2.5 rounded border border-tactical-amber/30 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 text-tactical-amber">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Recommended Sovereign Alternative:</span>
                        <strong className="text-slate-100">{pkg.sovereignAlternative}</strong>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
