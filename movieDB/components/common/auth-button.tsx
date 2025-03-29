"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";

export function AuthButton({ close }: { close?: () => void }) {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <>
      <button
        className={`${isAuthenticated ? "bg-red-500" : "bg-blue-500"} rounded-md px-2 py-1 text-white text-sm w-full cursor-pointer ${!isAuthenticated ? "hidden" : "block"}`}
        onClick={() => {
          if (isAuthenticated) {
            void signOut();
          } else {
            close!();
            router.push("/signin");
          }
        }}
      >
        {isAuthenticated ? "Sign out" : "Sign in"}
      </button>
    </>
  );
}
