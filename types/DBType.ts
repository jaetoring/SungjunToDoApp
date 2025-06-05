import { ImageSourcePropType } from "react-native";

export interface UserTableType {
  email: string;
  password: string;
  name: string;
  profile_img: ImageSourcePropType;
  created_at: Date;
  updated_at: Date;
}

export interface UserInfoTableType {
  current_exp: number;
  level: number;
  state_msg: string;
}

export interface TodoTableType {
  todo_id: number;
  title: string;
  description: string;
  created_at: Date | null;
  is_done: boolean;
}

export interface BadgeTableType {
  badge_id: number;
  name: string;
  obtain_guide: string;
  icon_url: ImageSourcePropType;
}

export interface UserBadgeTableType {
  user_id: number;
  badge_id: number;
  obtained_at: Date;
}