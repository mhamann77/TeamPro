'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async () => {
    await login('demo@teampro.com', 'demo123');
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to TeamPro
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your Complete Youth Sports Management Platform
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={handleLogin}>Login to Demo</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Organize rosters, track player info, and manage communications
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Smart Scheduling</CardTitle>
              <CardDescription>
                AI-powered scheduling with conflict detection and optimization
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Track stats, analyze performance, and monitor player development
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Safety First</CardTitle>
              <CardDescription>
                Equipment tracking, compliance management, and safety protocols
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Platform Features</CardTitle>
            <CardDescription>Everything you need to manage youth sports teams effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Core Features</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Player and roster management</li>
                  <li>• Practice and game scheduling</li>
                  <li>• Team communications</li>
                  <li>• Parent portal access</li>
                  <li>• Equipment tracking</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Advanced Features</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• AI-powered performance analytics</li>
                  <li>• Video analysis and highlights</li>
                  <li>• Skills development tracking</li>
                  <li>• Automated scheduling optimization</li>
                  <li>• Multi-language support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}