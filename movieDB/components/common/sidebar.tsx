"use client";

import { CloseOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex } from "antd";
import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";
import { useConvexAuth } from "convex/react";

export const sidebarItems = [
  {
    name: "Favorites",
    href: "/dashboard/favorites",
  },
  {
    name: "Bookmarks",
    href: "/dashboard/bookmarks",
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
            <Flex vertical align="center" gap={35}>
              {sidebarItems.map((item, i) => {
                return (
                  <Link href={item.href} key={i} onClick={closeDrawer}>
                    <p className="text-blue-900 text-base">{item.name}</p>
                  </Link>
                );
              })}
            </Flex>
          )}
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
