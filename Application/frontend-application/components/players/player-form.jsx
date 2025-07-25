"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Users,
  Heart,
  FileText,
  Save,
  X
} from "lucide-react";

export default function PlayerForm({ player, teams, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: player?.firstName || "",
    lastName: player?.lastName || "",
    dateOfBirth: player?.dateOfBirth || "",
    position: player?.position || "",
    jerseyNumber: player?.jerseyNumber || "",
    email: player?.email || "",
    phone: player?.phone || "",
    teamId: player?.teamId || "",
    medicalNotes: player?.medicalNotes || "",
    guardians: player?.guardians || [
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        relationship: "parent",
        isEmergencyContact: true
      }
    ]
  });

  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName) {
      toast({
        title: "Validation Error",
        description: "Player first and last name are required.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  const handleGuardianChange = (index, field, value) => {
    const updatedGuardians = [...formData.guardians];
    updatedGuardians[index] = { ...updatedGuardians[index], [field]: value };
    setFormData({ ...formData, guardians: updatedGuardians });
  };

  const addGuardian = () => {
    setFormData({
      ...formData,
      guardians: [
        ...formData.guardians,
        {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          relationship: "parent",
          isEmergencyContact: false
        }
      ]
    });
  };

  const removeGuardian = (index) => {
    const updatedGuardians = formData.guardians.filter((_, i) => i !== index);
    setFormData({ ...formData, guardians: updatedGuardians });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Basic Info</span>
          </TabsTrigger>
          <TabsTrigger value="guardians" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Guardians</span>
          </TabsTrigger>
          <TabsTrigger value="medical" className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>Medical</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Player Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jerseyNumber">Jersey Number</Label>
                  <Input
                    id="jerseyNumber"
                    type="number"
                    value={formData.jerseyNumber}
                    onChange={(e) => setFormData({ ...formData, jerseyNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <select
                    id="position"
                    className="w-full p-2 border rounded-md"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  >
                    <option value="">Select Position</option>
                    <option value="Forward">Forward</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Defender">Defender</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Captain">Captain</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team">Team</Label>
                  <select
                    id="team"
                    className="w-full p-2 border rounded-md"
                    value={formData.teamId}
                    onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
                  >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guardians" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Guardian Information</CardTitle>
                <Button type="button" onClick={addGuardian} size="sm">
                  Add Guardian
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.guardians.map((guardian, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Guardian {index + 1}</h4>
                      {formData.guardians.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGuardian(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input
                          value={guardian.firstName}
                          onChange={(e) => handleGuardianChange(index, "firstName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input
                          value={guardian.lastName}
                          onChange={(e) => handleGuardianChange(index, "lastName", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={guardian.email}
                          onChange={(e) => handleGuardianChange(index, "email", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          type="tel"
                          value={guardian.phone}
                          onChange={(e) => handleGuardianChange(index, "phone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Relationship</Label>
                        <select
                          className="w-full p-2 border rounded-md"
                          value={guardian.relationship}
                          onChange={(e) => handleGuardianChange(index, "relationship", e.target.value)}
                        >
                          <option value="parent">Parent</option>
                          <option value="guardian">Guardian</option>
                          <option value="grandparent">Grandparent</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2 pt-8">
                        <input
                          type="checkbox"
                          id={`emergency-${index}`}
                          checked={guardian.isEmergencyContact}
                          onChange={(e) => handleGuardianChange(index, "isEmergencyContact", e.target.checked)}
                        />
                        <Label htmlFor={`emergency-${index}`}>Emergency Contact</Label>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="medicalNotes">Medical Notes</Label>
                <textarea
                  id="medicalNotes"
                  className="w-full p-2 border rounded-md min-h-[150px]"
                  value={formData.medicalNotes}
                  onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                  placeholder="Any allergies, medications, or medical conditions..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          {player ? "Update Player" : "Add Player"}
        </Button>
      </div>
    </form>
  );
}