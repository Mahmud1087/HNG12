"use client";

import { api } from "@/convex/_generated/api";
import { Dropdown, MenuProps, Space } from "antd";
import { useConvexAuth, useQuery } from "convex/react";
import Link from "next/link";
import { AuthButton } from "./auth-button";
import { UserOutlined } from "@ant-design/icons";

const UserButton = () => {
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(api.user.getUserDetails);

  const items: MenuProps["items"] = [
    {
      label: (
        <>
          {isAuthenticated && (
            <div className="w-[9rem] md:w-[12rem]">
              <Link href="/dashboard/profile" className="text-blue-950">
                Profile
              </Link>
            </div>
          )}
        </>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className="w-[9rem] md:w-[12rem]">
          <AuthButton />
        </div>
      ),
      key: "1",
    },
  ];

  return (
    <>
      {isAuthenticated ? (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Space>
            <aside className="h-7 w-7 rounded-full bg-blue-900 flex items-center justify-center text-white cursor-pointer">
              {user?.name?.split("")[0].toUpperCase()}
            </aside>
          </Space>
        </Dropdown>
      ) : (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Space>
            <aside className="h-7 w-7 rounded-full bg-blue-900 flex items-center justify-center text-white cursor-pointer">
              <UserOutlined />
            </aside>
          </Space>
        </Dropdown>
      )}
    </>
  );
};
export default UserButton;
