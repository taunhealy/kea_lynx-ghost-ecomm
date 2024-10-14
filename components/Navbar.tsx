// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-9 text-white">
      <h1 className="text-xl font-bold">My Blog</h1>
      <div>
        {session ? (
          <div className="flex gap-4">
            <Link href="/posts/" className="px-4 py-2">
              Posts
            </Link>
            <Link href="/admin/" className="rounded bg-blue-500 px-4 py-2">
              Admin Panel
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded bg-red-500 px-4 py-2"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <Link href="/sign-in" className="rounded bg-blue-500 px-4 py-2">
              Sign In
            </Link>
            <Link href="/sign-up" className="rounded bg-green-500 px-4 py-2">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
