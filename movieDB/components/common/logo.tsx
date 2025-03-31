"use client";

import { useConvexAuth } from "convex/react";
import Link from "next/link";

const Logo = ({ closeDrawer }: { closeDrawer?: () => void }) => {
  const { isAuthenticated } = useConvexAuth();

  return (
    <Link
      href={isAuthenticated ? "/dashboard/" : "/"}
      onClick={closeDrawer}
      className="font-bold"
    >
      MovieDB
    </Link>
  );
};
export default Logo;
