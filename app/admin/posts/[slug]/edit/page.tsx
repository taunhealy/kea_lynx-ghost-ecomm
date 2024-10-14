import { prisma } from "@/lib/prisma";
import EditPostForm from "./EditPostForm";

const EditPostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) {
    return <div>Post not found</div>;
  }

  return <EditPostForm post={post} />;
};

export default EditPostPage;
