"use client";

import CustomizeRequiredMark from "@/components/common/required-mark";
import { api } from "@/convex/_generated/api";
import { useToastContext } from "@/store";
import { RequiredMark } from "@/types/form-types";
import { validateEmail } from "@/utils/form-validation";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, FormProps, Input } from "antd";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

type FormType = {
  email: string;
  name: string;
};

const Page = () => {
  const [form] = Form.useForm();
  const [requiredMark] = useState<RequiredMark>("customize");
  const updateUserDetails = useMutation(api.user.updateUserDetails);
  const user = useQuery(api.user.getUserDetails);
  const email = Form.useWatch(["email"], form);
  const name = Form.useWatch(["name"], form);
  const { open } = useToastContext();

  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FormType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const res = await updateUserDetails({
        email: values.email === undefined ? user?.email : values.email,
        name: values.name === undefined ? user?.name : values.name,
      });
      open({
        message: res,
        type: "success",
      });
      form.resetFields();
    } catch (error) {
      if (error instanceof Error) {
        open({ duration: 5, message: error.message, type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center md:w-[360px] md:mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-10">
        Profile Settings
      </h1>

      <Form
        layout="vertical"
        form={form}
        name="loginForm"
        onFinish={onFinish}
        autoComplete="off"
        disabled={loading}
        className="w-full"
        requiredMark={
          requiredMark === "customize" ? CustomizeRequiredMark : requiredMark
        }
      >
        {/* <Flex vertical> */}
        <Form.Item<FormType>
          name="email"
          rules={[validateEmail]}
          className="w-full"
          label={<p className="label">Email</p>}
        >
          <Input
            type="email"
            size="large"
            placeholder={user ? user.email : ""}
          />
        </Form.Item>

        <Form.Item<FormType>
          name="name"
          className="w-full"
          label={<p className="label">Full Name</p>}
        >
          <Input
            placeholder={user && user.name ? user.name : ""}
            size="large"
          />
        </Form.Item>

        <button
          disabled={
            loading ||
            (!email && !name) ||
            (email === user?.email && name === user?.name)
          }
          className="w-full mb-3.5 py-2 rounded-md bg-blue-600 text-white disabled:bg-blue-600/35 disabled:text-white"
          type="submit"
        >
          {loading ? <LoadingOutlined /> : "Save Changes"}
        </button>
      </Form>
    </div>
  );
};
export default Page;
