"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Calendar,
  Building,
  CreditCard,
  Bell,
  Settings,
  Trophy
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Teams", href: "/teams", icon: Users },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Facilities", href: "/facilities", icon: Building },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function HamburgerNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex items-center mb-6">
          <div className="bg-primary text-white p-2 rounded-lg">
            <Trophy className="h-6 w-6" />
          </div>
          <h1 className="ml-3 text-xl font-bold text-gray-900">TeamPro</h1>
        </div>
        
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}