"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  DollarSign,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Download,
  FileText,
  AlertCircle
} from "lucide-react";

// Mock data
const mockPayments = [
  {
    id: 1,
    playerName: "John Smith",
    teamName: "Lightning Bolts",
    description: "Monthly Registration Fee",
    amount: 150,
    dueDate: "2025-02-01",
    status: "paid",
    paidDate: "2025-01-20",
    method: "credit_card"
  },
  {
    id: 2,
    playerName: "Emma Johnson",
    teamName: "Lightning Bolts",
    description: "Monthly Registration Fee",
    amount: 150,
    dueDate: "2025-02-01",
    status: "pending",
    paidDate: null,
    method: null
  },
  {
    id: 3,
    playerName: "Michael Brown",
    teamName: "Thunder Hawks",
    description: "Tournament Entry Fee",
    amount: 75,
    dueDate: "2025-01-15",
    status: "overdue",
    paidDate: null,
    method: null
  },
  {
    id: 4,
    playerName: "Sarah Wilson",
    teamName: "Fire Dragons",
    description: "Equipment Fee",
    amount: 50,
    dueDate: "2025-01-30",
    status: "paid",
    paidDate: "2025-01-18",
    method: "bank_transfer"
  },
  {
    id: 5,
    playerName: "David Lee",
    teamName: "Thunder Hawks",
    description: "Monthly Registration Fee",
    amount: 150,
    dueDate: "2025-02-01",
    status: "pending",
    paidDate: null,
    method: null
  }
];

const mockTransactionStats = {
  monthlyRevenue: 12450,
  yearlyRevenue: 89320,
  averagePayment: 125,
  collectionRate: 87
};

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch payments data with mock implementation
  const { data: payments = mockPayments, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockPayments;
    }
  });

  // Fetch transaction stats
  const { data: stats = mockTransactionStats } = useQuery({
    queryKey: ["payment-stats"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTransactionStats;
    }
  });

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = 
      payment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.playerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.teamName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "paid": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "overdue": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const totalStats = {
    totalRevenue: payments.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: payments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0),
    overdueAmount: payments.filter(p => p.status === "overdue").reduce((sum, p) => sum + p.amount, 0),
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600">Track fees, registrations, and fundraising</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowPaymentForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Payment Request
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalStats.totalRevenue)}</p>
                  <p className="text-xs text-gray-600">Total Revenue</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-4">
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalStats.pendingAmount)}</p>
                  <p className="text-xs text-gray-600">Pending Payments</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {payments.filter(p => p.status === "pending").length} payments pending
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalStats.overdueAmount)}</p>
                  <p className="text-xs text-gray-600">Overdue Amount</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-red-600">
                  {payments.filter(p => p.status === "overdue").length} payments overdue
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.collectionRate}%</p>
                  <p className="text-xs text-gray-600">Collection Rate</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">This month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="pt-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={statusFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter("all")}
                    >
                      All Status
                    </Button>
                    <Button
                      variant={statusFilter === "paid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter("paid")}
                    >
                      Paid
                    </Button>
                    <Button
                      variant={statusFilter === "pending" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter("pending")}
                    >
                      Pending
                    </Button>
                    <Button
                      variant={statusFilter === "overdue" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter("overdue")}
                    >
                      Overdue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payments List */}
            {isLoading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading payments...</p>
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPayments.map((payment) => (
                          <tr key={payment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{payment.playerName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{payment.teamName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{payment.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">
                                {new Date(payment.dueDate).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={`${getStatusColor(payment.status)} flex items-center space-x-1 w-fit`}>
                                {getStatusIcon(payment.status)}
                                <span>{payment.status}</span>
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {payment.status === "pending" && (
                                <Button variant="ghost" size="sm">
                                  Send Reminder
                                </Button>
                              )}
                              <Button variant="ghost" size="sm">
                                View
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

          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Transaction history will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Revenue chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Payment method breakdown will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Form Modal */}
      <Dialog open={showPaymentForm} onOpenChange={setShowPaymentForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Payment Request</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-gray-600">Payment form will be implemented here</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}