"use client";
import React, { useState } from "react";
import { Menu, X, UtensilsCrossed, CalendarDays } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const NavbarSticky: React.FC = () => {
  const path = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "schedule" as const, label: "Πρόγραμμα", icon: CalendarDays, path: "/" },
    { id: "recipes" as const, label: "Συνταγές", icon: UtensilsCrossed, path: "/recipes" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
      <div className="mx-auto px-10">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              WeekBites
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => router.push(navItems[idx].path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  path === item.path
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3 border-t border-gray-100 pt-2">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push(navItems[idx].path);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  path === item.path
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}>
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarSticky;
