import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerAuth } from "@/api-actions/getServerAuth";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        subheading: true,
        slug: true,
        date: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  console.log("DELETE request received for slug:", params.slug);
  try {
    const { user } = await getServerAuth();

    if (!user) {
      console.log("Unauthorized: No user found");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { slug } = params;

    console.log(`Attempting to delete post with slug: ${slug}`);

    const post = await prisma.post.findUnique({ where: { slug } });

    console.log("Post found:", post);

    if (!post) {
      console.log("Post not found");
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Temporarily remove this check for debugging
    // if (post.userId !== user.id) {
    //   console.log("Forbidden: User does not own the post");
    //   return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    // }

    await prisma.post.delete({ where: { slug } });
    console.log("Post deleted successfully");
    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { 
        message: "Error deleting post", 
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { user } = await getServerAuth();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { slug } = params;
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid JSON in request body" },
      { status: 400 },
    );
  }

  // Validate input
  if (!body.title || !body.content) {
    return NextResponse.json(
      { message: "Title and content are required" },
      { status: 400 },
    );
  }

  try {
    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (!existingPost || existingPost.userId !== user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title: body.title,
        subheading: body.subheading || "",
        content: body.content,
      },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Error updating post" },
      { status: 500 },
    );
  }
}
