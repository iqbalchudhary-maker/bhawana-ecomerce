import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { items } = await req.json()

  for (const item of items) {
    await prisma.product.update({
      where: { id: item.id },
      data: { stock: { decrement: 1 } } // Aik item kam kar dega
    })
  }
  
  return NextResponse.json({ success: true })
}