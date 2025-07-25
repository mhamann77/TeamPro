"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  BellRing,
  MessageSquare,
  Calendar,
  Users,
  Trophy,
  AlertCircle,
  CheckCircle,
  Clock,
  Archive,
  Settings
} from "lucide-react";

// Mock data
const mockNotifications = [
  {
    id: 1,
    title: "Game Reminder",
    message: "Lightning Bolts vs Thunder Hawks tomorrow at 6:00 PM",
    type: "reminder",
    category: "game",
    timestamp: "2025-01-25T10:00:00",
    read: false,
    priority: "high"
  },
  {
    id: 2,
    title: "Practice Schedule Update",
    message: "Lightning Bolts practice moved to 4:30 PM on Friday",
    type: "update",
    category: "practice",
    timestamp: "2025-01-24T15:30:00",
    read: false,
    priority: "medium"
  },
  {
    id: 3,
    title: "New Player Added",
    message: "Emma Johnson has been added to Lightning Bolts roster",
    type: "info",
    category: "roster",
    timestamp: "2025-01-23T09:15:00",
    read: true,
    priority: "low"
  },
  {
    id: 4,
    title: "Tournament Registration Open",
    message: "Youth Championship Tournament registration is now open",
    type: "announcement",
    category: "tournament",
    timestamp: "2025-01-22T14:00:00",
    read: true,
    priority: "high"
  }
];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const [filter, setFilter] = useState("all");

  // Fetch notifications with mock implementation
  const { data: notifications = mockNotifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockNotifications;
    }
  });

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "unread" && notification.read) return false;
    if (activeTab === "read" && !notification.read) return false;
    if (filter !== "all" && notification.category !== filter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "reminder": return <Clock className="h-5 w-5" />;
      case "update": return <AlertCircle className="h-5 w-5" />;
      case "info": return <MessageSquare className="h-5 w-5" />;
      case "announcement": return <BellRing className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "reminder": return "text-blue-600 bg-blue-100";
      case "update": return "text-orange-600 bg-orange-100";
      case "info": return "text-green-600 bg-green-100";
      case "announcement": return "text-purple-600 bg-purple-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high": return <Badge variant="destructive">High Priority</Badge>;
      case "medium": return <Badge variant="secondary">Medium Priority</Badge>;
      case "low": return <Badge variant="outline">Low Priority</Badge>;
      default: return null;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) {
      return "Just now";
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Stay updated with team activities and announcements</p>
          </div>
          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <Badge variant="destructive" className="px-3 py-1">
                {unreadCount} New
              </Badge>
            )}
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <Bell className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                  <p className="text-xs text-gray-600">Total Notifications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <BellRing className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                  <p className="text-xs text-gray-600">Unread</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {notifications.filter(n => n.priority === "high").length}
                  </p>
                  <p className="text-xs text-gray-600">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {notifications.filter(n => n.read).length}
                  </p>
                  <p className="text-xs text-gray-600">Read</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">Filter by:</span>
              <div className="flex space-x-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All Categories
                </Button>
                <Button
                  variant={filter === "game" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("game")}
                >
                  <Trophy className="h-4 w-4 mr-1" />
                  Games
                </Button>
                <Button
                  variant={filter === "practice" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("practice")}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Practice
                </Button>
                <Button
                  variant={filter === "roster" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("roster")}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Roster
                </Button>
                <Button
                  variant={filter === "tournament" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("tournament")}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Tournament
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4 space-y-4">
            {isLoading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading notifications...</p>
                </CardContent>
              </Card>
            ) : filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                  <p className="text-gray-600">You're all caught up!</p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`hover:shadow-lg transition-shadow ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            {getPriorityBadge(notification.priority)}
                          </div>
                          <p className="text-gray-600 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</p>
                        </div>
                      </div>
                      <div className="ml-4 flex space-x-2">
                        {!notification.read && (
                          <Button variant="ghost" size="sm">
                            Mark as read
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}