export function truncate(word: string) {
  if (word.length > 16)
    return word.slice(0, 16) + "...";

  return word;
}
