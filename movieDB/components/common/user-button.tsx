import { api } from "@/convex/_generated/api";
import { Dropdown, MenuProps, Space } from "antd";
import { useConvexAuth, useQuery } from "convex/react";
import Link from "next/link";
import { AuthButton } from "./auth-button";
import { UserOutlined } from "@ant-design/icons";

const UserButton = () => {
  const user = useQuery(api.user.getUserDetails);
  const { isAuthenticated } = useConvexAuth();

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
      label: <AuthButton />,
      key: "1",
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Space>
          {isAuthenticated && user && user.name ? (
            <aside className="h-7 w-7 rounded-full bg-blue-900 flex items-center justify-center text-white cursor-pointer">
              {user.name?.split("")[0].toUpperCase()}
            </aside>
          ) : (
            <aside className="h-7 w-7 rounded-full bg-blue-900 flex items-center justify-center text-white cursor-pointer">
              <UserOutlined />
            </aside>
          )}
        </Space>
      </Dropdown>
    </>
  );
};
export default UserButton;
