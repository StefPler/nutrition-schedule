"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/src/components/ui/navigation-menu";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { ChildrenProps } from "../app/layout";

export const Navbar = ({ children }: ChildrenProps) => {
  return (
    <>
      <div className="relative w-full h-full flex-col">
        <div className="sticky top-0 flex w-full h-full bg-primary p-5 space-x-4 justify-between items-center text-white">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/">Schedule</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/recipes">Recipes</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex-1 p-4 bg-grey-100">
          <div className="max-w-[1300px] mx-auto">{children}</div>
        </div>
      </div>
    </>
  );
};
