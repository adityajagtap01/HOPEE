import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Users, MapPin, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import CaseCard from "../Components/ngo/caseCard.jsx";

export default function NGODashboard() {
    const [cases, setCases] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        loadCases();
    }, []);

    const loadCases = async () => {
        // Mock cases data - in a real app, this would come from an API
        const mockCases = [
            {
                id: "case_1",
                title: "Elderly person needs medical assistance",
                description: "Found an elderly person on the street who appears to be in distress and needs immediate medical attention.",
                category: "elderly",
                priority: "high",
                status: "pending",
                location: {
                    address: "123 Main Street, Downtown",
                    city: "Mumbai",
                    state: "Maharashtra"
                },
                photo_url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=400&auto=format&fit=crop",
                contact_phone: "+91-9876543210",
                created_date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                created_by: "reporter@example.com"
            },
            {
                id: "case_2",
                title: "Homeless family needs shelter",
                description: "A family with two children is sleeping on the street and needs immediate shelter and food.",
                category: "homeless",
                priority: "urgent",
                status: "in_progress",
                location: {
                    address: "456 Park Avenue, Central",
                    city: "Delhi",
                    state: "Delhi"
                },
                photo_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop",
                contact_phone: "+91-9876543211",
                created_date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                created_by: "reporter2@example.com"
            },
            {
                id: "case_3",
                title: "Food distribution needed",
                description: "Several people in the area are going hungry and need food assistance.",
                category: "food_security",
                priority: "medium",
                status: "resolved",
                location: {
                    address: "789 Market Street, Old City",
                    city: "Bangalore",
                    state: "Karnataka"
                },
                photo_url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=400&auto=format&fit=crop",
                contact_phone: "+91-9876543212",
                created_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                created_by: "reporter3@example.com"
            }
        ];

        setCases(mockCases);
    };

    const handleStatusUpdate = async (caseId, newStatus) => {
        try {
            // Mock status update
            console.log(`Updating case ${caseId} to ${newStatus}`);
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setCases(prevCases =>
                prevCases.map(case_ =>
                    case_.id === caseId ? { ...case_, status: newStatus } : case_
                )
            );
        } catch (error) {
            console.error("Error updating case status:", error);
        }
    };

    const filteredCases = cases.filter(case_ => {
        if (filter === "all") return true;
        return case_.status === filter;
    });

    const stats = {
        total: cases.length,
        pending: cases.filter(c => c.status === "pending").length,
        in_progress: cases.filter(c => c.status === "in_progress").length,
        resolved: cases.filter(c => c.status === "resolved").length
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">NGO Dashboard</h1>
                    <p className="text-gray-600">Manage and track cases assigned to your organization</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <AlertTriangle className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Cases</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                                    <p className="text-sm font-medium text-gray-600">Pending</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.in_progress}</p>
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
                                    <p className="text-sm font-medium text-gray-600">Resolved</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter and Cases */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Assigned Cases</CardTitle>
                            <Select value={filter} onValueChange={setFilter}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Cases</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {filteredCases.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCases.map((caseItem) => (
                                    <CaseCard
                                        key={caseItem.id}
                                        caseItem={caseItem}
                                        onStatusUpdate={handleStatusUpdate}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No cases found</h3>
                                <p className="text-gray-600">
                                    {filter === "all" 
                                        ? "No cases have been assigned to your organization yet."
                                        : `No cases with status "${filter}" found.`
                                    }
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}