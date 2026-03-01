"use client";

import { ChildrenProps } from "../app/layout";
import { TabNav, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = ({ children }: ChildrenProps) => {
  const pathname = usePathname();

  return (
    <>
      <div className="relative w-full h-full flex-col">
        <div>
          <TabNav.Root justify="center" color="green">
            <TabNav.Link asChild={true} active={pathname === "/"}>
              <Link href="/">
                <Text size="4" weight="bold">
                  Πρόγραμμα
                </Text>
              </Link>
            </TabNav.Link>
            <TabNav.Link asChild={true} active={pathname === "/recipes"}>
              <Link href="/recipes">
                <Text size="4" weight="bold">
                  Συνταγές
                </Text>
              </Link>
            </TabNav.Link>
            <TabNav.Link asChild={true} active={pathname === "/calculator"}>
              <Link href="/calculator">
                <Text size="4" weight="bold">
                  Υπολογιστής
                </Text>
              </Link>
            </TabNav.Link>
          </TabNav.Root>
        </div>

        <div className="flex-1 p-4 ">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </div>
      </div>
    </>
  );
};
