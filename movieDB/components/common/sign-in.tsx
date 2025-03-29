"use client";

import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";

export function SignInButton({ close }: { close?: () => void }) {
  const { isAuthenticated } = useConvexAuth();
  const router = useRouter();
  return (
    <>
      {!isAuthenticated && (
        <button
          className={`bg-blue-500 rounded-md px-2 py-1 text-white text-sm w-full ${isAuthenticated ? "hidden" : "block"}`}
          onClick={() => {
            close!();
            router.push("/signin");
          }}
        >
          Sign In
        </button>
      )}
    </>
  );
}
