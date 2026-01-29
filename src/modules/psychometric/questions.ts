export type PsychometricCategory = 'Analytical' | 'Creative' | 'Leadership' | 'Social';

export interface PsychometricQuestion {
  id: string;
  text: string;
  category: PsychometricCategory;
}

export const PSYCHOMETRIC_QUESTIONS: PsychometricQuestion[] = [
  // Analytical (10 questions)
  { id: 'q1', text: 'I enjoy solving complex logical problems.', category: 'Analytical' },
  { id: 'q2', text: 'I like working with data and identifying patterns.', category: 'Analytical' },
  { id: 'q3', text: 'I enjoy breaking down problems into smaller, manageable steps.', category: 'Analytical' },
  { id: 'q4', text: 'I am detail-oriented and systematic in my approach.', category: 'Analytical' },
  { id: 'q5', text: 'I enjoy analyzing metrics to improve outcomes.', category: 'Analytical' },
  { id: 'q6', text: 'I like optimizing processes for efficiency.', category: 'Analytical' },
  { id: 'q7', text: 'I prefer working with facts and evidence over intuition.', category: 'Analytical' },
  { id: 'q8', text: 'I excel at troubleshooting technical issues.', category: 'Analytical' },
  { id: 'q9', text: 'I enjoy learning about algorithms and computational thinking.', category: 'Analytical' },
  { id: 'q10', text: 'I find satisfaction in creating structured systems and frameworks.', category: 'Analytical' },

  // Creative (10 questions)
  { id: 'q11', text: 'I often come up with novel ideas or approaches.', category: 'Creative' },
  { id: 'q12', text: 'I prefer tasks that involve artistic or visual expression.', category: 'Creative' },
  { id: 'q13', text: 'I experiment with different ways to do things.', category: 'Creative' },
  { id: 'q14', text: 'I like to design or craft new experiences.', category: 'Creative' },
  { id: 'q15', text: 'I appreciate aesthetics and visual harmony.', category: 'Creative' },
  { id: 'q16', text: 'I brainstorm frequently and iterate on concepts.', category: 'Creative' },
  { id: 'q17', text: 'I enjoy exploring unconventional solutions.', category: 'Creative' },
  { id: 'q18', text: 'I find inspiration in art, music, or design.', category: 'Creative' },
  { id: 'q19', text: 'I like prototyping and testing new ideas.', category: 'Creative' },
  { id: 'q20', text: 'I thrive when given creative freedom in my work.', category: 'Creative' },

  // Leadership (10 questions)
  { id: 'q21', text: 'I feel comfortable making decisions for a group.', category: 'Leadership' },
  { id: 'q22', text: 'I naturally coordinate tasks among team members.', category: 'Leadership' },
  { id: 'q23', text: 'I take initiative when objectives are unclear.', category: 'Leadership' },
  { id: 'q24', text: 'I motivate others to work toward a common goal.', category: 'Leadership' },
  { id: 'q25', text: 'I delegate tasks effectively based on strengths.', category: 'Leadership' },
  { id: 'q26', text: 'I provide direction during uncertain situations.', category: 'Leadership' },
  { id: 'q27', text: 'I enjoy mentoring and developing others.', category: 'Leadership' },
  { id: 'q28', text: 'I take responsibility for team outcomes.', category: 'Leadership' },
  { id: 'q29', text: 'I communicate vision and strategy effectively.', category: 'Leadership' },
  { id: 'q30', text: 'I handle conflicts and difficult decisions well.', category: 'Leadership' },

  // Social (10 questions)
  { id: 'q31', text: 'I gain energy from interacting with people.', category: 'Social' },
  { id: 'q32', text: 'I communicate ideas clearly and persuasively.', category: 'Social' },
  { id: 'q33', text: 'I empathize easily and build rapport quickly.', category: 'Social' },
  { id: 'q34', text: 'I thrive in collaborative environments.', category: 'Social' },
  { id: 'q35', text: 'I build and maintain strong professional networks.', category: 'Social' },
  { id: 'q36', text: 'I collaborate well across different teams.', category: 'Social' },
  { id: 'q37', text: 'I enjoy teaching or explaining concepts to others.', category: 'Social' },
  { id: 'q38', text: 'I adapt my communication style to different audiences.', category: 'Social' },
  { id: 'q39', text: 'I find fulfillment in helping others succeed.', category: 'Social' },
  { id: 'q40', text: 'I excel at building consensus in group settings.', category: 'Social' },
];


