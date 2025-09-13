import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, User, Mail, Phone, MapPin, Calendar, AlertTriangle } from "lucide-react";
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [userCases, setUserCases] = useState([]);

    useEffect(() => {
        // Mock user data - in a real app, this would come from authentication
        setUser({
            name: "John Doe",
            email: "john@example.com",
            phone: "+91-9876543210",
            user_type: "individual",
            profile_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop&crop=face"
        });

        // Mock user cases
        setUserCases([
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
                created_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                location: { city: "Delhi", state: "Delhi" }
            }
        ]);
    }, []);

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

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="p-8">
                        <Heart className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to HOPEE</h2>
                        <p className="text-gray-600 mb-6">
                            Please log in to view your profile and manage your cases.
                        </p>
                        <Button className="w-full">
                            Login / Register
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
                <Card className="mb-8">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <img
                                src={user.profile_photo}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                            />
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        {user.email}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        {user.phone}
                                    </div>
                                </div>
                                <Badge className="bg-blue-100 text-blue-800">
                                    {user.user_type === 'ngo' ? 'NGO Partner' : 'Individual User'}
                                </Badge>
                            </div>
                            <div className="flex gap-2">
                                <Link to={createPageUrl("ReportCase")}>
                                    <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                                        <Heart className="w-4 h-4 mr-2" />
                                        Report New Case
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* User Cases */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                My Reported Cases
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {userCases.length > 0 ? (
                                <div className="space-y-4">
                                    {userCases.map((caseItem) => (
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
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {caseItem.location.city}, {caseItem.location.state}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(caseItem.created_date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p>No cases reported yet</p>
                                    <Link to={createPageUrl("ReportCase")}>
                                        <Button variant="outline" className="mt-4">
                                            Report Your First Case
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Link to={createPageUrl("ReportCase")} className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Heart className="w-4 h-4 mr-2" />
                                        Report a New Case
                                    </Button>
                                </Link>
                                
                                {user.user_type !== 'ngo' && (
                                    <Link to={createPageUrl("NGORegister")} className="block">
                                        <Button variant="outline" className="w-full justify-start">
                                            <User className="w-4 h-4 mr-2" />
                                            Become an NGO Partner
                                        </Button>
                                    </Link>
                                )}
                                
                                <Link to={createPageUrl("Contact")} className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Contact Support
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}