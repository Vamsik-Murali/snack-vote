import { connection } from "next/server";
import { getSnacks } from "@/lib/votes";

export async function GET() {
  // Run on every request; otherwise the build would freeze the counts at 0.
  await connection();
  return Response.json(getSnacks());
}
