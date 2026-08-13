import React from 'react';
import { Shield, Sparkles, Building2, ShoppingBag, Landmark, Train } from 'lucide-react';

export default function PreWarmedSelector({ onSelectDomain, activeDomain, showcaseSites = [] }) {
  const getIcon = (key) => {
    if (key.includes('irctc')) return Train;
    if (key.includes('paytm')) return Landmark;
    if (key.includes('flipkart')) return ShoppingBag;
    return Building2;
  };

  return (
    <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-tactical-amber" />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
            Pre-Warmed Infrastructure Showcase
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">1-Click Live Audits</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {showcaseSites.map((site) => {
          const IconComponent = getIcon(site.key);
          const isSelected = activeDomain === site.key || activeDomain === site.domain;
          
          let scoreBadge = "text-tactical-emerald bg-tactical-emeraldDim border-tactical-emerald/30";
          if (site.score < 50) scoreBadge = "text-tactical-crimson bg-tactical-crimsonDim border-tactical-crimson/30";
          else if (site.score < 75) scoreBadge = "text-tactical-amber bg-tactical-amberDim border-tactical-amber/30";

          return (
            <button
              key={site.key}
              onClick={() => onSelectDomain(site.key)}
              className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-obsidian-800 border-tactical-amber shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                  : 'bg-obsidian-850/80 border-obsidian-750 hover:border-obsidian-600 hover:bg-obsidian-800'
              }`}
            >
              <div className="flex items-start justify-between w-full mb-2">
                <div className="p-1.5 rounded bg-obsidian-950 border border-obsidian-700 text-slate-300">
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${scoreBadge}`}>
                  {site.score}/100
                </span>
              </div>

              <div>
                <div className="font-display font-bold text-xs text-slate-100 truncate">{site.name}</div>
                <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">{site.category}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
