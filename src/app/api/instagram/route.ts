import { NextResponse } from "next/server";
import { getInstagramFeed } from "@/lib/instagram";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getInstagramFeed();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
    },
  });
}
