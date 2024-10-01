import prisma from '@/lib/prisma';


import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    console.log(posts); // Log the posts to verify the data
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error); // Log the error for better visibility
    return NextResponse.json({ error: error }, { status: 500 });
  }
}