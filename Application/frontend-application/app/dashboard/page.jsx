'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Activity,
  Trophy,
  Clock,
  MapPin,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      name: "Total Teams",
      value: "12",
      icon: Users,
      change: "+2 from last month",
      changeType: "positive"
    },
    {
      name: "Scheduled Events",
      value: "48",
      icon: Calendar,
      change: "Next: Today at 6:00 PM",
      changeType: "neutral"
    },
    {
      name: "Revenue",
      value: "$12,450",
      icon: DollarSign,
      change: "+15% from last month",
      changeType: "positive"
    },
    {
      name: "Active Players",
      value: "186",
      icon: Activity,
      change: "95% attendance rate",
      changeType: "positive"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "U12 Soccer Practice",
      time: "Today, 6:00 PM",
      location: "Field A",
      team: "Lightning Bolts"
    },
    {
      id: 2,
      title: "Basketball Game vs Eagles",
      time: "Tomorrow, 4:30 PM",
      location: "Main Court",
      team: "Thunder Hawks"
    },
    {
      id: 3,
      title: "Baseball Tournament",
      time: "Saturday, 9:00 AM",
      location: "Diamond 1",
      team: "Red Sox Jr"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New player registered",
      description: "Sarah Johnson joined Lightning Bolts",
      time: "2 hours ago"
    },
    {
      id: 2,
      action: "Payment received",
      description: "$150 from Mike Chen (Thunder Hawks)",
      time: "5 hours ago"
    },
    {
      id: 3,
      action: "Schedule updated",
      description: "Practice moved to Field B on Thursday",
      time: "1 day ago"
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || 'Coach'}!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your teams today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 
                  'text-muted-foreground'
                }`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Events</CardTitle>
              <Button variant="ghost" size="sm">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {event.location}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.team}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <Activity className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Button variant="outline" className="flex flex-col h-auto py-4">
              <Users className="mb-2 h-5 w-5" />
              <span className="text-xs">Add Player</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-4">
              <Calendar className="mb-2 h-5 w-5" />
              <span className="text-xs">Schedule Event</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-4">
              <DollarSign className="mb-2 h-5 w-5" />
              <span className="text-xs">Record Payment</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-4">
              <Trophy className="mb-2 h-5 w-5" />
              <span className="text-xs">View Stats</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}