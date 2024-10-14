import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";

export async function getServerAuth() {
  const session = await getServerSession(authOptions);
  return { user: session?.user };
}
