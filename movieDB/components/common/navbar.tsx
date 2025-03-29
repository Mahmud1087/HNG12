"use client";

import { Flex, Input } from "antd";
import Logo from "./logo";
import MobileSidebar, { sidebarItems } from "./sidebar";
import { SignOutButton } from "./sign-out";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "./sign-in";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { isAuthenticated } = useConvexAuth();
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/signin" && (
        <header className="sticky top-0 z-10 bg-background py-4 border-b border-blue-900 flex flex-row justify-between items-center">
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
            <Input.Search placeholder="Search by name..." />
            <div className="hidden w-full md:w-[50%] md:block">
              <SignOutButton />
              <SignInButton />
            </div>
          </Flex>
        </header>
      )}
    </>
  );
};
export default Navbar;
