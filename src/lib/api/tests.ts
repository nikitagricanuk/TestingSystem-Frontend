import { apiClient } from "./client";
import type { QuestionOut } from "./questionBank";

export interface Test {
  id: string;
  owner_id: string | null;
  name: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  number_of_required_questions: number | null;
  shuffle: boolean;
  navigation_method: string;
  can_be_reviewed: boolean | null;
  welcome_message: string | null;
  total_questions: number;
  created_at: string | null;
}

export interface TestQuestionRule {
  id: string;
  test_id: string;
  category_id: string;
  is_mandatory: boolean;
  fixed_position: number | null;
}

export async function listTests(params?: { mine?: boolean }): Promise<Test[]> {
  const res = await apiClient.get<Test[]>("/tests", { params: { limit: 1000, ...params } });
  return res.data;
}

export async function getTest(testId: string): Promise<Test> {
  const res = await apiClient.get<Test>(`/tests/${testId}`);
  return res.data;
}

export interface TestCreatePayload {
  name: string;
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  number_of_required_questions?: number | null;
  shuffle?: boolean;
  navigation_method?: string;
  can_be_reviewed?: boolean | null;
  welcome_message?: string | null;
  question_ids?: string[];
}

export async function createTest(payload: TestCreatePayload): Promise<Test> {
  const res = await apiClient.post<Test>("/tests/create", payload);
  return res.data;
}

export async function updateTest(testId: string, payload: Partial<TestCreatePayload>): Promise<Test> {
  const res = await apiClient.patch<Test>(`/tests/${testId}`, payload);
  return res.data;
}

export async function deleteTest(testId: string): Promise<void> {
  await apiClient.delete(`/tests/${testId}`);
}

export async function listTestQuestions(testId: string): Promise<QuestionOut[]> {
  const res = await apiClient.get<QuestionOut[]>(`/tests/${testId}/question/list`);
  return res.data;
}

export async function removeTestQuestion(testId: string, questionId: string): Promise<void> {
  await apiClient.delete(`/tests/${testId}/question/${questionId}`);
}

export async function listTestRules(testId: string): Promise<TestQuestionRule[]> {
  const res = await apiClient.get<TestQuestionRule[]>(`/tests/${testId}/rules`);
  return res.data;
}

export async function createTestRule(
  testId: string,
  payload: { category_id: string; is_mandatory: boolean; fixed_position?: number | null },
): Promise<TestQuestionRule> {
  const res = await apiClient.post<TestQuestionRule>(`/tests/${testId}/rules`, payload);
  return res.data;
}

export async function deleteTestRule(testId: string, ruleId: string): Promise<void> {
  await apiClient.delete(`/tests/${testId}/rules/${ruleId}`);
}

export async function uploadTestQuestions(
  testId: string,
  file: File,
  mode: "append" | "overwrite",
): Promise<QuestionOut[]> {
  const form = new FormData();
  form.append("file", file);
  const res = await apiClient.put<QuestionOut[]>(`/tests/${testId}/question/upload`, form, {
    params: { mode },
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}
