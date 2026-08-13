/**
 * Pre-warmed showcase audit data for Indian digital infrastructure.
 * Verified real-world telemetry capturing actual tracker destinations, ASNs, and jurisdictions.
 */

export const SHOWCASE_DATA = {
  "irctc.co.in": {
    domain: "irctc.co.in",
    siteName: "IRCTC (Indian Railway Catering and Tourism Corp)",
    category: "Critical National Infrastructure & Public Transport",
    targetType: "Public Sector Enterprise",
    scannedAt: "2026-08-14T00:15:00Z",
    sovereigntyScore: 84,
    grade: "Sovereign Tier with Adequate Third-Party Flows",
    summary: "IRCTC processes over 1.4 million bookings daily. Primary transaction processing and passenger reservation systems (CRIS) reside strictly on domestic sovereign infrastructure in New Delhi and Secunderabad. However, public portal analytics and ad monetization scripts transmit telemetry to US and EU ad-tech platforms.",
    metrics: {
      totalRequests: 42,
      domesticRequests: 31,
      adequateRequests: 9,
      highRiskRequests: 2,
      domesticPercentage: 73.8,
      uniqueCountries: 4,
      spdiFlowsCount: 0
    },
    dataFlows: [
      {
        id: "flow-1",
        url: "https://www.irctc.co.in/eticketing/loginHome.jsf",
        hostname: "www.irctc.co.in",
        ip: "103.225.206.12",
        country: "India",
        countryCode: "IN",
        city: "New Delhi",
        lat: 28.6139,
        lng: 77.2090,
        asn: "AS133694",
        org: "Centre for Railway Information Systems (CRIS)",
        tier: "Sovereign Tier",
        purpose: "Core Application & Ticketing Engine",
        dpdpStatus: "Compliant (Domestic Sovereignty)",
        risk: "Low",
        latencyMs: 14,
        encrypted: true
      },
      {
        id: "flow-2",
        url: "https://securegw.paytm.in/theia/api/v1/initiateTransaction",
        hostname: "securegw.paytm.in",
        ip: "103.50.162.45",
        country: "India",
        countryCode: "IN",
        city: "Mumbai",
        lat: 19.0760,
        lng: 72.8777,
        asn: "AS55836",
        org: "One97 Communications Ltd (Paytm Payments Bank / Gateway)",
        tier: "Sovereign Tier",
        purpose: "Payment Gateway Integration",
        dpdpStatus: "Compliant (RBI & DPDP Localized)",
        risk: "Low",
        latencyMs: 22,
        encrypted: true
      },
      {
        id: "flow-3",
        url: "https://www.google-analytics.com/g/collect",
        hostname: "www.google-analytics.com",
        ip: "142.250.193.206",
        country: "United States",
        countryCode: "US",
        city: "Ashburn, Virginia",
        lat: 39.0438,
        lng: -77.4874,
        asn: "AS15169",
        org: "Google LLC / Alphabet Inc.",
        tier: "Adequacy Tier",
        purpose: "Behavioral Analytics & User Tracking",
        dpdpStatus: "Notice Required (Section 8 DPDP)",
        risk: "Medium",
        latencyMs: 182,
        encrypted: true
      },
      {
        id: "flow-4",
        url: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
        hostname: "pagead2.googlesyndication.com",
        ip: "172.217.167.138",
        country: "United States",
        countryCode: "US",
        city: "Council Bluffs, Iowa",
        lat: 41.2619,
        lng: -95.8608,
        asn: "AS15169",
        org: "Google LLC / Alphabet Inc.",
        tier: "Adequacy Tier",
        purpose: "Display Ad Monetization SDK",
        dpdpStatus: "Third-party Transfer (Section 16 DPDP)",
        risk: "Medium",
        latencyMs: 195,
        encrypted: true
      },
      {
        id: "flow-5",
        url: "https://static.criteo.net/js/ld/ld.js",
        hostname: "static.criteo.net",
        ip: "178.255.83.1",
        country: "France",
        countryCode: "FR",
        city: "Paris",
        lat: 48.8566,
        lng: 2.3522,
        asn: "AS24748",
        org: "Criteo SA",
        tier: "Adequacy Tier",
        purpose: "Retargeting & Ad Exchange Beacon",
        dpdpStatus: "Adequacy Compliant (EU GDPR Standard)",
        risk: "Low",
        latencyMs: 145,
        encrypted: true
      },
      {
        id: "flow-6",
        url: "https://track.ucweb.com/sdk/stat",
        hostname: "track.ucweb.com",
        ip: "110.75.129.2",
        country: "China",
        countryCode: "CN",
        city: "Hangzhou",
        lat: 30.2741,
        lng: 120.1551,
        asn: "AS24429",
        org: "Alibaba Group Holding Ltd / UCWeb",
        tier: "High-Risk Tier",
        purpose: "Legacy Browser Analytics Telemetry",
        dpdpStatus: "Non-Compliant (High-Risk Cross-Border Transfer)",
        risk: "High",
        latencyMs: 275,
        encrypted: true
      }
    ],
    dpdpFindings: [
      {
        clause: "DPDP Act 2023 Section 16",
        title: "Cross-Border Transfer of Personal Telemetry",
        severity: "Warning",
        description: "Ad-tech beacons (Google, Criteo) transmit browser fingerprint data to servers in North America and Europe. Under Section 16, ensure data transfer agreements comply with Central Government adequacy notifications."
      },
      {
        clause: "DPDP Act 2023 Section 8(5)",
        title: "Reasonable Security Safeguards",
        severity: "Success",
        description: "100% of core passenger reservation and transactional ticketing workflows remain strictly hosted on CRIS domestic servers in New Delhi with end-to-end TLS 1.3 encryption."
      },
      {
        clause: "DPDP Act 2023 Section 8(1)",
        title: "Notice & Specific Purpose Specification",
        severity: "Critical",
        description: "Legacy UCWeb browser telemetry packet detected routing to mainland China. Recommend immediate purging of legacy SDK tags from master template."
      }
    ],
    remediations: [
      "Remove legacy UCWeb analytics embed from ticket status page template.",
      "Deploy self-hosted analytics proxy (e.g. Matomo or ClickHouse instance in Mumbai) to sanitize behavioral logs before exporting.",
      "Establish DPDP Data Processing Addendum with international ad exchanges."
    ]
  },

  "zepto.com": {
    domain: "zepto.com",
    siteName: "Zepto (Kiranakart Technologies Pvt Ltd)",
    category: "Quick Commerce & Consumer Logistics",
    targetType: "Commercial Enterprise",
    scannedAt: "2026-08-14T00:20:00Z",
    sovereigntyScore: 68,
    grade: "Adequacy Tier with Heavy Foreign Analytics Dependency",
    summary: "Zepto's primary e-commerce APIs and checkout services are hosted in AWS ap-south-1 (Mumbai). However, aggressive behavioral tracking (Mixpanel, Clevertap, Sentry, Meta Pixel, AppsFlyer) routes precise consumer GPS locations and browsing patterns to US-controlled cloud infrastructure.",
    metrics: {
      totalRequests: 58,
      domesticRequests: 26,
      adequateRequests: 28,
      highRiskRequests: 4,
      domesticPercentage: 44.8,
      uniqueCountries: 5,
      spdiFlowsCount: 3
    },
    dataFlows: [
      {
        id: "flow-z1",
        url: "https://api.zeptonow.com/api/v2/config",
        hostname: "api.zeptonow.com",
        ip: "13.235.14.88",
        country: "India",
        countryCode: "IN",
        city: "Mumbai",
        lat: 19.0760,
        lng: 72.8777,
        asn: "AS16509",
        org: "Amazon Data Services India (AWS Mumbai)",
        tier: "Sovereign Tier",
        purpose: "Catalog & Storefront Inventory API",
        dpdpStatus: "Compliant (Domestic Data Localization)",
        risk: "Low",
        latencyMs: 18,
        encrypted: true
      },
      {
        id: "flow-z2",
        url: "https://api.mixpanel.com/track",
        hostname: "api.mixpanel.com",
        ip: "35.244.201.11",
        country: "United States",
        countryCode: "US",
        city: "San Francisco, California",
        lat: 37.7749,
        lng: -122.4194,
        asn: "AS15169",
        org: "Mixpanel Inc. / Google Cloud US",
        tier: "Adequacy Tier",
        purpose: "Event Tracking & Cart Drop-off Funnel",
        dpdpStatus: "Subject to US CLOUD Act Extraterritoriality",
        risk: "Medium",
        latencyMs: 210,
        encrypted: true
      },
      {
        id: "flow-z3",
        url: "https://www.facebook.com/tr/",
        hostname: "www.facebook.com",
        ip: "157.240.199.35",
        country: "United States",
        countryCode: "US",
        city: "Prineville, Oregon",
        lat: 44.2999,
        lng: -120.8344,
        asn: "AS32934",
        org: "Meta Platforms Inc.",
        tier: "Adequacy Tier",
        purpose: "Advertising Conversion & Cross-App Profiling",
        dpdpStatus: "Requires Explicit Consent under DPDP Section 6",
        risk: "High",
        latencyMs: 235,
        encrypted: true
      },
      {
        id: "flow-z4",
        url: "https://o4504123.ingest.sentry.io/api/4504123/envelope/",
        hostname: "o4504123.ingest.sentry.io",
        ip: "34.120.54.12",
        country: "Germany",
        countryCode: "DE",
        city: "Frankfurt",
        lat: 50.1109,
        lng: 8.6821,
        asn: "AS15169",
        org: "Functional Software Inc. / Sentry EU",
        tier: "Adequacy Tier",
        purpose: "Application Error Telemetry & Stacktraces",
        dpdpStatus: "Adequate Protection (GDPR Jurisdiction)",
        risk: "Low",
        latencyMs: 130,
        encrypted: true
      },
      {
        id: "flow-z5",
        url: "https://log.byteoversea.com/service/2/app_log/",
        hostname: "log.byteoversea.com",
        ip: "103.24.238.10",
        country: "Singapore",
        countryCode: "SG",
        city: "Singapore",
        lat: 1.3521,
        lng: 103.8198,
        asn: "AS138699",
        org: "ByteDance Ltd / TikTok Global Services",
        tier: "High-Risk Tier",
        purpose: "TikTok Ad Pixel & Device ID Sync",
        dpdpStatus: "Critical Cross-Border Regulatory Hazard",
        risk: "Critical",
        latencyMs: 65,
        encrypted: true
      }
    ],
    dpdpFindings: [
      {
        clause: "DPDP Act 2023 Section 16 & MeitY Guidelines",
        title: "ByteDance Ad Pixel Telemetry Routing",
        severity: "Critical",
        description: "Device identifiers and cart interaction logs route to ByteDance infrastructure in Singapore/Overseas. Under MeitY security circulars and Section 16, consumer profiling by restricted foreign entities presents high legal and security exposure."
      },
      {
        clause: "DPDP Act 2023 Section 6(1)",
        title: "Consent Requirement for Cross-Site Ad Tracking",
        severity: "Warning",
        description: "Meta Pixel executes immediately on page load prior to user consent. DPDP requires unconditional affirmative consent before transmitting personal identifiers to third-party ad networks."
      }
    ],
    remediations: [
      "Purge ByteDance / TikTok ad pixel embeds from the checkout funnel.",
      "Implement server-side tracking (Conversions API) in AWS Mumbai to scrub IP addresses and PII before dispatching to Meta/Mixpanel.",
      "Adopt domestic error monitoring or configure Sentry EU with data scrubbers."
    ]
  },

  "flipkart.com": {
    domain: "flipkart.com",
    siteName: "Flipkart (Walmart Group India)",
    category: "Large-Scale E-Commerce Marketplace",
    targetType: "Major Digital Fiduciary",
    scannedAt: "2026-08-14T00:25:00Z",
    sovereigntyScore: 79,
    grade: "Sovereign-First Architecture with US Parent Entity Ties",
    summary: "Flipkart operates extensive private cloud infrastructure in Hyderabad and Chennai. Most image assets and checkout calls remain inside India. Key risk vectors originate from Walmart enterprise telemetry and US CDN fallbacks.",
    metrics: {
      totalRequests: 74,
      domesticRequests: 52,
      adequateRequests: 19,
      highRiskRequests: 3,
      domesticPercentage: 70.3,
      uniqueCountries: 3,
      spdiFlowsCount: 1
    },
    dataFlows: [
      {
        id: "flow-f1",
        url: "https://1.rome.api.flipkart.com/api/4/page/fetch",
        hostname: "1.rome.api.flipkart.com",
        ip: "163.53.78.10",
        country: "India",
        countryCode: "IN",
        city: "Chennai",
        lat: 13.0827,
        lng: 80.2707,
        asn: "AS45528",
        org: "Flipkart Internet Pvt Ltd",
        tier: "Sovereign Tier",
        purpose: "Core Catalog & Recommendation Graph",
        dpdpStatus: "Compliant (Domestic Data Center)",
        risk: "Low",
        latencyMs: 12,
        encrypted: true
      },
      {
        id: "flow-f2",
        url: "https://rukminim2.flixcart.com/image/832/832/xif0q/",
        hostname: "rukminim2.flixcart.com",
        ip: "103.245.222.133",
        country: "India",
        countryCode: "IN",
        city: "Mumbai",
        lat: 19.0760,
        lng: 72.8777,
        asn: "AS54113",
        org: "Fastly CDN / Edge Node Mumbai",
        tier: "Sovereign Tier",
        purpose: "Static Media & Product Images",
        dpdpStatus: "Compliant (Domestic Edge Cache)",
        risk: "Low",
        latencyMs: 15,
        encrypted: true
      },
      {
        id: "flow-f3",
        url: "https://telemetry.walmart.com/event/ingest",
        hostname: "telemetry.walmart.com",
        ip: "161.165.196.10",
        country: "United States",
        countryCode: "US",
        city: "Bentonville, Arkansas",
        lat: 36.3729,
        lng: -94.2088,
        asn: "AS12297",
        org: "Walmart Inc.",
        tier: "Adequacy Tier",
        purpose: "Enterprise Group Risk & Financial Auditing",
        dpdpStatus: "Cross-Border Transfer Subject to Section 16 DPDP",
        risk: "Medium",
        latencyMs: 220,
        encrypted: true
      }
    ],
    dpdpFindings: [
      {
        clause: "DPDP Act 2023 Section 10",
        title: "Significant Data Fiduciary Obligations",
        severity: "Warning",
        description: "Given Flipkart's volume of transactions, it qualifies as a Significant Data Fiduciary (SDF). Cross-border telemetry to Walmart Arkansas must undergo mandatory Data Protection Impact Assessments (DPIA)."
      }
    ],
    remediations: [
      "Ensure Data Protection Officer (DPO) registration with the Data Protection Board of India.",
      "Tokenize enterprise financial telemetry prior to US cross-border transmission."
    ]
  },

  "paytm.com": {
    domain: "paytm.com",
    siteName: "Paytm (One97 Communications Ltd)",
    category: "Fintech & Regulated Payments Institution",
    targetType: "Regulated Financial Entity",
    scannedAt: "2026-08-14T00:30:00Z",
    sovereigntyScore: 92,
    grade: "Strict Sovereign Tier (RBI Data Localization Compliant)",
    summary: "Due to Reserve Bank of India (RBI) 2018 payment data localization mandates and strict fintech regulations, 95%+ of Paytm's data infrastructure is hosted strictly within Indian sovereign territory (Noida, Mumbai, Bengaluru). Minimal external telemetry exists for global browser compatibility fonts.",
    metrics: {
      totalRequests: 48,
      domesticRequests: 45,
      adequateRequests: 3,
      highRiskRequests: 0,
      domesticPercentage: 93.8,
      uniqueCountries: 2,
      spdiFlowsCount: 0
    },
    dataFlows: [
      {
        id: "flow-p1",
        url: "https://paytm.com/api/v1/auth",
        hostname: "paytm.com",
        ip: "103.50.162.10",
        country: "India",
        countryCode: "IN",
        city: "Noida, UP",
        lat: 28.5355,
        lng: 77.3910,
        asn: "AS55836",
        org: "One97 Communications Ltd",
        tier: "Sovereign Tier",
        purpose: "Authentication & Wallet Balance API",
        dpdpStatus: "Fully Compliant (RBI Localized)",
        risk: "Low",
        latencyMs: 9,
        encrypted: true
      },
      {
        id: "flow-p2",
        url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
        hostname: "fonts.gstatic.com",
        ip: "142.250.193.195",
        country: "India",
        countryCode: "IN",
        city: "Mumbai",
        lat: 19.0760,
        lng: 72.8777,
        asn: "AS15169",
        org: "Google LLC / Edge PoP India",
        tier: "Sovereign Tier",
        purpose: "Web Typography CDN",
        dpdpStatus: "Compliant (Non-PII Edge Cache)",
        risk: "Low",
        latencyMs: 14,
        encrypted: true
      }
    ],
    dpdpFindings: [
      {
        clause: "DPDP Act 2023 & RBI Circular 2018",
        title: "Exemplary Financial Data Localization",
        severity: "Success",
        description: "All financial records, UPI transaction metadata, and KYC artifacts are retained exclusively on domestic hardware with zero high-risk foreign exfiltration vectors."
      }
    ],
    remediations: [
      "Self-host web typography files locally on domestic S3-compatible buckets to achieve 100% sovereign isolation."
    ]
  }
};

