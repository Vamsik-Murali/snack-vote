export type Snack = {
  id: string;
  name: string;
  emoji: string;
  votes: number;
};

const SNACKS: Omit<Snack, "votes">[] = [
  { id: "1", name: "Pretzels", emoji: "🥨" },
  { id: "2", name: "Cookies", emoji: "🍪" },
  { id: "3", name: "Popcorn", emoji: "🍿" },
  { id: "4", name: "Candy", emoji: "🍬" },
  { id: "5", name: "Apples", emoji: "🍎" },
];

// Stored on globalThis so dev hot-reload doesn't reset the counts.
const store = globalThis as unknown as { snackVotes?: Record<string, number> };
const votes = (store.snackVotes ??= {});

export function getSnacks(): Snack[] {
  return SNACKS.map((snack) => ({ ...snack, votes: votes[snack.id] ?? 0 }));
}

export function addVote(id: string): Snack | null {
  const snack = SNACKS.find((s) => s.id === id);
  if (!snack) return null;
  votes[id] = (votes[id] ?? 0) + 1;
  return { ...snack, votes: votes[id] };
}
