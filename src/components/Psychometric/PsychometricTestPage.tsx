import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PSYCHOMETRIC_QUESTIONS } from '../../modules/psychometric/questions';
import type { PsychometricCategory } from '../../modules/psychometric/questions';
import type { ResponseItem } from '../../modules/psychometric/scoring';
import { submitPsychometric } from '../../modules/psychometric/api';
import { useAuth } from '../../hooks/useAuth';

const scaleOptions = [
  { label: 'Strongly Disagree', value: 1 },
  { label: 'Disagree', value: 2 },
  { label: 'Neutral', value: 3 },
  { label: 'Agree', value: 4 },
  { label: 'Strongly Agree', value: 5 },
];

const PAGE_SIZE = 5;

const PsychometricTestPage: React.FC = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | {
    profileType: string;
    score: number;
    recommendedDomains: string[];
    breakdown: Record<PsychometricCategory, number>;
  }>(null);

  const totalPages = Math.ceil(PSYCHOMETRIC_QUESTIONS.length / PAGE_SIZE);
  const pageQuestions = useMemo(() => {
    const start = page * PAGE_SIZE;
    return PSYCHOMETRIC_QUESTIONS.slice(start, start + PAGE_SIZE);
  }, [page]);

  function setAnswer(qid: string, value: number) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function toResponses(): ResponseItem[] {
    return PSYCHOMETRIC_QUESTIONS.map((q) => ({
      questionId: q.id,
      category: q.category as PsychometricCategory,
      value: Number(answers[q.id] || 0),
    }));
  }

  async function onSubmit() {
    if (!user?.id) return;
    setSubmitting(true);
    try {
      const resp = await submitPsychometric(user.id, toResponses());
      setResult({
        profileType: resp.profileType,
        score: resp.score,
        recommendedDomains: resp.recommendedDomains,
        breakdown: resp.breakdown,
      });
    } catch (e) {
      // noop minimal
    } finally {
      setSubmitting(false);
    }
  }

  if (!user) return null;

  if (result) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <motion.h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Psychometric Result</motion.h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-2"><span className="font-semibold">Profile:</span> {result.profileType}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4"><span className="font-semibold">Overall Score:</span> {result.score}</p>
          <div>
            <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">Suggested Domains</p>
            <div className="flex flex-wrap gap-2">
              {result.recommendedDomains.map((d) => (
                <span key={d} className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 dark:text-blue-300 border border-blue-600/20 text-sm">{d}</span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-700 dark:text-gray-300 font-semibold mb-4">Category Breakdown</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Object.entries(result.breakdown).map(([category, score]) => ({ category, score }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((page + 1) / totalPages) * 100;
  const isPageComplete = pageQuestions.every(q => answers[q.id] !== undefined);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <motion.h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Psychometric Test</motion.h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Answer honestly using the scale below. This helps personalize your learning and career recommendations.</p>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Progress</span>
          <span>{page + 1} of {totalPages}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {pageQuestions.map((q) => (
          <div key={q.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700">
            <p className="text-gray-900 dark:text-white mb-3">{q.text}</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {scaleOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`px-3 py-2 rounded-md border text-sm transition ${
                    answers[q.id] === opt.value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setAnswer(q.id, opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8">
        <button
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </button>

        {page < totalPages - 1 ? (
          <button
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={!isPageComplete}
          >
            Next
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSubmit}
            disabled={submitting || !isPageComplete}
          >
            {submitting ? 'Submitting...' : 'Submit Test'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PsychometricTestPage;


