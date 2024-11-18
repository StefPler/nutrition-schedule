"use client";

import { ChildrenProps } from "../app/layout";
import { TabNav, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

export const Navbar = ({ children }: ChildrenProps) => {
  const pathname = usePathname();

  return (
    <>
      <div className="relative w-full h-full flex-col">
        {/* <div className="sticky top-0 flex w-full h-full bg-primary p-5 space-x-4 justify-between items-center text-white"> */}
        <div>
          <TabNav.Root justify="center" color="green">
            <TabNav.Link href="/" active={pathname === "/"}>
              <Text size="4">Schedule</Text>
            </TabNav.Link>
            <TabNav.Link href="/recipes" active={pathname === "/recipes"}>
              <Text size="4">Recipes</Text>
            </TabNav.Link>
          </TabNav.Root>
        </div>

        <div className="flex-1 p-4">
          <div className="max-w-[1300px] mx-auto">{children}</div>
        </div>
      </div>
    </>
  );
};
