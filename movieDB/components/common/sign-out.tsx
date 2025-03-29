"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";

export function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  return (
    <>
      {isAuthenticated && (
        <button
          className={`bg-red-500 rounded-md px-2 py-1 text-white text-sm w-full ${!isAuthenticated ? "hidden" : "block"}`}
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      )}
    </>
  );
}
