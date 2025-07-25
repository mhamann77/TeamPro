'use client';

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import AiPromptHeader from "@/components/layout/ai-prompt-header";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Trophy,
  Calendar,
  MapPin,
  Star
} from "lucide-react";

// Mock data for teams
const mockTeams = [
  {
    id: 1,
    name: "Lightning Bolts",
    sport: "basketball",
    description: "U12 competitive basketball team",
    memberCount: 12,
    nextEvent: "Today at 6:00 PM",
    homeVenue: "Main Court",
    rating: "4.8",
    category: "U12"
  },
  {
    id: 2,
    name: "Thunder Hawks",
    sport: "soccer",
    description: "U14 soccer team",
    memberCount: 18,
    nextEvent: "Tomorrow at 4:30 PM",
    homeVenue: "Field A",
    rating: "4.6",
    category: "U14"
  },
  {
    id: 3,
    name: "Red Sox Jr",
    sport: "baseball",
    description: "Youth baseball team",
    memberCount: 15,
    nextEvent: "Saturday at 9:00 AM",
    homeVenue: "Diamond 1",
    rating: "4.9",
    category: "U10"
  },
  {
    id: 4,
    name: "Volleyball Stars",
    sport: "volleyball",
    description: "Girls volleyball team",
    memberCount: 14,
    nextEvent: "Friday at 5:00 PM",
    homeVenue: "Gym B",
    rating: "4.7",
    category: "U16"
  }
];

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Simulate API call with mock data
  const { data: teams = mockTeams, isLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockTeams;
    }
  });

  // Create team mutation
  const createTeamMutation = useMutation({
    mutationFn: async (teamData) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...teamData, id: Date.now() };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast({
        title: "Team Created",
        description: "New team has been successfully created.",
      });
      setShowTeamForm(false);
    },
  });

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.sport?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTeam = (teamData) => {
    createTeamMutation.mutate(teamData);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <AiPromptHeader />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600">Manage your teams, rosters, and performance</p>
          </div>
          <Button onClick={() => setShowTeamForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search teams by name or sport..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Teams Grid */}
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
        ) : filteredTeams.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Teams Found</h3>
                <p className="text-gray-600 mb-4">Create your first team to get started.</p>
                <Button onClick={() => setShowTeamForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Team
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <Card key={team.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{team.name}</h3>
                        <Badge variant="secondary">{team.sport}</Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedTeam(team)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{team.memberCount || 0} players</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Next: {team.nextEvent || "No events scheduled"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{team.homeVenue || "No home venue"}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{team.rating || "No rating"}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Team Form Modal */}
      <Dialog open={showTeamForm} onOpenChange={setShowTeamForm}>
        <DialogContent aria-describedby="team-form-description">
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <div id="team-form-description" className="text-sm text-gray-600">
              Create a new team for your organization. Fill in the team details below.
            </div>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const teamData = {
                name: formData.get("name"),
                sport: formData.get("sport"),
                description: formData.get("description"),
                category: formData.get("category"),
              };
              handleCreateTeam(teamData);
            }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm font-medium">Team Name</label>
              <Input name="name" required />
            </div>
            <div>
              <label className="text-sm font-medium">Sport</label>
              <select name="sport" required className="w-full p-2 border rounded-md">
                <option value="">Select a sport</option>
                <option value="basketball">Basketball</option>
                <option value="volleyball">Volleyball</option>
                <option value="baseball">Baseball</option>
                <option value="soccer">Soccer</option>
                <option value="football">Football</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Age Category</label>
              <select name="category" required className="w-full p-2 border rounded-md">
                <option value="">Select category</option>
                <option value="U8">Under 8</option>
                <option value="U10">Under 10</option>
                <option value="U12">Under 12</option>
                <option value="U14">Under 14</option>
                <option value="U16">Under 16</option>
                <option value="U18">Under 18</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                name="description"
                className="w-full p-2 border rounded-md"
                rows={3}
              />
            </div>
            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={() => setShowTeamForm(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createTeamMutation.isPending}>
                {createTeamMutation.isPending ? "Creating..." : "Create Team"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}