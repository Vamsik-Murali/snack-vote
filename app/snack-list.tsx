"use client";

import { useEffect, useState } from "react";
import type { Snack } from "@/lib/votes";

export default function SnackList() {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votingId, setVotingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/snacks")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: Snack[]) => setSnacks(data))
      .catch(() => setError("Couldn't load snacks."))
      .finally(() => setLoading(false));
  }, []);

  async function handleVote(id: string) {
    setVotingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/snacks/${id}/vote`, { method: "POST" });
      if (!res.ok) throw new Error();
      const updated: Snack = await res.json();
      setSnacks((current) =>
        current.map((snack) => (snack.id === id ? updated : snack)),
      );
    } catch {
      setError("Vote failed, try again.");
    } finally {
      setVotingId(null);
    }
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading && <p className="text-zinc-500">Loading snacks…</p>}
      {snacks.map((snack) => (
        <div
          key={snack.id}
          className="flex items-center gap-4 rounded-xl border border-black/10 p-4 dark:border-white/15"
        >
          <span className="text-3xl">{snack.emoji}</span>
          <span className="flex-1 text-lg font-medium">{snack.name}</span>
          <span className="w-16 text-right tabular-nums text-zinc-600 dark:text-zinc-400">
            {snack.votes} {snack.votes === 1 ? "vote" : "votes"}
          </span>
          <button
            onClick={() => handleVote(snack.id)}
            disabled={votingId === snack.id}
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {votingId === snack.id ? "Voting…" : "Vote"}
          </button>
        </div>
      ))}
    </div>
  );
}
