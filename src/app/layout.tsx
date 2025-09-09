import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/components/header";

export const metadata: Metadata = {
  title: "Product Browser",
  description: "A simple product browsing app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <NuqsAdapter>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <Header />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </NuqsAdapter>
  );
}
