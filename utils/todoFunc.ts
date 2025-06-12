// utils/todoFunc.ts
import { supabase } from "@/supabaseClient";
import { TodoTableType } from "@/types/DBType";
import { BadgeKey, getAllBadges } from "@/utils/obtainBadge";
import { Alert } from "react-native";

// todo 추가
export const todoAdd = async (
  title: string,
  description: string,
  onSuccess: () => void
): Promise<void> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;
    if (!userId) {
      throw new Error("로그인 필요");
    }

    const { error } = await supabase
      .from("todo")
      .insert([{ title, description, user_id: userId }]);
    if (error) {
      console.error("todoAdd 실패:", error);
      throw error;
    }

    onSuccess();
  } catch (err: unknown) {
    console.error("추가 중 에러:", err);
    const message = err instanceof Error ? err.message : String(err);
    Alert.alert("추가 실패", message);
  }
};

// todo 수정
export const todoUpdate = async (
  todo: TodoTableType | null,
  title: string,
  description: string,
  onSuccess: () => void
): Promise<void> => {
  if (!todo) {
    Alert.alert("오류", "수정할 TODO가 없습니다.");
    return;
  }

  try {
    const { error } = await supabase
      .from("todo")
      .update({ title, description })
      .eq("todo_id", todo.todo_id);

    if (error) {
      console.error("todoUpdate 실패:", error);
      throw error;
    }

    onSuccess();
  } catch (err: unknown) {
    console.error("수정 중 에러:", err);
    const message = err instanceof Error ? err.message : String(err);
    Alert.alert("수정 실패", message);
  }
};

// todo 삭제
export const todoDelete = async (
  todo: TodoTableType | null,
  onSuccess: () => void
): Promise<void> => {
  if (!todo) {
    Alert.alert("오류", "삭제할 TODO가 없습니다.");
    return;
  }

  try {
    const { error } = await supabase
      .from("todo")
      .delete()
      .eq("todo_id", todo.todo_id);

    if (error) {
      console.error("todoDelete 실패:", error);
      throw error;
    }

    onSuccess();
  } catch (err: unknown) {
    console.error("삭제 중 에러:", err);
    const message = err instanceof Error ? err.message : String(err);
    Alert.alert("삭제 실패", message);
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
  todo: TodoTableType | null,
  onSuccess: () => void
): Promise<void> => {
  if (!todo) {
    Alert.alert("오류", "완료할 TODO 정보가 없습니다.");
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;
    if (!userId) {
      throw new Error("로그인 필요");
    }

    const { data: allDone, error: allDoneErr } = await supabase
      .from("todo")
      .select("todo_id, created_at")
      .eq("user_id", userId)
      .eq("is_done", true);
    if (allDoneErr) {
      console.error("todoComplete: 완료된 todo 조회 실패", allDoneErr);
      throw allDoneErr;
    }
    const today = new Date().toISOString().slice(0, 10);
    const doneCountToday = allDone.filter(
      (t) => t.created_at?.slice(0, 10) === today
    ).length;

    const { error: completeErr } = await supabase
      .from("todo")
      .update({
        is_done: true,
        created_at: new Date().toISOString(),
      })
      .eq("todo_id", todo.todo_id);
    if (completeErr) {
      console.error("todoComplete: todo 완료 처리 실패", completeErr);
      throw completeErr;
    }

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

    const badgeKeys = await getAllBadges(userId);
    for (const key of badgeKeys) {
      const badgeId = badgeMapping[key];
      if (!badgeId) {
        console.warn("todoComplete: 알 수 없는 BadgeKey", key);
        continue;
      }
      const { error: badgeErr } = await supabase.from("user_badge").upsert(
        {
          user_id: userId,
          badge_id: badgeId,
          obtained_at: new Date().toISOString(),
        },
        { onConflict: "user_id, badge_id" }
      );
      if (badgeErr) {
        console.error("todoComplete: 뱃지 upsert 실패", key, badgeErr);
      }
    }

    onSuccess();
  } catch (err: unknown) {
    console.error("완료 처리 중 에러:", err);
    const message = err instanceof Error ? err.message : String(err);
    Alert.alert("완료 실패", message);
  }
};
