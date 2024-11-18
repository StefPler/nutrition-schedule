import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "@radix-ui/themes/styles.css";
import React from "react";
import { Navbar } from "../components/Navbar";
import { Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({ subsets: ["greek"] });

export const metadata: Metadata = {
  title: "Διατροφή",
  description: "Γεννήτρια προγράματος διατροφής για την βδομάδα",
};

export interface ChildrenProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="gr">
      {/* "bg-gradient-to-r from-teal-100 to-yellow-100 " */}
      <body className={inter.className}>
        <Theme hasBackground={true}>
          {/* <ThemePanel /> */}
          <Navbar>{children}</Navbar>
        </Theme>
      </body>
    </html>
  );
}
