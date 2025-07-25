"use client";

import { Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const apps = [
  { name: "Admin Panel", href: "/admin", icon: "🛠️" },
  { name: "Players", href: "/players", icon: "👥" },
  { name: "Skills", href: "/skills", icon: "⭐" },
  { name: "Equipment", href: "/equipment", icon: "🎒" },
  { name: "Volunteers", href: "/volunteers", icon: "🤝" },
  { name: "Parent Portal", href: "/parent-portal", icon: "👨‍👩‍👧‍👦" },
  { name: "Analytics", href: "/advanced-stats", icon: "📊" },
  { name: "Video", href: "/video-analysis", icon: "🎥" },
  { name: "Smart Chat", href: "/smart-chatbots", icon: "💬" },
];

export default function NineDotMenu() {
  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Grid3X3 className="h-4 w-4" />
          <span className="sr-only">Open apps menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid grid-cols-3 gap-2">
          {apps.map((app) => (
            <button
              key={app.name}
              onClick={() => router.push(app.href)}
              className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl mb-1">{app.icon}</span>
              <span className="text-xs text-gray-600">{app.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}