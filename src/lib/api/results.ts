import { apiClient } from "./client";

export type RatingScope = "global" | "region" | "city" | "school";
export type RatingPeriod = "all" | "week" | "month" | "year";

export interface GroupScore {
  group: string;
  score: number;
  total: number;
}

export interface LeaderboardEntry {
  rank: number;
  nickname: string;
  school: string | null;
  score: number;
  error_rate: number;
  completed_at: string | null;
  test_id: string;
  group_scores: GroupScore[];
}

export interface Result {
  id: string;
  score: number | null;
  certificate_available: boolean;
  certificate_link: string | null;
  recommendations: string[];
  test_id: string;
  user_id: string;
  status: string;
  time_start: string | null;
  time_finish: string | null;
  duration_seconds: number | null;
  rank: number | null;
  total_questions: number;
  correct_answers: number;
  group_scores: GroupScore[];
}

export interface SessionReviewQuestion {
  index: number;
  prompt: string | null;
  choices: string[];
  correct_answer: string | null;
  student_answer: string | null;
  is_correct: boolean;
  time_spent_seconds: number;
}

export interface SessionReview {
  sid: string;
  test_id: string;
  user_id: string;
  score: number | null;
  questions: SessionReviewQuestion[];
}

export async function fetchLeaderboard(params: {
  scope?: RatingScope;
  period?: RatingPeriod;
  test_id?: string;
}): Promise<LeaderboardEntry[]> {
  const res = await apiClient.get<LeaderboardEntry[]>("/tests/leaderboard", { params });
  return res.data;
}

export async function fetchResult(resultId: string): Promise<Result> {
  const res = await apiClient.get<Result>(`/tests/result/${resultId}`);
  return res.data;
}

export async function fetchSessionReview(sid: string): Promise<SessionReview> {
  const res = await apiClient.get<SessionReview>(`/tests/session/${sid}/review`);
  return res.data;
}
