"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Plus,
  Calendar,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Edit,
  Home,
  Shield,
  Wifi,
  Car
} from "lucide-react";

// Mock data
const mockFacilities = [
  {
    id: 1,
    name: "Main Soccer Field",
    type: "field",
    location: "123 Sports Complex Dr",
    capacity: 50,
    hourlyRate: 75,
    availability: "Available",
    rating: 4.8,
    amenities: ["Lighting", "Parking", "Restrooms"],
    nextAvailable: "Today, 3:00 PM",
    currentBookings: 12
  },
  {
    id: 2,
    name: "Indoor Basketball Court",
    type: "court",
    location: "456 Athletic Center",
    capacity: 30,
    hourlyRate: 60,
    availability: "Booked until 5PM",
    rating: 4.6,
    amenities: ["Climate Control", "Scoreboard", "Locker Rooms"],
    nextAvailable: "Today, 5:00 PM",
    currentBookings: 8
  },
  {
    id: 3,
    name: "Community Pool",
    type: "pool",
    location: "789 Aquatic Center",
    capacity: 40,
    hourlyRate: 100,
    availability: "Available",
    rating: 4.9,
    amenities: ["Heated", "Lifeguard", "Changing Rooms"],
    nextAvailable: "Now",
    currentBookings: 15
  },
  {
    id: 4,
    name: "Training Gym",
    type: "gym",
    location: "321 Fitness Plaza",
    capacity: 25,
    hourlyRate: 50,
    availability: "Available",
    rating: 4.7,
    amenities: ["Equipment", "Mirrors", "Sound System"],
    nextAvailable: "Now",
    currentBookings: 6
  }
];

export default function Facilities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFacilityForm, setShowFacilityForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch facilities data with mock implementation
  const { data: facilities = mockFacilities, isLoading } = useQuery({
    queryKey: ["facilities"],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockFacilities;
    }
  });

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch = 
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || facility.type === filterType;
    const matchesAvailability = 
      filterAvailability === "all" || 
      (filterAvailability === "available" && facility.availability === "Available");
    
    return matchesSearch && matchesType && matchesAvailability;
  });

  const handleBookFacility = (facility) => {
    setSelectedFacility(facility);
    setShowBookingForm(true);
  };

  const getFacilityTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "field": return "bg-green-100 text-green-800";
      case "court": return "bg-blue-100 text-blue-800";
      case "gym": return "bg-purple-100 text-purple-800";
      case "pool": return "bg-cyan-100 text-cyan-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFacilityIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "field": return <MapPin className="h-5 w-5" />;
      case "court": return <Home className="h-5 w-5" />;
      case "gym": return <Shield className="h-5 w-5" />;
      case "pool": return <Users className="h-5 w-5" />;
      default: return <MapPin className="h-5 w-5" />;
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "lighting": return "💡";
      case "parking": return "🚗";
      case "restrooms": return "🚻";
      case "climate control": return "❄️";
      case "scoreboard": return "📊";
      case "locker rooms": return "🔒";
      case "heated": return "🔥";
      case "lifeguard": return "🏊";
      case "changing rooms": return "👔";
      case "equipment": return "🏋️";
      case "mirrors": return "🪞";
      case "sound system": return "🔊";
      default: return "✅";
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Facility Management</h1>
            <p className="text-gray-600">Book and manage sports facilities</p>
          </div>
          <Button onClick={() => setShowFacilityForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Facility
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search facilities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar View
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Type:</span>
                  <Button
                    variant={filterType === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("all")}
                  >
                    All Types
                  </Button>
                  <Button
                    variant={filterType === "field" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("field")}
                  >
                    Fields
                  </Button>
                  <Button
                    variant={filterType === "court" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("court")}
                  >
                    Courts
                  </Button>
                  <Button
                    variant={filterType === "gym" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("gym")}
                  >
                    Gyms
                  </Button>
                  <Button
                    variant={filterType === "pool" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("pool")}
                  >
                    Pools
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 ml-auto">
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <Button
                    variant={filterAvailability === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterAvailability("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterAvailability === "available" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterAvailability("available")}
                  >
                    Available Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{facilities.length}</p>
                  <p className="text-xs text-gray-600">Total Facilities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {facilities.filter(f => f.availability === "Available").length}
                  </p>
                  <p className="text-xs text-gray-600">Available Now</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {facilities.reduce((sum, f) => sum + f.currentBookings, 0)}
                  </p>
                  <p className="text-xs text-gray-600">Active Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {(facilities.reduce((sum, f) => sum + f.rating, 0) / facilities.length).toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-600">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Facilities Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredFacilities.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Facilities Found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => (
              <Card key={facility.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getFacilityTypeColor(facility.type)}`}>
                        {getFacilityIcon(facility.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{facility.name}</CardTitle>
                        <Badge className={getFacilityTypeColor(facility.type)} variant="secondary">
                          {facility.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{facility.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {facility.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      Capacity: {facility.capacity} people
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {facility.nextAvailable}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">${facility.hourlyRate}</span>
                      <span className="text-gray-600 text-sm">/hour</span>
                    </div>
                    <Badge 
                      variant={facility.availability === "Available" ? "default" : "secondary"}
                      className={facility.availability === "Available" ? "bg-green-600" : ""}
                    >
                      {facility.availability}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {facility.amenities.map((amenity, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {getAmenityIcon(amenity)} {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => handleBookFacility(facility)}
                      disabled={facility.availability !== "Available"}
                    >
                      Book Now
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Facility Modal */}
      <Dialog open={showFacilityForm} onOpenChange={setShowFacilityForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Facility</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-gray-600">Facility form will be implemented here</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book {selectedFacility?.name}</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-gray-600">Booking form will be implemented here</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}