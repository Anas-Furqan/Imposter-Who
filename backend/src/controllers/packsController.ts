import { z } from "zod";
import { supabase } from "../utils/supabase";
import { AuthRequest } from "../middleware/auth";

const createSchema = z.object({
  name: z.string().min(1),
  emoji: z.string().optional(),
  words: z.array(z.string().min(1)).min(10).max(200),
  isPublic: z.boolean().default(false),
});

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  emoji: z.string().optional(),
  words: z.array(z.string().min(1)).min(10).max(200).optional(),
  isPublic: z.boolean().optional(),
});

export const getPacks = async (_req: any, res: any) => {
  const { data, error } = await supabase
    .from("word_packs")
    .select("id, name, emoji, category, words")
    .eq("is_active", true);

  if (error) {
    return res.status(500).json({ message: "Failed to load packs" });
  }

  const packs = (data || []).map((pack: any) => ({
    id: pack.id,
    name: pack.name,
    emoji: pack.emoji,
    category: pack.category,
    wordCount: Array.isArray(pack.words) ? pack.words.length : 0,
  }));

  return res.json(packs);
};

export const getPackWords = async (req: AuthRequest, res: any) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("word_packs")
    .select("words")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return res.status(404).json({ message: "Pack not found" });
  }

  return res.json({ words: data.words || [] });
};

export const getCustomPacks = async (req: AuthRequest, res: any) => {
  const userId = req.userId;

  const { data, error } = await supabase
    .from("custom_word_packs")
    .select("*")
    .or(`user_id.eq.${userId},is_public.eq.true`)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ message: "Failed to load packs" });
  }

  return res.json(data || []);
};

export const createCustomPack = async (req: AuthRequest, res: any) => {
  try {
    const payload = createSchema.parse(req.body);

    const { error } = await supabase.from("custom_word_packs").insert({
      name: payload.name,
      emoji: payload.emoji || "🎮",
      words: payload.words,
      is_public: payload.isPublic,
      user_id: req.userId,
    });

    if (error) throw error;

    return res.status(201).json({ message: "Pack created" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || "Invalid request" });
  }
};

export const updateCustomPack = async (req: AuthRequest, res: any) => {
  try {
    const payload = updateSchema.parse(req.body);
    const { id } = req.params;

    const { data, error } = await supabase
      .from("custom_word_packs")
      .select("user_id")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return res.status(404).json({ message: "Pack not found" });
    }

    if (data.user_id !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { error: updateError } = await supabase
      .from("custom_word_packs")
      .update({
        name: payload.name,
        emoji: payload.emoji,
        words: payload.words,
        is_public: payload.isPublic,
      })
      .eq("id", id);

    if (updateError) throw updateError;

    return res.json({ message: "Pack updated" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || "Invalid request" });
  }
};

export const deleteCustomPack = async (req: AuthRequest, res: any) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("custom_word_packs")
    .select("user_id")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return res.status(404).json({ message: "Pack not found" });
  }

  if (data.user_id !== req.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await supabase.from("custom_word_packs").delete().eq("id", id);
  return res.json({ message: "Pack deleted" });
};
