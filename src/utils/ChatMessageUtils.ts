import { TReaction } from "@/types";

export const getGroupedReactions = (reactions: TReaction[] = []) => {
  const grouped: Record<string, number> = {};

  reactions.forEach((reaction) => {
    grouped[reaction.value] = (grouped[reaction.value] || 0) + 1;
  });

  return Object.entries(grouped).map(([emoji, count]) => ({
    emoji,
    count,
  }));
};