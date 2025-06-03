// utils/todoFunc.ts
import { supabase } from "@/supabaseClient";
import { BadgeKey, getAllBadges } from "@/utils/obtainBadge";

// todo 추가
export const todoAdd = async (
  userId: string,
  title: string,
  description: string
): Promise<void> => {
  const { error } = await supabase
    .from("todo")
    .insert([{ title, description, user_id: userId }]);

  if (error) {
    console.error("todoAdd 실패:", error);
    throw error;
  }
};

// todo 수정
export const todoUpdate = async (
  todoId: number,
  title: string,
  description: string
): Promise<void> => {
  const { error } = await supabase
    .from("todo")
    .update({ title, description })
    .eq("todo_id", todoId);

  if (error) {
    console.error("todoUpdate 실패:", error);
    throw error;
  }
};

// todo 삭제
export const todoDelete = async (todoId: number): Promise<void> => {
  const { error } = await supabase.from("todo").delete().eq("todo_id", todoId);

  if (error) {
    console.error("todoDelete 실패:", error);
    throw error;
  }
};

// 뱃지 매핑
const badgeMapping: Record<BadgeKey, number> = {
  daily7: 1, // badge_id=1 -> "출석왕 I"
  daily14: 2, // badge_id=2 -> "출석왕 II"
  daily21: 3, // badge_id=3 -> "출석왕 III"
  total10: 4, // badge_id=4 -> "노련함 I"
  total20: 5, // badge_id=5 -> "노련함 II"
  total30: 6, // badge_id=6 -> "노련함 III"
};

// todo 완료
export const todoComplete = async (
  todoId: number,
  userId: string
): Promise<void> => {
  const { data: allDone, error: allDoneErr } = await supabase
    .from("todo")
    .select("todo_id, created_at")
    .eq("user_id", userId)
    .eq("is_done", true);

  if (allDoneErr) {
    console.error("todoComplete: 완료된 todo 조회 실패", allDoneErr);
    throw allDoneErr;
  }

  // 오늘 날짜 기준으로 완료된 개수 계산
  const today = new Date().toISOString().slice(0, 10);
  const doneCountToday = allDone.filter(
    (t) => t.created_at?.slice(0, 10) === today
  ).length;

  // ── 2) 이 todo를 실제로 완료 처리 (is_done = true, created_at 덮어쓰기) ────────
  const { error: completeErr } = await supabase
    .from("todo")
    .update({
      is_done: true,
      created_at: new Date().toISOString(),
    })
    .eq("todo_id", todoId);

  if (completeErr) {
    console.error("todoComplete: todo 완료 처리 실패", completeErr);
    throw completeErr;
  }

  // ── 3) 하루 최대 4개까지 경험치/레벨 업데이트 ─────────────────────────────────
  if (doneCountToday < 4) {
    const { data: ui, error: uiErr } = await supabase
      .from("user_info")
      .select("current_exp, level")
      .eq("user_id", userId)
      .single();

    if (uiErr || !ui) {
      console.error("todoComplete: user_info 조회 실패", uiErr);
      throw uiErr ?? new Error("유저 정보 로드 실패");
    }

    let { current_exp, level } = ui;
    current_exp += 5;
    if (current_exp >= 100) {
      level += 1;
      current_exp -= 100;
    }

    const { error: expErr } = await supabase
      .from("user_info")
      .update({ current_exp, level })
      .eq("user_id", userId);

    if (expErr) {
      console.error("todoComplete: 경험치/레벨 업데이트 실패", expErr);
      throw expErr;
    }
  }

  // ── 4) 뱃지 Eligibility 검사 & user_badge에 upsert ────────────────────────────
  const badgeKeys = await getAllBadges(userId);

  for (const badgeKey of badgeKeys) {
    const badgeId = badgeMapping[badgeKey];
    if (!badgeId) {
      console.warn("todoComplete: 알 수 없는 BadgeKey", badgeKey);
      continue;
    }

    const { error: badgeErr } = await supabase.from("user_badge").upsert(
      {
        user_id: userId,
        badge_id: badgeId,
        obtained_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id, badge_id",
      }
    );

    if (badgeErr) {
      console.error("completeTodo: 뱃지 upsert 실패", badgeKey, badgeErr);
      // 필요하다면 throw badgeErr;
    }
  }
};
