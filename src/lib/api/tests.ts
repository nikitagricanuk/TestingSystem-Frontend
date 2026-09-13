import { apiClient } from "./client";

export interface Test {
  id: string;
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

export async function listTests(): Promise<Test[]> {
  const res = await apiClient.get<Test[]>("/tests", { params: { limit: 1000 } });
  return res.data;
}

export async function getTest(testId: string): Promise<Test> {
  const res = await apiClient.get<Test>(`/tests/${testId}`);
  return res.data;
}
