"use client";

import { Flex } from "antd";
import Logo from "./logo";
import MobileSidebar, { sidebarItems } from "./sidebar";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { usePathname } from "next/navigation";
import UserButton from "./user-button";

const Navbar = () => {
  const { isAuthenticated } = useConvexAuth();
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/signin" && (
        <header className="sticky top-0 z-50 bg-background py-4 border-b border-blue-900 flex flex-row justify-between items-center w-[90%] lg:w-[80%] mx-auto mb-10">
          <div>
            <section className="md:hidden">
              <MobileSidebar />
            </section>
            <section className="hidden md:block">
              <Logo />
            </section>
          </div>

          {isAuthenticated && (
            <section className="hidden md:block">
              <Flex align="center" gap={25}>
                {sidebarItems.map((item, i) => {
                  return (
                    <Link href={item.href} key={i}>
                      <p className="text-blue-900 text-base">{item.name}</p>
                    </Link>
                  );
                })}
              </Flex>
            </section>
          )}

          <Flex gap={10} align="center" className="">
            <div className="w-full">
              <UserButton />
            </div>
          </Flex>
        </header>
      )}
    </>
  );
};
export default Navbar;
