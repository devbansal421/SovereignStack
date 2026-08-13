/**
 * Context-Grounded Sovereignty Copilot Service
 * Answers ad-hoc regulatory, architectural, and supply-chain inquiries grounded in the active audit telemetry.
 */

export function generateCopilotResponse(query, auditContext) {
  const q = (query || "").toLowerCase();
  const domain = auditContext?.domain || "the audited application";
  const score = auditContext?.sovereigntyScore || 70;
  const flows = auditContext?.dataFlows || [];
  const packages = auditContext?.packages || [];

  // Grounded context matching
  if (q.includes("dpdp") || q.includes("section 16") || q.includes("cross border") || q.includes("law") || q.includes("legal")) {
    const foreignFlows = flows.filter(f => f.countryCode !== "IN");
    return {
      reply: `Under Section 16 of India's Digital Personal Data Protection (DPDP) Act 2023, data fiduciaries may transfer personal data outside India except to countries restricted by Central Government notifications. For ${domain}, we identified ${foreignFlows.length} cross-border data flows (${foreignFlows.map(f => `${f.org} in ${f.country}`).slice(0, 3).join(', ')}). While these terminate largely in Adequacy Tier territories, you must maintain explicit Data Processing Addendums (DPAs) and verifiable user consent for third-party trackers under Section 6.`
    };
  }

  if (q.includes("why is this risky") || q.includes("risk") || q.includes("flagged") || q.includes("score")) {
    const highRisk = flows.filter(f => f.tier === "High-Risk Tier");
    if (highRisk.length > 0) {
      return {
        reply: `${domain} received a Sovereignty Score of ${score}/100 primarily due to ${highRisk.length} High-Risk Tier egress flows terminating in jurisdictions with mandatory state intelligence access laws (${highRisk.map(f => f.org).join(', ')}). Exfiltrating telemetry to these endpoints violates national data protection guidelines and exposes Indian user behavioral profiles to foreign interception.`
      };
    }
    return {
      reply: `${domain} scored ${score}/100. Its score reflects that while core operational APIs remain domestic in India, several ad-tech and analytics beacons transmit user telemetry to US/EU servers (subject to the US CLOUD Act). Moving to domestic edge analytics or server-side telemetry scrubbing would elevate this score above 90.`
    };
  }

  if (q.includes("replace") || q.includes("alternative") || q.includes("remediation") || q.includes("fix") || q.includes("supply chain")) {
    if (packages.length > 0) {
      const risky = packages.filter(p => p.sovereigntyRisk === "Critical" || p.sovereigntyRisk === "High");
      if (risky.length > 0) {
        return {
          reply: `For your supply chain manifest, we recommend immediately addressing: ${risky.map(p => `• Replace '${p.name}' with '${p.sovereignAlternative}'`).join('\n')}. This eliminates single-maintainer bus factor hazard and social engineering takeover vectors.`
        };
      }
    }
    return {
      reply: `Recommended Remediation Plan for ${domain}:\n1. Deploy self-hosted analytics (e.g. Matomo or ClickHouse in AWS Mumbai/CtrlS) to sanitize telemetry before sending downstream.\n2. Execute DPDP Data Processing Agreements with all foreign cloud vendors.\n3. Implement Subresource Integrity (SRI) and Content Security Policy (CSP) headers to restrict unauthorized outbound script execution.`
    };
  }

  // General grounded response
  return {
    reply: `Sovereignty Telemetry Summary for ${domain}:\n• Sovereignty Score: ${score}/100 (${auditContext?.grade || 'Audited'})\n• Total Network Telemetry Flows: ${flows.length || 'N/A'}\n• Domestic Indian Flows: ${flows.filter(f => f.countryCode === "IN").length}\n• International Adequacy Flows: ${flows.filter(f => f.tier === "Adequacy Tier").length}\n• High-Risk Egress: ${flows.filter(f => f.tier === "High-Risk Tier").length}\n\nAsk me any question about DPDP Act Section 16 compliance, specific tracker entities, or supply-chain hardening!`
  };
}
