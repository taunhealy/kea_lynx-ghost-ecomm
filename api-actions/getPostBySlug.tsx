import { prisma } from "@/lib/prisma"; // Example import for database connection

export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    console.error(`Post with slug "${slug}" not found.`);
  }

  return post;
}
