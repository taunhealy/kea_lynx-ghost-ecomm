import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerAuth } from "@/api-actions/getServerAuth";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });
    return NextResponse.json(
      categories.map((category) => ({
        ...category,
        postCount: category._count.posts,
      })),
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  console.log("Starting POST request for category creation");

  try {
    const { user } = await getServerAuth();
    console.log("Auth result:", JSON.stringify({ user }, null, 2));

    if (!user) {
      console.log("User not authenticated");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name } = await request.json();
    console.log("Creating category with name:", name);

    const category = await prisma.category.create({ data: { name } });
    console.log("Category created:", JSON.stringify(category, null, 2));

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/categories:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 },
    );
  }
}
