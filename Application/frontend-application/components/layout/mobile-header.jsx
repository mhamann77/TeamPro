"use client";

import { Trophy, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HamburgerNav from "./hamburger-nav";
import { useAuth } from "@/hooks/useAuth";

export default function MobileHeader() {
  const { user } = useAuth();

  return (
    <div className="lg:hidden sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <HamburgerNav />
            <div className="flex items-center ml-3">
              <div className="bg-primary text-white p-1.5 rounded-lg">
                <Trophy className="h-5 w-5" />
              </div>
              <h1 className="ml-2 text-lg font-bold text-gray-900">TeamPro</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}