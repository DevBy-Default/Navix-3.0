import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const dbDir = path.join(__dirname, 'db');
const resultsFile = path.join(dbDir, 'psychometric_results.json');

function ensureDb() {
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
  if (!fs.existsSync(resultsFile)) fs.writeFileSync(resultsFile, JSON.stringify([]), 'utf-8');
}

function readResults() {
  ensureDb();
  try {
    const raw = fs.readFileSync(resultsFile, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeResults(data) {
  ensureDb();
  fs.writeFileSync(resultsFile, JSON.stringify(data, null, 2), 'utf-8');
}

// Basic scoring util (mirrors frontend logic later)
function scoreResponses(responses) {
  // responses: [{ questionId, category, value: 1..5 }]
  const categories = ['Analytical', 'Creative', 'Leadership', 'Social'];
  const sums = Object.fromEntries(categories.map((c) => [c, 0]));
  const counts = Object.fromEntries(categories.map((c) => [c, 0]));
  for (const r of responses || []) {
    if (sums[r.category] !== undefined) {
      sums[r.category] += Number(r.value || 0);
      counts[r.category] += 1;
    }
  }
  const avgs = Object.fromEntries(
    categories.map((c) => [c, counts[c] ? sums[c] / counts[c] : 0])
  );
  let topCat = categories[0];
  for (const c of categories) if (avgs[c] > avgs[topCat]) topCat = c;

  const profileMap = {
    Analytical: 'Analytical Thinker',
    Creative: 'Creative Builder',
    Leadership: 'Strategic Leader',
    Social: 'Collaborative Communicator',
  };
  const domainMap = {
    Analytical: ['AI/ML', 'Data Science', 'Cybersecurity'],
    Creative: ['UI/UX', 'Product Design', 'Frontend Dev'],
    Leadership: ['Project Management', 'Product Management', 'Entrepreneurship'],
    Social: ['Developer Advocacy', 'Community', 'Customer Success'],
  };

  const overallScore = Math.round(
    (Object.values(avgs).reduce((a, b) => a + b, 0) / categories.length) * 20
  ); // scale to 100

  return {
    profileType: profileMap[topCat] || topCat,
    score: overallScore,
    recommendedDomains: domainMap[topCat] || [],
    breakdown: avgs,
  };
}

// Submit responses
app.post('/api/psychometric/submit', (req, res) => {
  const { userId, responses } = req.body || {};
  if (!userId || !Array.isArray(responses)) {
    return res.status(400).json({ error: 'userId and responses are required' });
  }
  const result = scoreResponses(responses);
  const all = readResults();
  const record = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    userId,
    responses,
    score: result.score,
    profileType: result.profileType,
    recommendedDomains: result.recommendedDomains,
    breakdown: result.breakdown,
    createdAt: new Date().toISOString(),
  };
  all.push(record);
  writeResults(all);
  return res.json({
    profileType: result.profileType,
    score: result.score,
    recommendedDomains: result.recommendedDomains,
    breakdown: result.breakdown,
  });
});

// Latest result for a user
app.get('/api/psychometric/latest', (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId is required' });
  const all = readResults().filter((r) => r.userId === String(userId));
  if (all.length === 0) return res.json({ hasResult: false });
  const latest = all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  return res.json({
    hasResult: true,
    profileType: latest.profileType,
    score: latest.score,
    recommendedDomains: latest.recommendedDomains,
    createdAt: latest.createdAt,
  });
});

app.listen(PORT, () => {
  console.log(`Psychometric API running on http://localhost:${PORT}`);
});


