import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import React from "react";

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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
