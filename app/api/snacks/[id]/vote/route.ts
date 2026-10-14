import { addVote } from "@/lib/votes";

export async function POST(
  _req: Request,
  ctx: RouteContext<"/api/snacks/[id]/vote">,
) {
  const { id } = await ctx.params;
  const snack = addVote(id);
  if (!snack) {
    return Response.json({ error: "Snack not found" }, { status: 404 });
  }
  return Response.json(snack);
}
