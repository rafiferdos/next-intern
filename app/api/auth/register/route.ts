import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    } else {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      await prisma.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
        },
      });
      return NextResponse.json(
        { success: "User created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error in POST /api/auth/register:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}