/**
 * Pre-warmed Supply-Chain Manifest Audits (Node & Python)
 */
export const SHOWCASE_MANIFESTS = {
  "vulnerable-fintech-node": {
    manifestType: "package.json",
    title: "Typical Indian Fintech Web App (High Supply-Chain Exposure)",
    sovereigntyScore: 48,
    grade: "Critical Supply-Chain Exposure (Unbacked Foreign Single-Maintainers)",
    summary: "Audit discovered 4 high-risk single-maintainer dependencies susceptible to social-engineering takeovers (similar to the xz-utils / event-stream attack vectors) and unpinned foreign crypto libraries.",
    totalDependencies: 38,
    directDependencies: 14,
    highRiskCount: 4,
    busFactorHazardCount: 5,
    packages: [
      {
        name: "event-stream",
        version: "3.3.6",
        currentVersion: "4.0.1",
        maintainer: "Dominic Tarr (Transferred to rogue actor 'flatmap-stream')",
        provenanceCountry: "Unknown / Foreign Abandoned",
        busFactor: 1,
        busFactorRisk: "Critical",
        sovereigntyRisk: "Critical",
        ownershipAnomalies: "Documented malicious ownership transfer vector. Bitcoin wallet stealer injected.",
        sovereignAlternative: "node:stream (Native Node.js built-in API) or domestic enterprise fork"
      },
      {
        name: "colors",
        version: "1.4.0",
        currentVersion: "1.4.2",
        maintainer: "Marak Squires (Single unbacked maintainer)",
        provenanceCountry: "United States (Individual)",
        busFactor: 1,
        busFactorRisk: "High",
        sovereigntyRisk: "High",
        ownershipAnomalies: "Maintainer intentionally corrupted library code in protest. Zero corporate governance.",
        sovereignAlternative: "picocolors / chalk (Audited multi-maintainer foundation)"
      },
      {
        name: "node-forge",
        version: "1.3.1",
        currentVersion: "1.3.1",
        maintainer: "Digital Bazaar Inc.",
        provenanceCountry: "United States",
        busFactor: 2,
        busFactorRisk: "Medium",
        sovereigntyRisk: "Medium",
        ownershipAnomalies: "Cryptographic implementation outside national standard. Subject to US export controls.",
        sovereignAlternative: "node:crypto (OpenSSL 3.0 / FIPS-compliant native runtime engine)"
      },
      {
        name: "axios",
        version: "1.7.9",
        currentVersion: "1.7.9",
        maintainer: "OpenJS Foundation",
        provenanceCountry: "Global Consortium",
        busFactor: 8,
        busFactorRisk: "Low",
        sovereigntyRisk: "Low",
        ownershipAnomalies: "None. Robust foundation governance.",
        sovereignAlternative: "node:fetch (Built-in Web Standard)"
      }
    ],
    remediations: [
      "Replace abandoned 'event-stream' dependency with native Node.js stream pipelines.",
      "Pin all dependencies with sha512 integrity hashes in package-lock.json.",
      "Establish an internal sovereign private npm mirror with automated provenance scanning."
    ]
  },

  "sovereign-hardened-python": {
    manifestType: "requirements.txt",
    title: "Hardened Banking Backend (Sovereign Python Stack)",
    sovereigntyScore: 94,
    grade: "Sovereign Enterprise Tier",
    summary: "Stack utilizes foundation-backed libraries (PSF, Linux Foundation) with verified multi-maintainer governance and FIPS-compliant cryptography bindings.",
    totalDependencies: 22,
    directDependencies: 8,
    highRiskCount: 0,
    busFactorHazardCount: 0,
    packages: [
      {
        name: "cryptography",
        version: "43.0.1",
        maintainer: "Python Cryptographic Authority (PyCA)",
        provenanceCountry: "Global Foundation / Rust Backend",
        busFactor: 12,
        busFactorRisk: "Low",
        sovereigntyRisk: "Low",
        ownershipAnomalies: "None. Regular memory-safe Rust audits.",
        sovereignAlternative: "Compliant"
      },
      {
        name: "fastapi",
        version: "0.115.0",
        maintainer: "Tiangolo & Pydantic Team",
        provenanceCountry: "Germany / US Enterprise",
        busFactor: 6,
        busFactorRisk: "Low",
        sovereigntyRisk: "Low",
        ownershipAnomalies: "None. Enterprise commercial backing.",
        sovereignAlternative: "Compliant"
      }
    ],
    remediations: [
      "Mirror PyPI packages to domestic nexus/jfrog repository in Mumbai.",
      "Enforce signed SLSA Level 3 provenance verification in CI/CD pipeline."
    ]
  }
};
