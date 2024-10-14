"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerAuth } from "@/api-actions/getServerAuth";
import { revalidatePath } from "next/cache";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subheading: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  quote: z.string().optional(),
  tags: z.array(z.string()).optional(), // Updated to expect an array of strings
});

export async function createPost(formData: FormData) {
  const { user } = await getServerAuth();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  const postData = {
    title: formData.get("title") as string,
    subheading: formData.get("subheading") as string,
    content: formData.get("content") as string,
    quote: formData.get("quote") as string,
    tags: (formData.get("tags") as string).split(",").map((tag) => tag.trim()),
    categories: formData.getAll("categories").map(Number),
  };

  try {
    let slug = postData.title.toLowerCase().replace(/\s+/g, "-");
    let existingPost = await prisma.post.findUnique({ where: { slug } });
    let counter = 1;

    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await prisma.post.findUnique({ where: { slug } });
      counter++;
    }

    const newPost = await prisma.post.create({
      data: {
        ...postData,
        user: { connect: { id: user.id } },
        slug,
        categories: {
          connect: postData.categories.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/posts");

    return { success: true, slug: newPost.slug };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: "Failed to create post" };
  }
}
