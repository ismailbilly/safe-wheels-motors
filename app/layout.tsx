import type { Metadata } from "next";
import { Roboto, Mulish } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  weight: "400",
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mulish = Mulish({
  weight: "variable",
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Car Dealer Website",
  description: "Car Dealer Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased overscroll-none bg-background",
          roboto.variable,
          mulish.variable
        )}
      >
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster/>
      </body>
    </html>
  );
}
