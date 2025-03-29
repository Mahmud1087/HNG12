"use client";

import { CloseOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex } from "antd";
import Link from "next/link";
import { useState } from "react";
import { SignOutButton } from "./sign-out";
import Logo from "./logo";
import { SignInButton } from "./sign-in";
import { useConvexAuth } from "convex/react";

export const sidebarItems = [
  {
    name: "Favorites",
    href: "/favorites",
  },
  {
    name: "Bookmarks",
    href: "/bookmarks",
  },
];

const MobileSidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated } = useConvexAuth();

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <div onClick={showDrawer}>
        <MenuUnfoldOutlined className="text-2xl" />
      </div>

      <Drawer
        style={{ width: "75%" }}
        placement="left"
        onClose={closeDrawer}
        title={<DrawerTitle closeDrawer={closeDrawer} />}
        closable={false}
        open={drawerOpen}
        className="md:hidden"
      >
        <Flex vertical className="h-[77vh] flex flex-col justify-between">
          {isAuthenticated && (
            <Flex vertical align="center" gap={5}>
              {sidebarItems.map((item, i) => {
                return (
                  <Link href={item.href} key={i} onClick={closeDrawer}>
                    <p className="text-blue-900 text-base">{item.name}</p>
                  </Link>
                );
              })}
            </Flex>
          )}
          <div className="mt-10 w-full flex flex-col gap-4 md:w-[50%]">
            <SignOutButton />
            <SignInButton close={closeDrawer} />
          </div>
        </Flex>
      </Drawer>
    </div>
  );
};

const DrawerTitle = ({ closeDrawer }: { closeDrawer: () => void }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Logo closeDrawer={closeDrawer} />
        <Button type="text" className="p-0" onClick={closeDrawer}>
          <CloseOutlined className="text-base text-red-500" />
        </Button>
      </div>
    </>
  );
};

export default MobileSidebar;
