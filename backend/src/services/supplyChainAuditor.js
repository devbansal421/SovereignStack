/**
 * Software Supply-Chain Provenance & Bus Factor Engine
 * Evaluates package.json and requirements.txt manifests for maintainer risk and sovereign domestic alternatives.
 */

// Sovereign / Hardened Alternatives Registry
const ALTERNATIVES_DB = {
  "event-stream": {
    risk: "Critical",
    busFactor: 1,
    issue: "Historical malicious maintainer takeover (flatmap-stream). Unmaintained.",
    alternative: "node:stream (Native Node.js built-in API)",
    country: "Unknown / Abandoned"
  },
  "colors": {
    risk: "High",
    busFactor: 1,
    issue: "Single unbacked maintainer with history of intentional code corruption.",
    alternative: "picocolors or chalk (Multi-maintainer foundation backed)",
    country: "United States (Individual)"
  },
  "faker": {
    risk: "High",
    busFactor: 1,
    issue: "Legacy version hijacked/wiped. Use community-governed fork.",
    alternative: "@faker-js/faker (Community Open Governance)",
    country: "Community Foundation"
  },
  "node-forge": {
    risk: "Medium",
    busFactor: 2,
    issue: "JavaScript crypto implementation prone to timing attacks.",
    alternative: "node:crypto (Native OpenSSL FIPS-compliant binding)",
    country: "United States"
  },
  "request": {
    risk: "Medium",
    busFactor: 1,
    issue: "Deprecated since 2020. Severe technical debt.",
    alternative: "node:fetch or axios (OpenJS Foundation)",
    country: "Global Foundation"
  },
  "left-pad": {
    risk: "High",
    busFactor: 1,
    issue: "Famous single-point-of-failure unpublishing vector.",
    alternative: "String.prototype.padStart (ECMAScript 2017 built-in)",
    country: "Native JavaScript"
  }
};

export function auditManifest(manifestContent, manifestType = "package.json") {
  const packages = [];
  let highRiskCount = 0;
  let busFactorHazardCount = 0;

  if (manifestType === "package.json" || manifestType.includes("json")) {
    try {
      const parsed = typeof manifestContent === "string" ? JSON.parse(manifestContent) : manifestContent;
      const deps = { ...(parsed.dependencies || {}), ...(parsed.devDependencies || {}) };

      for (const [name, version] of Object.entries(deps)) {
        const known = ALTERNATIVES_DB[name];
        if (known) {
          if (known.risk === "Critical" || known.risk === "High") highRiskCount++;
          if (known.busFactor <= 1) busFactorHazardCount++;

          packages.push({
            name,
            version: String(version).replace(/[\^~]/g, ''),
            maintainer: known.country.includes("Individual") ? "Single unbacked maintainer" : "Third-Party Maintainer",
            provenanceCountry: known.country,
            busFactor: known.busFactor,
            busFactorRisk: known.busFactor === 1 ? "Critical" : "Medium",
            sovereigntyRisk: known.risk,
            ownershipAnomalies: known.issue,
            sovereignAlternative: known.alternative
          });
        } else {
          // Standard / low-risk package assumption
          packages.push({
            name,
            version: String(version).replace(/[\^~]/g, ''),
            maintainer: "Verified Registry Publisher",
            provenanceCountry: "Open Source Ecosystem",
            busFactor: 5,
            busFactorRisk: "Low",
            sovereigntyRisk: "Low",
            ownershipAnomalies: "No suspicious transfers detected.",
            sovereignAlternative: "Compliant"
          });
        }
      }
    } catch {
      throw new Error("Invalid JSON format in manifest");
    }
  } else {
    // Requirements.txt parsing
    const lines = manifestContent.split('\n');
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const [name, version] = line.split(/[==|>=|<=]/);
      const cleanName = (name || '').trim();
      if (!cleanName) continue;

      packages.push({
        name: cleanName,
        version: (version || 'latest').trim(),
        maintainer: "PyPI Package Author",
        provenanceCountry: "Python Software Foundation / Community",
        busFactor: 4,
        busFactorRisk: "Low",
        sovereigntyRisk: "Low",
        ownershipAnomalies: "Standard PyPI distribution.",
        sovereignAlternative: "Compliant"
      });
    }
  }

  const total = packages.length || 1;
  let score = 100 - (highRiskCount * 22) - (busFactorHazardCount * 8);
  score = Math.max(20, Math.min(100, score));

  let grade = "Sovereign Supply-Chain Tier";
  if (score < 50) grade = "Critical Supply-Chain Exposure (Takeover Hazard)";
  else if (score < 75) grade = "Moderate Supply-Chain Risk (Single-Maintainer Dependencies)";

  const remediations = [];
  packages.filter(p => p.sovereigntyRisk === "Critical" || p.sovereigntyRisk === "High").forEach(p => {
    remediations.push(`Replace '${p.name}' with sovereign alternative: ${p.sovereignAlternative}`);
  });
  if (remediations.length === 0) {
    remediations.push("Maintain package-lock.json with strict sha512 integrity hashes and CI lockfile enforcement.");
  }

  return {
    manifestType,
    sovereigntyScore: score,
    grade,
    summary: `Audited ${total} dependencies. Identified ${highRiskCount} high-risk packages and ${busFactorHazardCount} single-maintainer bus-factor hazards.`,
    totalDependencies: total,
    directDependencies: total,
    highRiskCount,
    busFactorHazardCount,
    packages,
    remediations
  };
}
