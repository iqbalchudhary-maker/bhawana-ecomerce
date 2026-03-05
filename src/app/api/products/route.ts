// src/app/api/products/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, price, stock, image } = body

    // Database mein entry
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: parseFloat(price),
        stock: parseInt(stock),
        image: image,
      }
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Request Error", error)
    return NextResponse.json({ error: "Error adding product" }, { status: 500 })
  }
}

export async function GET() {
  const products = await prisma.product.findMany()
  return NextResponse.json(products)
}