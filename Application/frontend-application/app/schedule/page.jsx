"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  Users,
  Trophy,
  Edit,
  Filter
} from "lucide-react";

// Mock data
const mockEvents = [
  {
    id: 1,
    title: "Lightning Bolts vs Thunder Hawks",
    type: "game",
    date: "2025-01-20",
    time: "18:00",
    location: "Main Field",
    teams: ["Lightning Bolts", "Thunder Hawks"],
    status: "scheduled"
  },
  {
    id: 2,
    title: "Lightning Bolts Practice",
    type: "practice",
    date: "2025-01-18",
    time: "16:00",
    location: "Training Ground",
    teams: ["Lightning Bolts"],
    status: "scheduled"
  },
  {
    id: 3,
    title: "Youth Championship Tournament",
    type: "tournament",
    date: "2025-02-01",
    time: "09:00",
    location: "City Sports Complex",
    teams: ["All Teams"],
    status: "upcoming"
  }
];

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [filterType, setFilterType] = useState("all");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch events data with mock implementation
  const { data: events = mockEvents, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockEvents;
    }
  });

  const filteredEvents = events.filter(event => {
    if (filterType === "all") return true;
    return event.type === filterType;
  });

  const getEventTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "game": return "bg-green-100 text-green-800";
      case "practice": return "bg-blue-100 text-blue-800";
      case "tournament": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schedule & Events</h1>
            <p className="text-gray-600">Manage games, practices, and tournaments</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}>
              <Calendar className="h-4 w-4 mr-2" />
              {viewMode === "list" ? "Calendar View" : "List View"}
            </Button>
            <Button onClick={() => setShowEventForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Event
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-4">
              <Filter className="h-4 w-4 text-gray-500" />
              <div className="flex space-x-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("all")}
                >
                  All Events
                </Button>
                <Button
                  variant={filterType === "game" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("game")}
                >
                  Games
                </Button>
                <Button
                  variant={filterType === "practice" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("practice")}
                >
                  Practices
                </Button>
                <Button
                  variant={filterType === "tournament" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("tournament")}
                >
                  Tournaments
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                  <p className="text-xs text-gray-600">Total Events</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {events.filter(e => e.type === "game").length}
                  </p>
                  <p className="text-xs text-gray-600">Games Scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {events.filter(e => e.type === "practice").length}
                  </p>
                  <p className="text-xs text-gray-600">Practices</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-xs text-gray-600">Venues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        {viewMode === "list" && (
          <div className="space-y-4">
            {isLoading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading events...</p>
                </CardContent>
              </Card>
            ) : filteredEvents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No events scheduled</h3>
                  <p className="text-gray-600 mb-4">Get started by scheduling your first event</p>
                  <Button onClick={() => setShowEventForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Event
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {formatTime(event.time)}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            {event.teams.join(", ")}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {viewMode === "calendar" && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Calendar view coming soon</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Event Form Modal */}
      <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Schedule New Event</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-gray-600">Event form will be implemented here</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}