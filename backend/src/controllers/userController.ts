import { supabase } from "../utils/supabase";
import { AuthRequest } from "../middleware/auth";

export const getProfile = async (req: AuthRequest, res: any) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("id, username, email, avatar, xp, games_played, games_won")
    .eq("id", req.userId)
    .maybeSingle();

  if (error || !user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { data: history } = await supabase
    .from("game_histories")
    .select("mode, pack_name, won, xp_earned, created_at")
    .eq("user_id", req.userId)
    .order("created_at", { ascending: false })
    .limit(20);

  return res.json({ user, history: history || [] });
};

export const getLeaderboard = async (_req: any, res: any) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, username, avatar, xp")
    .order("xp", { ascending: false })
    .limit(20);

  if (error) {
    return res.status(500).json({ message: "Failed to load leaderboard" });
  }

  return res.json(data || []);
};
