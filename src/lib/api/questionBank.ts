import { apiClient } from "./client";

export interface Category {
  id: string;
  name: string;
  parent_id: string | null;
}

export type QuestionType = "single" | "multiple" | "text";

export interface QuestionAnswer {
  choices?: string[];
  correct?: number[];
  correct_text?: string;
}

export interface QuestionOut {
  id: string;
  text: string;
  answer: QuestionAnswer;
  category_id: string | null;
  teacher_id: string;
  question_type: QuestionType;
  problem: string;
  mark_out_of: number;
  penalty: number;
  is_active: boolean;
}

export async function listCategories(): Promise<Category[]> {
  const res = await apiClient.get<Category[]>("/categories", { params: { limit: 1000 } });
  return res.data;
}

export async function createCategory(name: string, parentId?: string | null): Promise<Category> {
  const res = await apiClient.post<Category>("/categories", { name, parent_id: parentId ?? null });
  return res.data;
}

export async function deleteCategory(categoryId: string): Promise<void> {
  await apiClient.delete(`/categories/${categoryId}`);
}

export async function listQuestions(params?: {
  category_id?: string;
  include_descendants?: boolean;
}): Promise<QuestionOut[]> {
  const res = await apiClient.get<QuestionOut[]>("/questions", { params: { limit: 1000, ...params } });
  return res.data;
}

export async function getQuestion(questionId: string): Promise<QuestionOut> {
  const res = await apiClient.get<QuestionOut>(`/questions/${questionId}`);
  return res.data;
}

export interface QuestionCreatePayload {
  text: string;
  answer: QuestionAnswer;
  question_type: QuestionType;
  problem: string;
  mark_out_of: number;
  penalty: number;
  is_active?: boolean;
  category_id?: string | null;
  category_path?: string[];
}

export async function createQuestion(payload: QuestionCreatePayload): Promise<QuestionOut> {
  const res = await apiClient.post<QuestionOut>("/questions", payload);
  return res.data;
}

export async function updateQuestion(
  questionId: string,
  payload: Partial<QuestionCreatePayload>,
): Promise<QuestionOut> {
  const res = await apiClient.patch<QuestionOut>(`/questions/${questionId}`, payload);
  return res.data;
}

export async function deleteQuestion(questionId: string): Promise<void> {
  await apiClient.delete(`/questions/${questionId}`);
}
