import type { ResponseItem, PsychometricResult } from './scoring';

export async function submitPsychometric(
  userId: string,
  responses: ResponseItem[],
): Promise<PsychometricResult> {
  const res = await fetch('/api/psychometric/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, responses }),
  });
  if (!res.ok) throw new Error('Failed to submit psychometric test');
  return res.json();
}

export async function getLatestPsychometric(userId: string): Promise<
  | { hasResult: false }
  | ({ hasResult: true } & Pick<PsychometricResult, 'profileType' | 'score' | 'recommendedDomains'> & { createdAt: string })
> {
  const url = new URL('/api/psychometric/latest', window.location.origin);
  url.searchParams.set('userId', userId);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch latest result');
  return res.json();
}


