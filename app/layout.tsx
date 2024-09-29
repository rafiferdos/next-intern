import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import { Providers } from "./providers";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-foreground bg-background`}
      >
        <SessionWrapper>
          <Providers>
            <Nav />
            <div className="mx-auto max-w-7xl w-11/12 my-8 md:my-16 lg:my-20 2xl:my-24">{children}</div>
          </Providers>
        </SessionWrapper>
      </body>
    </html>
  );
}
