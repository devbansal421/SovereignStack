import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert, Globe2 } from 'lucide-react';

export default function SovereigntyGauge({ score = 85, grade = "Sovereign Tier", metrics = {} }) {
  // SVG circular arc calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let scoreColor = '#10B981'; // emerald
  let strokeClass = 'text-tactical-emerald';
  let badgeBg = 'bg-tactical-emeraldDim text-tactical-emerald border-tactical-emerald/30';
  let Icon = ShieldCheck;

  if (score < 50) {
    scoreColor = '#EF4444'; // crimson
    strokeClass = 'text-tactical-crimson';
    badgeBg = 'bg-tactical-crimsonDim text-tactical-crimson border-tactical-crimson/30';
    Icon = ShieldAlert;
  } else if (score < 75) {
    scoreColor = '#F59E0B'; // amber
    strokeClass = 'text-tactical-amber';
    badgeBg = 'bg-tactical-amberDim text-tactical-amber border-tactical-amber/30';
    Icon = AlertTriangle;
  }

  return (
    <div className="bg-obsidian-900 border border-obsidian-700 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-obsidian-700/80 pb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color: scoreColor }} />
          <h3 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">Sovereignty Score</h3>
        </div>
        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border font-medium ${badgeBg}`}>
          {score >= 75 ? 'DPDP Adequacy Pass' : score >= 50 ? 'Restricted Transfer' : 'Non-Compliant'}
        </span>
      </div>

      <div className="flex items-center justify-center py-4 relative">
        <div className="relative flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-obsidian-700/60"
            />
            {/* Progress ring */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`${strokeClass} transition-all duration-1000 ease-out`}
            />
          </svg>

          {/* Center text */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-display font-bold text-3xl text-slate-100 tabular-nums leading-none">
              {score}
            </span>
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">/ 100</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-obsidian-700/80">
        <p className="font-mono text-xs text-slate-200 font-medium truncate text-center mb-2">
          {grade}
        </p>

        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono bg-obsidian-850 p-2 rounded-lg border border-obsidian-700">
          <div>
            <div className="text-slate-400">Domestic</div>
            <div className="font-bold text-tactical-emerald">{metrics.domesticPercentage || 0}%</div>
          </div>
          <div className="border-x border-obsidian-700">
            <div className="text-slate-400">Adequacy</div>
            <div className="font-bold text-tactical-amber">{metrics.adequateRequests || 0}</div>
          </div>
          <div>
            <div className="text-slate-400">High-Risk</div>
            <div className="font-bold text-tactical-crimson">{metrics.highRiskRequests || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
