"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PlayerForm from "@/components/players/player-form";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  UserPlus,
  Upload,
  Download,
  Search,
  Filter,
  Brain,
  Target,
  Award,
  TrendingUp,
  Shield,
  FileText
} from "lucide-react";

// Mock data
const mockPlayers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    jerseyNumber: 10,
    position: "Forward",
    dateOfBirth: "2010-05-15",
    teamId: 1,
    teamName: "Lightning Bolts",
    guardianName: "Jane Smith",
    guardianEmail: "jane.smith@email.com",
    guardianPhone: "(555) 123-4567",
    skills: { speed: 8, accuracy: 7, teamwork: 9 }
  },
  {
    id: 2,
    firstName: "Emma",
    lastName: "Johnson",
    jerseyNumber: 7,
    position: "Captain",
    dateOfBirth: "2009-08-22",
    teamId: 1,
    teamName: "Lightning Bolts",
    guardianName: "Mike Johnson",
    guardianEmail: "mike.j@email.com",
    guardianPhone: "(555) 234-5678",
    skills: { speed: 9, accuracy: 8, teamwork: 10 }
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Brown",
    jerseyNumber: 23,
    position: "Defender",
    dateOfBirth: "2011-03-10",
    teamId: 2,
    teamName: "Thunder Hawks",
    guardianName: "Sarah Brown",
    guardianEmail: "sarah.brown@email.com",
    guardianPhone: "(555) 345-6789",
    skills: { speed: 7, accuracy: 6, teamwork: 8 }
  }
];

const mockTeams = [
  { id: 1, name: "Lightning Bolts" },
  { id: 2, name: "Thunder Hawks" },
  { id: 3, name: "Fire Dragons" }
];

const mockAiInsights = {
  teamBalance: "85%",
  avgSkillLevel: "7.2",
  completionRate: "94%"
};

export default function Players() {
  const [activeTab, setActiveTab] = useState("roster");
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTeam, setFilterTeam] = useState("all");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch players data with mock implementation
  const { data: players = mockPlayers, isLoading } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockPlayers;
    }
  });

  // Fetch teams for filtering
  const { data: teams = mockTeams } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTeams;
    }
  });

  // Fetch AI insights
  const { data: aiInsights = mockAiInsights } = useQuery({
    queryKey: ["players-ai-insights"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockAiInsights;
    }
  });

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = 
      player.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.jerseyNumber?.toString().includes(searchTerm);
    const matchesTeam = filterTeam === "all" || player.teamId === parseInt(filterTeam);
    return matchesSearch && matchesTeam;
  });

  const handleEditPlayer = (player) => {
    setSelectedPlayer(player);
    setShowPlayerForm(true);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Player Roster Management</h1>
            <p className="text-gray-600">Manage player profiles, skills, and guardian information</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Brain className="h-3 w-3 mr-1" />
              AI-Enhanced
            </Badge>
            <Badge variant="outline" className="border-green-200 text-green-800">
              <Users className="h-3 w-3 mr-1" />
              {players.length} Players
            </Badge>
          </div>
        </div>

        {/* AI Insights Banner */}
        <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">AI Roster Intelligence</h3>
                  <p className="text-sm text-blue-700">Smart team balancing and performance insights</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-green-600">{aiInsights.teamBalance}</div>
                  <div className="text-gray-600">Team Balance</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">{aiInsights.avgSkillLevel}</div>
                  <div className="text-gray-600">Avg Skill Level</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-600">{aiInsights.completionRate}</div>
                  <div className="text-gray-600">Profile Completion</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Controls */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search players by name or jersey number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <select
                  value={filterTeam}
                  onChange={(e) => setFilterTeam(e.target.value)}
                  className="p-2 border rounded-md"
                >
                  <option value="all">All Teams</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
                <Button onClick={() => setShowPlayerForm(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Player
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
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{players.length}</p>
                  <p className="text-xs text-gray-600">Total Players</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{teams.length}</p>
                  <p className="text-xs text-gray-600">Active Teams</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{players.filter(p => p.position === 'Captain').length}</p>
                  <p className="text-xs text-gray-600">Team Captains</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">12%</p>
                  <p className="text-xs text-gray-600">Avg Improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roster" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Roster</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Skills Tracking</span>
            </TabsTrigger>
            <TabsTrigger value="guardians" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Guardians</span>
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Import/Export</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roster">
            {isLoading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading players...</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jersey #</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guardian</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPlayers.map((player) => (
                          <tr key={player.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {player.firstName} {player.lastName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline">{player.jerseyNumber}</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-600">{player.position}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-600">{player.teamName}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">
                                <div>{player.guardianName}</div>
                                <div className="text-xs text-gray-500">{player.guardianPhone}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditPlayer(player)}
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Skills tracking component will be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guardians">
            <Card>
              <CardHeader>
                <CardTitle>Guardian Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Guardian management component will be implemented here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="import">
            <Card>
              <CardHeader>
                <CardTitle>Import/Export Players</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop a CSV file here, or click to browse</p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Players
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export All Players
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Player Form Modal */}
      <Dialog open={showPlayerForm} onOpenChange={setShowPlayerForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedPlayer ? "Edit Player" : "Add New Player"}
            </DialogTitle>
          </DialogHeader>
          <PlayerForm
            player={selectedPlayer}
            teams={teams}
            onSubmit={(playerData) => {
              toast({
                title: selectedPlayer ? "Player Updated" : "Player Added",
                description: `${playerData.firstName} ${playerData.lastName} has been ${selectedPlayer ? 'updated' : 'added'} successfully.`,
              });
              setShowPlayerForm(false);
              setSelectedPlayer(null);
            }}
            onCancel={() => {
              setShowPlayerForm(false);
              setSelectedPlayer(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}