import React, { useState } from 'react';
import { Shield, Filter, Search, ArrowUpDown, Lock, AlertTriangle, CheckCircle2, ChevronRight, Server } from 'lucide-react';

export default function DataFlowsTable({ dataFlows = [], dpdpFindings = [] }) {
  const [filterTier, setFilterTier] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFlow, setSelectedFlow] = useState(null);

  const filteredFlows = dataFlows.filter(flow => {
    const matchesTier = filterTier === 'ALL' || flow.tier === filterTier;
    const matchesSearch = 
      flow.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flow.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flow.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flow.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-5 relative flex flex-col">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-obsidian-700/80 pb-4 mb-4">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold flex items-center gap-2">
            <Server className="w-4 h-4 text-tactical-amber" />
            Intercepted Egress Telemetry ({dataFlows.length} Flows)
          </h3>
          <p className="text-[11px] font-mono text-slate-400">Granular Host, Jurisdiction, ASN & DPDP Statutory Classification</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by host, org, country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-obsidian-850 border border-obsidian-700 rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-tactical-amber/50 w-48 lg:w-60"
            />
          </div>

          {/* Tier Filter Selector */}
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="bg-obsidian-850 border border-obsidian-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-tactical-amber/50"
          >
            <option value="ALL">All Tiers ({dataFlows.length})</option>
            <option value="Sovereign Tier">Sovereign Tier (IN)</option>
            <option value="Adequacy Tier">Adequacy Tier</option>
            <option value="High-Risk Tier">High-Risk Tier</option>
          </select>
        </div>
      </div>

      {/* Telemetry Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-obsidian-700 text-slate-400 uppercase text-[10px] tracking-wider bg-obsidian-850/50">
              <th className="py-2.5 px-3">Destination Host & URL</th>
              <th className="py-2.5 px-3">Jurisdiction</th>
              <th className="py-2.5 px-3">Controlling Entity / ASN</th>
              <th className="py-2.5 px-3">Telemetry Purpose</th>
              <th className="py-2.5 px-3">Risk Tier</th>
              <th className="py-2.5 px-3 text-right">Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-obsidian-800">
            {filteredFlows.map((flow) => {
              let tierBadge = "bg-tactical-emeraldDim text-tactical-emerald border-tactical-emerald/30";
              if (flow.tier === "High-Risk Tier") {
                tierBadge = "bg-tactical-crimsonDim text-tactical-crimson border-tactical-crimson/30";
              } else if (flow.tier === "Adequacy Tier") {
                tierBadge = "bg-tactical-amberDim text-tactical-amber border-tactical-amber/30";
              }

              return (
                <tr 
                  key={flow.id} 
                  onClick={() => setSelectedFlow(flow)}
                  className="hover:bg-obsidian-850/80 cursor-pointer transition-colors group"
                >
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5">
                      {flow.encrypted && <Lock className="w-3 h-3 text-slate-500" />}
                      <span className="font-semibold text-slate-100 group-hover:text-tactical-amber transition-colors">{flow.hostname}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-xs">{flow.url}</div>
                  </td>

                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <span>{flow.countryCode === 'IN' ? '🇮🇳' : flow.countryCode === 'US' ? '🇺🇸' : flow.countryCode === 'FR' ? '🇫🇷' : flow.countryCode === 'DE' ? '🇩🇪' : flow.countryCode === 'CN' ? '🇨🇳' : '🌐'}</span>
                      <span className="text-slate-200">{flow.country}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{flow.city}</div>
                  </td>

                  <td className="py-2.5 px-3">
                    <div className="text-slate-200 truncate max-w-[180px]">{flow.org}</div>
                    <div className="text-[10px] text-slate-400">{flow.asn}</div>
                  </td>

                  <td className="py-2.5 px-3">
                    <span className="text-slate-300">{flow.purpose}</span>
                    <div className="text-[10px] text-slate-400">{flow.dpdpStatus}</div>
                  </td>

                  <td className="py-2.5 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${tierBadge}`}>
                      {flow.tier}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 text-right tabular-nums">
                    <span className={flow.latencyMs < 50 ? 'text-tactical-emerald' : 'text-slate-400'}>
                      {flow.latencyMs}ms
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* DPDP Legal Findings Section below table */}
      {dpdpFindings && dpdpFindings.length > 0 && (
        <div className="mt-5 pt-4 border-t border-obsidian-700/80">
          <h4 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold mb-3">
            DPDP Act 2023 Statutory Compliance Assessment
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {dpdpFindings.map((finding, idx) => {
              const isCrit = finding.severity === 'Critical';
              const isWarn = finding.severity === 'Warning';
              return (
                <div 
                  key={idx}
                  className={`p-3 rounded-lg border text-xs font-mono ${
                    isCrit 
                      ? 'bg-tactical-crimsonDim/40 border-tactical-crimson/40 text-red-200' 
                      : isWarn 
                      ? 'bg-tactical-amberDim/40 border-tactical-amber/40 text-amber-200' 
                      : 'bg-tactical-emeraldDim/40 border-tactical-emerald/40 text-emerald-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[11px]">{finding.clause}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-obsidian-950/60">{finding.severity}</span>
                  </div>
                  <div className="font-semibold text-slate-100 text-xs mb-1">{finding.title}</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{finding.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
