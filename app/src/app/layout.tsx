import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import React from "react";
import { Navbar } from "../components/Navbar";

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
      <body
        className={
          "bg-gradient-to-r from-teal-100 to-yellow-100 " + inter.className
        }>
        <Navbar> {children}</Navbar>
      </body>
    </html>
  );
}
