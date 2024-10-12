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

export const Navbar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink>Schedule</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/recipes">Recipes</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
