import { useQuery, UseQueryResult } from "react-query";

export type EmojiKey = string & { EmojiKey: never };

export type GitHubEmojiResponse = Record<EmojiKey, string>;

export function useGitHubEmojis(): UseQueryResult<GitHubEmojiResponse> {
  return useQuery("useGitHubEmojis", () =>
    window
      .fetch("https://api.github.com/emojis")
      .then((response) => response.json())
  );
}
