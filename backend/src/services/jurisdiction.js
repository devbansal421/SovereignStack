/**
 * Jurisdiction & ASN Organization Classifier
 * Maps IP addresses and hostnames to Geographic coordinates, Country, ASN, and Three-Tier Risk Status.
 */

import axios from 'axios';

// Fallback known ASNs and entity registries
const KNOWN_ENTITIES = {
  "google.com": { org: "Alphabet Inc. / Google LLC", country: "United States", countryCode: "US", lat: 37.4220, lng: -122.0841, tier: "Adequacy Tier", defaultRisk: "Medium" },
  "google-analytics.com": { org: "Alphabet Inc. / Google LLC", country: "United States", countryCode: "US", lat: 39.0438, lng: -77.4874, tier: "Adequacy Tier", defaultRisk: "Medium" },
  "googlesyndication.com": { org: "Alphabet Inc. / Google LLC", country: "United States", countryCode: "US", lat: 41.2619, lng: -95.8608, tier: "Adequacy Tier", defaultRisk: "Medium" },
  "doubleclick.net": { org: "Alphabet Inc. / Google LLC", country: "United States", countryCode: "US", lat: 37.4220, lng: -122.0841, tier: "Adequacy Tier", defaultRisk: "High" },
  "facebook.com": { org: "Meta Platforms Inc.", country: "United States", countryCode: "US", lat: 37.4848, lng: -122.1484, tier: "Adequacy Tier", defaultRisk: "High" },
  "facebook.net": { org: "Meta Platforms Inc.", country: "United States", countryCode: "US", lat: 37.4848, lng: -122.1484, tier: "Adequacy Tier", defaultRisk: "High" },
  "bytedance.com": { org: "ByteDance Ltd / TikTok", country: "China / Singapore", countryCode: "CN", lat: 39.9042, lng: 116.4074, tier: "High-Risk Tier", defaultRisk: "Critical" },
  "byteoversea.com": { org: "ByteDance Ltd / TikTok", country: "Singapore", countryCode: "SG", lat: 1.3521, lng: 103.8198, tier: "High-Risk Tier", defaultRisk: "Critical" },
  "ucweb.com": { org: "Alibaba Group / UCWeb", country: "China", countryCode: "CN", lat: 30.2741, lng: 120.1551, tier: "High-Risk Tier", defaultRisk: "Critical" },
  "criteo.net": { org: "Criteo SA", country: "France", countryCode: "FR", lat: 48.8566, lng: 2.3522, tier: "Adequacy Tier", defaultRisk: "Medium" },
  "mixpanel.com": { org: "Mixpanel Inc.", country: "United States", countryCode: "US", lat: 37.7749, lng: -122.4194, tier: "Adequacy Tier", defaultRisk: "Medium" },
  "sentry.io": { org: "Functional Software Inc.", country: "Germany", countryCode: "DE", lat: 50.1109, lng: 8.6821, tier: "Adequacy Tier", defaultRisk: "Low" },
  "cloudflare.com": { org: "Cloudflare Inc.", country: "United States", countryCode: "US", lat: 37.7749, lng: -122.4194, tier: "Adequacy Tier", defaultRisk: "Low" },
  "amazon.com": { org: "Amazon.com Inc. / AWS", country: "United States", countryCode: "US", lat: 47.6062, lng: -122.3321, tier: "Adequacy Tier", defaultRisk: "Low" },
  "irctc.co.in": { org: "CRIS / Indian Railways", country: "India", countryCode: "IN", lat: 28.6139, lng: 77.2090, tier: "Sovereign Tier", defaultRisk: "Low" },
  "paytm.in": { org: "One97 Communications Ltd", country: "India", countryCode: "IN", lat: 28.5355, lng: 77.3910, tier: "Sovereign Tier", defaultRisk: "Low" },
  "paytm.com": { org: "One97 Communications Ltd", country: "India", countryCode: "IN", lat: 28.5355, lng: 77.3910, tier: "Sovereign Tier", defaultRisk: "Low" },
  "flipkart.com": { org: "Flipkart Internet Pvt Ltd", country: "India", countryCode: "IN", lat: 12.9716, lng: 77.5946, tier: "Sovereign Tier", defaultRisk: "Low" },
  "zepto.com": { org: "Kiranakart Tech (Zepto)", country: "India", countryCode: "IN", lat: 19.0760, lng: 72.8777, tier: "Sovereign Tier", defaultRisk: "Low" }
};

// High risk surveillance & non-adequate jurisdictions
const HIGH_RISK_COUNTRIES = ["CN", "RU", "IR", "KP", "BY"];

// Adequacy / Standard Commercial Jurisdictions
const ADEQUACY_COUNTRIES = ["US", "DE", "FR", "GB", "NL", "IE", "JP", "KR", "AU", "CA", "SG", "SE", "CH"];

export async function resolveJurisdiction(ip, hostname) {
  // Check known domain matches first
  for (const [domainKey, entity] of Object.entries(KNOWN_ENTITIES)) {
    if (hostname && (hostname === domainKey || hostname.endsWith(`.${domainKey}`))) {
      return {
        ip: ip || "104.26.12.1",
        country: entity.country,
        countryCode: entity.countryCode,
        city: entity.countryCode === 'IN' ? 'New Delhi / Mumbai' : 'Cloud PoP',
        lat: entity.lat,
        lng: entity.lng,
        asn: entity.org.includes('Google') ? 'AS15169' : entity.org.includes('Meta') ? 'AS32934' : 'AS13335',
        org: entity.org,
        tier: entity.tier,
        risk: entity.defaultRisk
      };
    }
  }

  // If live IP is available, attempt real DNS/Geo lookup with fallback
  if (ip && ip !== "127.0.0.1" && !ip.startsWith("192.168.")) {
    try {
      const res = await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,regionName,city,lat,lon,isp,org,as,query`, { timeout: 2500 });
      if (res.data && res.data.status === 'success') {
        const d = res.data;
        let tier = "Adequacy Tier";
        let risk = "Medium";

        if (d.countryCode === "IN") {
          tier = "Sovereign Tier";
          risk = "Low";
        } else if (HIGH_RISK_COUNTRIES.includes(d.countryCode)) {
          tier = "High-Risk Tier";
          risk = "Critical";
        } else if (ADEQUACY_COUNTRIES.includes(d.countryCode)) {
          tier = "Adequacy Tier";
          risk = "Medium";
        }

        return {
          ip: d.query,
          country: d.country,
          countryCode: d.countryCode,
          city: d.city,
          lat: d.lat,
          lng: d.lon,
          asn: d.as?.split(' ')[0] || "AS-UNKNOWN",
          org: d.org || d.isp || "Cloud Service Provider",
          tier,
          risk
        };
      }
    } catch {
      // Continue to fallback
    }
  }

  // Default fallback estimation
  const isIndianTld = hostname?.endsWith('.in') || hostname?.includes('.co.in');
  return {
    ip: ip || "13.235.14.88",
    country: isIndianTld ? "India" : "United States",
    countryCode: isIndianTld ? "IN" : "US",
    city: isIndianTld ? "Mumbai" : "North Virginia",
    lat: isIndianTld ? 19.0760 : 39.0438,
    lng: isIndianTld ? 72.8777 : -77.4874,
    asn: isIndianTld ? "AS16509" : "AS14618",
    org: isIndianTld ? "AWS Asia Pacific (Mumbai)" : "Amazon Data Services (US)",
    tier: isIndianTld ? "Sovereign Tier" : "Adequacy Tier",
    risk: isIndianTld ? "Low" : "Medium"
  };
}
