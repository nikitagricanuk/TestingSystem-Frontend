import { apiClient } from "./client";

export interface TestSession {
  sid: string;
  test_id: string;
  user_id: string;
  time_start: string | null;
  time_finish: string | null;
  duration_seconds: number | null;
  time_left_seconds: number | null;
  total_questions: number | null;
  questions_answered: number | null;
  questions_remaining: number | null;
  current_question_index: number | null;
  status: string | null;
  required_count: number | null;
  required_complete: boolean | null;
  is_submitted: boolean | null;
  score: number | null;
}

export async function listMySessions(): Promise<TestSession[]> {
  const res = await apiClient.get<TestSession[]>("/tests/session/list");
  return res.data;
}

export async function startSession(testId: string): Promise<TestSession> {
  const res = await apiClient.post<TestSession>(`/tests/${testId}/start`);
  return res.data;
}
