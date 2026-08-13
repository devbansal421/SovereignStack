/**
 * SovereignStack Express API Server
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { interceptDataFlows } from './services/interceptor.js';
import { auditManifest } from './services/supplyChainAuditor.js';
import { generateCopilotResponse } from './services/copilotService.js';
import { SHOWCASE_DATA, SHOWCASE_MANIFESTS } from './data/showcaseData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'SovereignStack Audit Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Get List of Pre-Warmed Showcases
app.get('/api/showcase', (req, res) => {
  const dataFlowSites = Object.keys(SHOWCASE_DATA).map(key => ({
    key,
    name: SHOWCASE_DATA[key].siteName,
    domain: SHOWCASE_DATA[key].domain,
    category: SHOWCASE_DATA[key].category,
    score: SHOWCASE_DATA[key].sovereigntyScore,
    grade: SHOWCASE_DATA[key].grade
  }));

  const manifests = Object.keys(SHOWCASE_MANIFESTS).map(key => ({
    key,
    title: SHOWCASE_MANIFESTS[key].title,
    manifestType: SHOWCASE_MANIFESTS[key].manifestType,
    score: SHOWCASE_MANIFESTS[key].sovereigntyScore,
    grade: SHOWCASE_MANIFESTS[key].grade
  }));

  res.json({ dataFlowSites, manifests });
});

// Audit a URL (Data Flow Sovereignty)
app.post('/api/audit/url', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    console.log(`[SovereignStack] Initiating Data Flow Audit for: ${url}`);
    const auditResult = await interceptDataFlows(url);
    res.json(auditResult);
  } catch (err) {
    console.error('[SovereignStack Error]', err);
    res.status(500).json({ error: err.message || 'Audit execution failed' });
  }
});

// Audit a Manifest (Supply Chain Sovereignty)
app.post('/api/audit/manifest', (req, res) => {
  try {
    const { content, manifestType, showcaseKey } = req.body;

    if (showcaseKey && SHOWCASE_MANIFESTS[showcaseKey]) {
      return res.json(SHOWCASE_MANIFESTS[showcaseKey]);
    }

    if (!content) {
      return res.status(400).json({ error: 'Manifest content is required' });
    }

    console.log(`[SovereignStack] Auditing Supply Chain Manifest (${manifestType || 'package.json'})`);
    const auditResult = auditManifest(content, manifestType || 'package.json');
    res.json(auditResult);
  } catch (err) {
    console.error('[SovereignStack Error]', err);
    res.status(400).json({ error: err.message || 'Manifest parsing failed' });
  }
});

// Sovereignty Copilot Grounded Reasoning
app.post('/api/copilot/chat', (req, res) => {
  try {
    const { message, auditContext } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message query is required' });
    }

    const response = generateCopilotResponse(message, auditContext);
    res.json(response);
  } catch (err) {
    console.error('[SovereignStack Copilot Error]', err);
    res.status(500).json({ error: 'Copilot inference failed' });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ SovereignStack Backend running on http://localhost:${PORT}`);
});
