import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { GlobalContextProvider } from "@/store";
import { ConfigProvider } from "antd";
import Navbar from "@/components/common/navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie bookmarking and favorites",
  description: "Developed by enesi_dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            <GlobalContextProvider>
              <ConfigProvider>
                <main className="container flex flex-col gap-8 w-[90%] lg:w-[75%] mx-auto">
                  <Navbar />
                  {children}
                </main>
              </ConfigProvider>
            </GlobalContextProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
