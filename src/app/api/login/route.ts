import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { username, password } = await req.json()
  const user = await prisma.user.findFirst({
    where: { username, password } // Real project mein password hash hona chahiye
  })
  if (user) return NextResponse.json({ success: true })
  return NextResponse.json({ error: "Invalid" }, { status: 401 })
}