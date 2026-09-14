import { apiClient } from "./client";

export interface QuestionAnalysis {
  question_id: string;
  category: string;
  question_type: string;
  attempts: number;
  difficulty: number;
  discrimination: number;
  guess_score: number;
  effective_discrimination: number;
  std_dev: number;
  intended_weight: number;
  effective_weight: number;
}

export interface TestAnalysis {
  test_id: string;
  avg_discrimination: number;
  avg_difficulty: number;
  avg_attempts: number;
  avg_effective_weight: number;
  questions: QuestionAnalysis[];
}

export async function fetchTestAnalysis(testId: string): Promise<TestAnalysis> {
  const res = await apiClient.get<TestAnalysis>(`/tests/${testId}/analysis`);
  return res.data;
}
