import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Navbar from "./components/Navbar";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import AuthProvider from "@/utils/SessionProvider";
// components

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Auth App",
  description: "A login and Signup web App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={rubik.className}>
        <AuthProvider >
          <div>
            {/* <Navbar /> */}
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
