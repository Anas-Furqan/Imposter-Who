import { z } from "zod";
import { supabase } from "../utils/supabase";
import { AuthRequest } from "../middleware/auth";

const saveSchema = z.object({
  mode: z.string(),
  packName: z.string(),
  wasImpostor: z.boolean(),
  won: z.boolean(),
  playerCount: z.number().min(1),
});

const calculateXp = (won: boolean, wasImpostor: boolean) => {
  if (won && wasImpostor) return 75;
  if (won) return 50;
  return 10;
};

export const saveGame = async (req: AuthRequest, res: any) => {
  try {
    const payload = saveSchema.parse(req.body);
    const xpEarned = calculateXp(payload.won, payload.wasImpostor);

    const { data: user, error } = await supabase
      .from("users")
      .select("xp, games_played, games_won")
      .eq("id", req.userId)
      .maybeSingle();

    if (error || !user) {
      return res.status(404).json({ message: "User not found" });
    }

    await supabase.from("game_histories").insert({
      user_id: req.userId,
      mode: payload.mode,
      pack_name: payload.packName,
      was_impostor: payload.wasImpostor,
      won: payload.won,
      player_count: payload.playerCount,
      xp_earned: xpEarned,
    });

    await supabase
      .from("users")
      .update({
        xp: user.xp + xpEarned,
        games_played: user.games_played + 1,
        games_won: user.games_won + (payload.won ? 1 : 0),
      })
      .eq("id", req.userId);

    return res.json({ xpEarned });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || "Invalid request" });
  }
};
