import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, AlertTriangle, CheckCircle, Clock, Heart } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalCases: 0,
        pendingCases: 0,
        resolvedCases: 0,
        totalNGOs: 0,
        verifiedNGOs: 0,
        pendingVerifications: 0
    });

    const [recentCases, setRecentCases] = useState([]);
    const [pendingNGOs, setPendingNGOs] = useState([]);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        // Mock data - in a real app, this would come from APIs
        setStats({
            totalCases: 156,
            pendingCases: 23,
            resolvedCases: 98,
            totalNGOs: 45,
            verifiedNGOs: 38,
            pendingVerifications: 7
        });

        setRecentCases([
            {
                id: "case_1",
                title: "Elderly person needs medical assistance",
                status: "pending",
                priority: "high",
                created_date: new Date().toISOString(),
                location: { city: "Mumbai", state: "Maharashtra" }
            },
            {
                id: "case_2",
                title: "Homeless family needs shelter",
                status: "in_progress",
                priority: "urgent",
                created_date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                location: { city: "Delhi", state: "Delhi" }
            }
        ]);

        setPendingNGOs([
            {
                id: "ngo_1",
                name: "New Hope Foundation",
                email: "contact@newhope.org",
                submitted_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: "ngo_2",
                name: "Community Care Center",
                email: "info@communitycare.org",
                submitted_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            }
        ]);
    };

    const handleVerifyNGO = async (ngoId) => {
        // Mock verification
        console.log(`Verifying NGO: ${ngoId}`);
        setPendingNGOs(prev => prev.filter(ngo => ngo.id !== ngoId));
    };

    const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        in_progress: "bg-blue-100 text-blue-800",
        resolved: "bg-green-100 text-green-800"
    };

    const priorityColors = {
        low: "bg-gray-100 text-gray-800",
        medium: "bg-yellow-100 text-yellow-800",
        high: "bg-orange-100 text-orange-800",
        urgent: "bg-red-100 text-red-800"
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Monitor and manage the HOPEE platform</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <AlertTriangle className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Cases</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalCases}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Clock className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Pending Cases</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.pendingCases}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Resolved Cases</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.resolvedCases}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Users className="w-6 h-6 text-purple-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total NGOs</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalNGOs}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Shield className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Verified NGOs</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.verifiedNGOs}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Heart className="w-6 h-6 text-orange-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Pending Verifications</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.pendingVerifications}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Cases */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Cases</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentCases.map((caseItem) => (
                                    <div key={caseItem.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-gray-900">{caseItem.title}</h3>
                                            <div className="flex gap-2">
                                                <Badge className={statusColors[caseItem.status]}>
                                                    {caseItem.status.replace("_", " ")}
                                                </Badge>
                                                <Badge className={priorityColors[caseItem.priority]}>
                                                    {caseItem.priority}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <div className="flex items-center gap-4">
                                                <span>{caseItem.location.city}, {caseItem.location.state}</span>
                                                <span>{new Date(caseItem.created_date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending NGO Verifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending NGO Verifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {pendingNGOs.map((ngo) => (
                                    <div key={ngo.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{ngo.name}</h3>
                                                <p className="text-sm text-gray-600">{ngo.email}</p>
                                            </div>
                                            <Badge className="bg-orange-100 text-orange-800">
                                                Pending
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-3">
                                            Submitted: {new Date(ngo.submitted_date).toLocaleDateString()}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button 
                                                size="sm" 
                                                className="bg-green-500 hover:bg-green-600"
                                                onClick={() => handleVerifyNGO(ngo.id)}
                                            >
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Verify
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                Review
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}