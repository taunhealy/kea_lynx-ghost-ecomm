import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <div className="flex-col gap-2 p-4">
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <Link href="/admin/posts">
            <div className="text-black">View Posts</div>
          </Link>
          <Link href="/admin/posts/create-post">
            <div className="text-black">Create Post</div>
          </Link>
          <Link href="/admin/categories">
            <div className="text-black">View Categories</div>
          </Link>
        </div>
        {children}
      </main>
    </div>
  );
}
