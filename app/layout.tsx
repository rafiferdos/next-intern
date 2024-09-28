import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import { NextUIProvider } from "@nextui-org/system";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next Intern",
  description: "A platform to find best internships in Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <NextUIProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
          >
            <Nav />
            <div className="mx-auto max-w-7xl w-11/12">{children}</div>
          </body>
        </NextUIProvider>
      </SessionWrapper>
    </html>
  );
}
