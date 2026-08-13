# SovereignStack

SovereignStack is a digital sovereignty audit platform that discovers, analyzes, and scores cross-border data flows and software supply-chain dependencies against Indian data sovereignty and compliance frameworks.

## Language

### Data Flow Auditing

**Audited Domain**:
The top-level web application or website hostname submitted for data flow inspection.
_Avoid_: Target site, scanned URL, input host

**Data Flow**:
An outbound network request emitted during runtime execution from an Audited Domain to an external endpoint.
_Avoid_: Network call, outbound ping, egress traffic

**Destination Jurisdiction**:
The sovereign nation and legal territory where the receiving IP address or host server of a Data Flow is physically located and governed.
_Avoid_: Server location, country tag, endpoint region

**Sovereignty Risk Score**:
A normalized numerical rating (0–100, where 100 is fully sovereign) representing the legal, geopolitical, and cross-border exposure of an Audited Domain or Software Supply Chain.
_Avoid_: Security score, compliance grade, safety index

**Controlling Entity**:
The ultimate parent corporation or legal entity that owns, operates, or exerts legal control over the endpoint receiving the Data Flow.
_Avoid_: Vendor, third party, company name

**Sovereign Tier (Domestic)**:
Data Flow endpoints terminating strictly within Indian national borders and domestic legal jurisdiction.
_Avoid_: Local host, internal IP

**Adequacy Tier**:
International jurisdictions recognized as possessing structured data protection regulations, subject to cross-border transfer safeguards.
_Avoid_: Allied country, safe zone

**High-Risk Tier**:
Jurisdictions lacking reciprocal data protections, or subject to state surveillance mandates and extraterritorial data seizure laws.
_Avoid_: Blacklisted country, rogue host

### Supply Chain Auditing

**Audited Manifest**:
A software dependency manifest (`package.json` or `requirements.txt`) uploaded to evaluate third-party component provenance.
_Avoid_: Config file, dependencies file, build file

**Maintainer Provenance**:
The verified organizational backing, country of origin, and identity history of a package's publishing authors.
_Avoid_: Author info, developer tag, owner details

**Bus Factor Risk**:
The vulnerability state of a package relying entirely on an unbacked single maintainer susceptible to abandonment or social engineering takeovers.
_Avoid_: Single point of failure, maintainer count

**Sovereign Alternative**:
A hardened, domestically-maintained, or enterprise-audited replacement package recommended to reduce foreign dependency risk.
_Avoid_: Alternative library, substitute package

### Compliance & AI Intelligence

**Compliance Clause Mapping**:
The structured legal correlation between observed data telemetry and specific statutory articles under India's DPDP Act 2023.
_Avoid_: Legal check, law rule, compliance tag

**Sovereignty Copilot**:
An interactive, context-grounded reasoning assistant that answers ad-hoc regulatory and remediation inquiries for a given audit session.
_Avoid_: AI bot, chatbot, helper widget

**Telemetry Synthesis**:
The structured AI evaluation pipeline that transforms raw network flow events into plain-English risk assessments and remediation directives.
_Avoid_: Summary generator, report writer

### Presentation & Visualization

**Geospatial Data Flow Map**:
An interactive projection displaying physical trajectory vectors connecting the Indian origin point to international destination host coordinates.
_Avoid_: World map, location pinboard, traffic chart

**Pre-Warmed Showcase**:
Verified, pre-audited reference datasets for prominent domestic digital services enabling deterministic, zero-latency demonstration.
_Avoid_: Demo presets, fake data, mock examples

**Sovereignty Gauge**:
A primary visual dial indicator displaying the normalized 0–100 national digital sovereignty score and risk tier categorization.
_Avoid_: Progress meter, safety circle, score bar
