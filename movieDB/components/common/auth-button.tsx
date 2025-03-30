"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <>
      <button
        className={`relative z-40 ${isAuthenticated ? "bg-red-500" : "bg-blue-500"} rounded-md px-2 py-1 text-white text-sm w-full cursor-pointer`}
        onClick={() => {
          if (isAuthenticated) {
            void signOut();
          } else {
            router.push("/signin");
          }
        }}
      >
        {isAuthenticated ? "Sign out" : "Sign in"}
      </button>
    </>
  );
}
