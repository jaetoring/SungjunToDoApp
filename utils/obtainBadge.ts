import { supabase } from "@/supabaseClient";

export type BadgeKey =
  | "daily7"
  | "daily14"
  | "daily21"
  | "total10"
  | "total20"
  | "total30";

// 출석 뱃지 조회
export const getDailyBadges = async (userId: string): Promise<BadgeKey[]> => {
  const { data: doneTodos, error } = await supabase
    .from("todo")
    .select("created_at")
    .eq("user_id", userId)
    .eq("is_done", true);

  if (error) {
    console.error("getDailyBadges: todo 조회 실패", error);
    return [];
  }
  if (!doneTodos) return [];

  const dates = new Set<string>();
  doneTodos.forEach((row) => {
    if (!row.created_at) return;
    const dateStr = row.created_at.slice(0, 10);
    dates.add(dateStr);
  });

  const dailyCount = dates.size;
  const badges: BadgeKey[] = [];
  if (dailyCount >= 7) badges.push("daily7");
  if (dailyCount >= 14) badges.push("daily14");
  if (dailyCount >= 21) badges.push("daily21");
  return badges;
};

// todo 완료 뱃지 조회
export const getTotalTodoBadges = async (
  userId: string
): Promise<BadgeKey[]> => {
  const { count, error } = await supabase
    .from("todo")
    .select("todo_id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_done", true);

  if (error) {
    console.error("getTotalTodoBadges: todo 카운트 실패", error);
    return [];
  }
  const totalDoneCount = count ?? 0;

  const badges: BadgeKey[] = [];
  if (totalDoneCount >= 10) badges.push("total10");
  if (totalDoneCount >= 20) badges.push("total20");
  if (totalDoneCount >= 30) badges.push("total30");
  return badges;
};

// 모든 뱃지 조회
export const getAllBadges = async (userId: string): Promise<BadgeKey[]> => {
  const [dailyBadges, totalBadges] = await Promise.all([
    getDailyBadges(userId),
    getTotalTodoBadges(userId),
  ]);
  return [...dailyBadges, ...totalBadges];
};
