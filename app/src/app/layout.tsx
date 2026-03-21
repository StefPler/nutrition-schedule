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
  metadataBase: new URL("https://weekbites.me"),
  title: "Διατροφή",
  description:
    "Εξατομικευμένο εβδομαδιαίο πρόγραμμα Μεσογειακής διατροφής με αυτόματο υπολογισμό θερμίδων και μακροθρεπτικών.",
  openGraph: {
    title: "Διατροφή — Εβδομαδιαίο Πρόγραμμα",
    description:
      "Εξατομικευμένο πρόγραμμα Μεσογειακής διατροφής με αυτόματη παρακολούθηση θερμίδων, πρωτεΐνης, υδατανθράκων, λίπους και φυτικών ινών.",
    url: "https://weekbites.me",
    type: "website",
    locale: "el_GR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Διατροφή — Εβδομαδιαίο Πρόγραμμα",
    description: "Εξατομικευμένο πρόγραμμα Μεσογειακής διατροφής με αυτόματη παρακολούθηση μακροθρεπτικών.",
  },
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
            accentColor="teal"
            hasBackground={true}
            panelBackground="translucent"
            className="bg-gradient-to-br from-teal-100 to-green-200 ">
            {process.env.NODE_ENV === "development" && <ThemePanel />}
            <NavbarSticky />
            <div className="max-w-[1400px] mx-auto">{children}</div>
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
