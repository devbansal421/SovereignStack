/**
 * DPDP Act 2023 Rules Engine & Sovereignty Risk Calculator
 */

export function analyzeDpdpCompliance(dataFlows, domain) {
  const total = dataFlows.length || 1;
  const domestic = dataFlows.filter(f => f.tier === "Sovereign Tier" || f.countryCode === "IN").length;
  const adequate = dataFlows.filter(f => f.tier === "Adequacy Tier").length;
  const highRisk = dataFlows.filter(f => f.tier === "High-Risk Tier").length;

  const domesticPercentage = Math.round((domestic / total) * 100);

  // Scoring algorithm: Base 100 - penalties
  let score = 100;
  // Penalty for high-risk foreign routing: -20 per flow (capped at 50)
  score -= Math.min(50, highRisk * 20);
  // Penalty for excessive adequacy reliance without localization: -2 per adequacy flow over 30%
  const nonDomesticRatio = (total - domestic) / total;
  if (nonDomesticRatio > 0.3) {
    score -= Math.round((nonDomesticRatio - 0.3) * 35);
  }
  score = Math.max(15, Math.min(100, score));

  // Determine grade & classification
  let grade = "Sovereign Enterprise Tier (Exemplary Localization)";
  if (score < 50) {
    grade = "Critical Sovereignty Hazard (High-Risk Cross-Border Exfiltration)";
  } else if (score < 75) {
    grade = "Restricted Sovereign Tier (Heavy Foreign Analytics Dependency)";
  } else if (score < 90) {
    grade = "Sovereign Tier with Adequate Third-Party Outbound Flows";
  }

  const findings = [];
  const remediations = [];

  if (highRisk > 0) {
    findings.push({
      clause: "DPDP Act 2023 Section 16 & MeitY Circulars",
      title: "Prohibited / High-Risk Jurisdictional Transfer",
      severity: "Critical",
      description: `${highRisk} outbound data flow(s) terminate in jurisdictions with mandatory foreign intelligence access laws or lacking reciprocal protections.`
    });
    remediations.push("Immediately terminate script tags routing telemetry to non-adequate foreign jurisdictions.");
  }

  if (adequate > 0) {
    findings.push({
      clause: "DPDP Act 2023 Section 16(1)",
      title: "Cross-Border Transfer to Commercial Adequacy Territories",
      severity: "Warning",
      description: `${adequate} outbound data flow(s) route to US/EU cloud vendors. Ensure standard contractual clauses and DPDP Data Processing Addendums are executed.`
    });
    remediations.push("Implement server-side tokenization / reverse proxy in domestic data centers (Mumbai/Hyderabad) before forwarding to international analytics platforms.");
  }

  if (domesticPercentage >= 70) {
    findings.push({
      clause: "DPDP Act 2023 Section 8(5)",
      title: "Substantial Domestic Infrastructure Retention",
      severity: "Success",
      description: `${domesticPercentage}% of all observed network interactions execute strictly on domestic Indian hosting infrastructure.`
    });
  }

  if (remediations.length === 0) {
    remediations.push("Maintain current zero-trust network boundary and regular quarterly DPDP compliance audits.");
  }

  return {
    sovereigntyScore: score,
    grade,
    metrics: {
      totalRequests: total,
      domesticRequests: domestic,
      adequateRequests: adequate,
      highRiskRequests: highRisk,
      domesticPercentage,
      uniqueCountries: new Set(dataFlows.map(f => f.countryCode || f.country)).size
    },
    findings,
    remediations
  };
}
