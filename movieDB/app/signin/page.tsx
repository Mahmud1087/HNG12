"use client";

import CustomizeRequiredMark from "@/components/common/required-mark";
import { useAppContext } from "@/store";
import { RequiredMark } from "@/types/form-types";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "@/utils/form-validation";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuthActions } from "@convex-dev/auth/react";
import { Form, FormProps, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignIn() {
  const [form] = Form.useForm();
  const email = Form.useWatch(["email"], form);
  const password = Form.useWatch(["password"], form);
  const confirmPassword = Form.useWatch(["confirmPassword"], form);
  const [requiredMark] = useState<RequiredMark>("customize");

  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { movieId, setMovieId } = useAppContext();

  const onFinish: FormProps<FormType>["onFinish"] = async (values) => {
    setLoading(true);
    setError(null);
    try {
      await signIn("password", {
        email: values.email,
        password: values.password,
        flow,
      });
      setLoading(false);
      router.push(movieId ? `/dashboard/${movieId}` : "/dashboard");
      setMovieId(null);
    } catch (error) {
      if (error instanceof Error) {
        // if (error.message === "InvalidAccountId") {
        setError(error.message);
        // }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center md:w-[360px] md:mx-auto">
      <h1 className="text-text-black font-semibold text-3xl">
        {flow === "signIn" ? "Sign In" : "Sign Up"}
      </h1>
      <p className="mt-3 text-[#414651] text-base mb-8 text-center">
        {flow === "signIn"
          ? "Welcome back! Please enter your details"
          : "Please enter your details to set up your account"}
      </p>
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
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
            validateEmail,
          ]}
          className="w-full"
          label={<p className="label">Email</p>}
        >
          <Input type="email" size="large" placeholder="name@email.com" />
        </Form.Item>

        <Form.Item<FormType>
          name="password"
          rules={[
            {
              required: true,
              message: "Enter password",
            },
            validatePassword,
          ]}
          className="w-full"
          label={<p className="label">Password</p>}
        >
          <Input.Password placeholder="••••••••" size="large" />
        </Form.Item>
        {/* </Flex> */}
        {flow === "signUp" && (
          <Form.Item<FormType>
            name="confirmPassword"
            dependencies={["password"]}
            rules={[validateConfirmPassword]}
            className="w-full"
            label={<p className="label">Confirm Password</p>}
          >
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>
        )}

        <button
          disabled={
            loading ||
            !email ||
            !password ||
            (flow === "signUp" && !confirmPassword)
          }
          className="w-full mb-3.5 py-2 rounded-md bg-blue-600 cursor-pointer text-white disabled:bg-blue-600/35 disabled:text-white"
          type="submit"
        >
          {loading ? (
            <LoadingOutlined />
          ) : flow === "signIn" ? (
            "Sign in"
          ) : (
            "Sign up"
          )}
        </button>
        <div className="w-full justify-center flex flex-row gap-2">
          <span>
            {flow === "signIn"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <span
            className="text-foreground underline hover:no-underline cursor-pointer"
            onClick={() => {
              form.resetFields();
              setFlow(flow === "signIn" ? "signUp" : "signIn");
            }}
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </span>
        </div>
        {error && (
          <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-2">
            <p className="text-foreground font-mono text-xs">
              Error signing in: {error}
            </p>
          </div>
        )}
      </Form>
    </div>
  );
}
