import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ success: true, message: "The grimoire has been bound." });
}
