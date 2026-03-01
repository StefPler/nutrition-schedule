import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "@radix-ui/themes/styles.css";
import React from "react";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Providers } from "./Providers";
import NavbarSticky from "../components/NavbarSticky";
import clsx from "clsx";

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
      <body className={clsx(inter.className)}>
        <Providers>
          <Theme
            hasBackground={true}
            panelBackground="translucent"
            className="bg-gradient-to-br from-teal-100 to-green-200 ">
            {process.env.NODE_ENV === "development" && <ThemePanel />}
            <NavbarSticky />
            <div className="max-w-[1600px] mx-auto">{children}</div>
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
