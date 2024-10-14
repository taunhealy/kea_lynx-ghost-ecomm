import { useSession } from "next-auth/react";

export function getAuth() {
  const { data: session } = useSession();
  return { user: session?.user };
}
