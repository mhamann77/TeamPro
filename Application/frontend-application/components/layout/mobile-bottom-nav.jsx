"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Users, Calendar, Bell, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Teams", href: "/teams", icon: Users },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Alerts", href: "/notifications", icon: Bell },
  { name: "More", href: "#", icon: Grid3X3, isMenu: true },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (item) => {
    if (item.isMenu) {
      // Handle menu opening - could show a sheet or modal
      console.log("Open menu");
    } else {
      router.push(item.href);
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <nav className="flex justify-around">
        {mobileNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <button
              key={item.name}
              onClick={() => handleNavClick(item)}
              className={cn(
                "flex flex-col items-center justify-center w-full py-2 px-3 text-xs font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              {item.name}
            </button>
          );
        })}
      </nav>
    </div>
  );
}