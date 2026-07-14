import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const messages = await prisma.message.findMany()
  return NextResponse.json(messages)
}

export async function POST(request: Request) {
  const { message } = await request.json()
  const created = await prisma.message.create({ data: { message } })
  return NextResponse.json(created, { status: 201 })
}
