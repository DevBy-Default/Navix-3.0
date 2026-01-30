import type { PsychometricCategory } from './questions';

export interface ResponseItem {
  questionId: string;
  category: PsychometricCategory;
  value: number; // 1..5
}

export interface PsychometricResult {
  profileType: string;
  score: number; // 0..100
  recommendedDomains: string[];
  breakdown: Record<PsychometricCategory, number>;
}

const CATEGORY_LABEL: Record<PsychometricCategory, string> = {
  Analytical: 'Analytical Thinker',
  Creative: 'Creative Builder',
  Leadership: 'Strategic Leader',
  Social: 'Collaborative Communicator',
};

const CATEGORY_DOMAINS: Record<PsychometricCategory, string[]> = {
  Analytical: ['AI/ML', 'Data Science', 'Cybersecurity'],
  Creative: ['UI/UX', 'Product Design', 'Frontend Dev'],
  Leadership: ['Project Management', 'Product Management', 'Entrepreneurship'],
  Social: ['Developer Advocacy', 'Community', 'Customer Success'],
};

export function scoreResponses(responses: ResponseItem[]): PsychometricResult {
  const categories: PsychometricCategory[] = ['Analytical', 'Creative', 'Leadership', 'Social'];
  const sums: Record<PsychometricCategory, number> = {
    Analytical: 0,
    Creative: 0,
    Leadership: 0,
    Social: 0,
  };
  const counts: Record<PsychometricCategory, number> = {
    Analytical: 0,
    Creative: 0,
    Leadership: 0,
    Social: 0,
  };

  for (const r of responses || []) {
    if (r.value >= 1 && r.value <= 5) {
      sums[r.category] += r.value;
      counts[r.category] += 1;
    }
  }

  const breakdown = categories.reduce((acc, c) => {
    acc[c] = counts[c] ? sums[c] / counts[c] : 0;
    return acc;
  }, { Analytical: 0, Creative: 0, Leadership: 0, Social: 0 } as Record<PsychometricCategory, number>);

  let top: PsychometricCategory = 'Analytical';
  for (const c of categories) if (breakdown[c] > breakdown[top]) top = c;

  const overallScore = Math.round(
    (categories.reduce((a, c) => a + breakdown[c], 0) / categories.length) * 20
  );

  return {
    profileType: CATEGORY_LABEL[top],
    score: overallScore,
    recommendedDomains: CATEGORY_DOMAINS[top],
    breakdown,
  };
}


