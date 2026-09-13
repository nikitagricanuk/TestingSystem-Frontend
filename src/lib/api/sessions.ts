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
  answers: Record<string, string> | null;
}

export interface SessionQuestion {
  index: number;
  question_id: string;
  question: string;
  question_type: "single" | "multiple" | "text" | null;
  choices: string[];
  status: "answered" | "unanswered";
}

export async function listMySessions(): Promise<TestSession[]> {
  const res = await apiClient.get<TestSession[]>("/tests/session/list");
  return res.data;
}

export async function getSession(sid: string): Promise<TestSession> {
  const res = await apiClient.get<TestSession>(`/tests/session/${sid}`);
  return res.data;
}

export async function startSession(testId: string): Promise<TestSession> {
  const res = await apiClient.post<TestSession>(`/tests/${testId}/start`);
  return res.data;
}

export async function listSessionQuestions(sid: string): Promise<SessionQuestion[]> {
  const res = await apiClient.get<SessionQuestion[]>(`/tests/session/${sid}/question/list`);
  return res.data;
}

export async function goToQuestion(sid: string, questionId: string): Promise<SessionQuestion> {
  const res = await apiClient.get<SessionQuestion>(`/tests/session/${sid}/question/${questionId}`);
  return res.data;
}

export async function goToNextQuestion(sid: string): Promise<SessionQuestion> {
  const res = await apiClient.get<SessionQuestion>(`/tests/session/${sid}/question/next`);
  return res.data;
}

export async function goToPrevQuestion(sid: string): Promise<SessionQuestion> {
  const res = await apiClient.get<SessionQuestion>(`/tests/session/${sid}/question/prev`);
  return res.data;
}

export async function answerQuestion(sid: string, questionId: string, answer: string): Promise<TestSession> {
  const res = await apiClient.post<TestSession>(`/tests/session/${sid}/question/${questionId}/answer`, { answer });
  return res.data;
}

export async function submitSession(sid: string): Promise<TestSession> {
  const res = await apiClient.post<TestSession>(`/tests/session/${sid}/submit`);
  return res.data;
}
