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

export const formatTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}