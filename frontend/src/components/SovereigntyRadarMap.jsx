import React, { useState } from 'react';
import { Radio, Globe, Navigation, Shield, ExternalLink, Zap } from 'lucide-react';

export default function SovereigntyRadarMap({ dataFlows = [], domain = "" }) {
  const [activeNode, setActiveNode] = useState(null);

  // Origin coordinate on a 800x450 projection box (India centered roughly at x: 550, y: 220)
  const origin = { x: 555, y: 215, label: "New Delhi / Mumbai (IN)" };

  // Convert lat/lng to approximate map canvas (x, y) on equirectangular projection
  const projectToCanvas = (lat, lng) => {
    // Canvas bounds: width 800, height 400
    const x = ((lng + 180) / 360) * 800;
    const y = ((90 - lat) / 180) * 400;
    return { x: Math.max(30, Math.min(770, x)), y: Math.max(30, Math.min(370, y)) };
  };

  // Group flows by unique geographical destination coordinates
  const uniqueDestinations = [];
  const coordMap = new Map();

  dataFlows.forEach(flow => {
    const key = `${flow.lat || 0}_${flow.lng || 0}_${flow.countryCode || 'XX'}`;
    if (!coordMap.has(key)) {
      const pos = flow.lat && flow.lng ? projectToCanvas(flow.lat, flow.lng) : { x: 250, y: 150 };
      const node = {
        ...flow,
        pos,
        flows: [flow]
      };
      coordMap.set(key, node);
      uniqueDestinations.push(node);
    } else {
      coordMap.get(key).flows.push(flow);
    }
  });

  return (
    <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
      {/* Header telemetry bar */}
      <div className="flex items-center justify-between border-b border-obsidian-700/80 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Radio className="w-4 h-4 text-tactical-cyan animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-tactical-cyan rounded-full animate-ping"></span>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold flex items-center gap-2">
              Geospatial Data Flow Vector Radar
            </h3>
            <p className="text-[11px] font-mono text-slate-400">Live Egress Trajectories & Territorial Jurisdiction</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-tactical-emerald"></span>
            <span className="text-slate-400">Sovereign (IN)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-tactical-amber"></span>
            <span className="text-slate-400">Adequacy Tier</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-tactical-crimson animate-pulse"></span>
            <span className="text-slate-400">High-Risk Egress</span>
          </div>
        </div>
      </div>

      {/* Radar Map Canvas */}
      <div className="relative w-full h-[320px] bg-obsidian-950/80 rounded-lg border border-obsidian-800 radar-grid overflow-hidden flex items-center justify-center">
        
        {/* Subtle World Map Grid Outlines */}
        <svg viewBox="0 0 800 400" className="w-full h-full absolute inset-0 opacity-25">
          {/* Latitude & Longitude grid lines */}
          <line x1="0" y1="200" x2="800" y2="200" stroke="#2A3449" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="400" y1="0" x2="400" y2="400" stroke="#2A3449" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="400" cy="200" r="180" stroke="#1D2433" strokeWidth="1" fill="none" />
          <circle cx="400" cy="200" r="320" stroke="#1D2433" strokeWidth="1" fill="none" />

          {/* World Continents simplified wireframe paths */}
          {/* North America */}
          <path d="M 120 80 Q 200 60 260 120 T 180 200 Z" fill="none" stroke="#2A3449" strokeWidth="1" />
          {/* South America */}
          <path d="M 230 220 Q 280 260 250 340 T 210 270 Z" fill="none" stroke="#2A3449" strokeWidth="1" />
          {/* Europe & Africa */}
          <path d="M 380 90 Q 450 80 430 150 T 460 300 T 370 240 Z" fill="none" stroke="#2A3449" strokeWidth="1" />
          {/* Asia & India */}
          <path d="M 480 80 Q 650 70 680 180 T 580 250 T 520 180 Z" fill="none" stroke="#2A3449" strokeWidth="1" />
          {/* Australia */}
          <path d="M 650 260 Q 720 270 700 330 T 630 310 Z" fill="none" stroke="#2A3449" strokeWidth="1" />
        </svg>

        {/* Dynamic Flight Trajectories */}
        <svg viewBox="0 0 800 400" className="w-full h-full absolute inset-0 pointer-events-none">
          <defs>
            <linearGradient id="sovereignBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="adequacyBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="highRiskBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {uniqueDestinations.map((node, i) => {
            const isSelf = node.countryCode === 'IN';
            if (isSelf) return null;

            // Bezier curve control point to arc gracefully
            const dx = node.pos.x - origin.x;
            const dy = node.pos.y - origin.y;
            const cx = origin.x + dx / 2;
            const cy = Math.min(origin.y, node.pos.y) - 60;

            const strokeGradient = node.tier === 'High-Risk Tier' 
              ? 'url(#highRiskBeam)' 
              : node.tier === 'Adequacy Tier' 
              ? 'url(#adequacyBeam)' 
              : 'url(#sovereignBeam)';

            const strokeColor = node.tier === 'High-Risk Tier' ? '#EF4444' : node.tier === 'Adequacy Tier' ? '#F59E0B' : '#10B981';

            return (
              <g key={i}>
                <path
                  d={`M ${origin.x} ${origin.y} Q ${cx} ${cy} ${node.pos.x} ${node.pos.y}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={node.tier === 'High-Risk Tier' ? '2' : '1.5'}
                  strokeDasharray="6 4"
                  className="opacity-75 animate-pulse"
                />
              </g>
            );
          })}
        </svg>

        {/* Origin Sovereign Node (India) */}
        <div
          className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ left: `${(origin.x / 800) * 100}%`, top: `${(origin.y / 400) * 100}%` }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-tactical-emerald border-2 border-slate-900 shadow-[0_0_15px_#10B981]"></div>
            <div className="w-8 h-8 rounded-full border border-tactical-emerald/40 animate-ping absolute"></div>
          </div>
          <div className="absolute left-6 -top-2 bg-obsidian-950/95 border border-tactical-emerald/60 px-2 py-1 rounded text-[10px] font-mono text-tactical-emerald whitespace-nowrap shadow-lg">
            🇮🇳 <strong>Sovereign Origin</strong> (India)
          </div>
        </div>

        {/* Destination Nodes */}
        {uniqueDestinations.map((node, idx) => {
          const isSelf = node.countryCode === 'IN';
          if (isSelf) return null;

          const colorClass = node.tier === 'High-Risk Tier' 
            ? 'bg-tactical-crimson border-red-300 shadow-[0_0_14px_#EF4444]' 
            : node.tier === 'Adequacy Tier' 
            ? 'bg-tactical-amber border-amber-300 shadow-[0_0_10px_#F59E0B]' 
            : 'bg-tactical-emerald border-emerald-300 shadow-[0_0_10px_#10B981]';

          return (
            <div
              key={idx}
              className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${(node.pos.x / 800) * 100}%`, top: `${(node.pos.y / 400) * 100}%` }}
              onClick={() => setActiveNode(node)}
            >
              <div className={`w-3 h-3 rounded-full border ${colorClass} transition-transform hover:scale-150`}></div>
              
              {/* Tooltip on hover */}
              <div className="hidden group-hover:block absolute left-4 -top-3 z-30 bg-obsidian-900/95 border border-obsidian-700 px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-slate-100 whitespace-nowrap shadow-2xl backdrop-blur">
                <div className="font-bold flex items-center gap-1.5">
                  <span>{node.country}</span>
                  <span className={`text-[9px] px-1 rounded ${node.tier === 'High-Risk Tier' ? 'bg-tactical-crimsonDim text-tactical-crimson' : 'bg-tactical-amberDim text-tactical-amber'}`}>
                    {node.tier}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">{node.org}</div>
                <div className="text-[9px] text-slate-400 mt-0.5">{node.flows.length} Flow(s) • {node.latencyMs}ms</div>
              </div>
            </div>
          );
        })}

        {/* Radar Center HUD Coordinates */}
        <div className="absolute bottom-2 left-3 font-mono text-[10px] text-slate-400 flex items-center gap-3 bg-obsidian-900/80 px-2.5 py-1 rounded border border-obsidian-800">
          <span>TARGET: <strong className="text-slate-200">{domain || 'SYSTEM IDLE'}</strong></span>
          <span>EGRESS NODES: <strong className="text-slate-200">{uniqueDestinations.length}</strong></span>
          <span>LATENCY: <strong className="text-tactical-emerald">~18ms - 220ms</strong></span>
        </div>
      </div>

      {/* Selected Node Details Drawer */}
      {activeNode && (
        <div className="mt-3 p-3 bg-obsidian-850 rounded-lg border border-obsidian-700 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${activeNode.tier === 'High-Risk Tier' ? 'bg-tactical-crimsonDim text-tactical-crimson border border-tactical-crimson/30' : 'bg-tactical-amberDim text-tactical-amber border border-tactical-amber/30'}`}>
              {activeNode.tier}
            </div>
            <div>
              <span className="font-semibold text-slate-200">{activeNode.org}</span>
              <span className="text-slate-400 ml-2">({activeNode.city}, {activeNode.country})</span>
            </div>
          </div>
          <div className="text-slate-400 text-[11px]">
            ASN: <strong className="text-slate-200">{activeNode.asn}</strong> | DPDP: <span className="text-tactical-amber">{activeNode.dpdpStatus}</span>
          </div>
        </div>
      )}
    </div>
  );
}
