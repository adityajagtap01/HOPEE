import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Case } from "@/entities/Case";
import { NGO } from "@/entities/NGO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, User as UserIcon, Map as MapIcon, List, Edit, LogOut } from "lucide-react";
import CaseCard from "../components/ngo/CaseCard";
import NGOMapView from "../components/ngo/NGOMapView";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function NGODashboard() {
    const [user, setUser] = useState(null);
    const [ngo, setNgo] = useState(null);
    const [cases, setCases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('list'); // 'list' or 'map'

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const currentUser = await User.me();
                if (currentUser.user_type !== 'ngo' || !currentUser.ngo_id) {
                    throw new Error("You are not registered as an NGO. This page is for verified NGO partners only.");
                }
                setUser(currentUser);

                const ngoData = await NGO.get(currentUser.ngo_id);
                setNgo(ngoData);

                if (!ngoData.verified) {
                    throw new Error("Your NGO account is pending verification by an administrator. Please check back later.");
                }

                // Fetch all cases and filter by service area on the frontend
                const allCases = await Case.list();
                const relevantCases = allCases.filter(c =>
                    ngoData.service_areas.includes(c.location?.city)
                );
                setCases(relevantCases);

            } catch (e) {
                setError(e.message || "An error occurred while loading the dashboard.");
                console.error("Error fetching NGO dashboard:", e);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const handleStatusUpdate = async (caseId, newStatus) => {
        try {
            await Case.update(caseId, { status: newStatus });
            setCases(prevCases =>
                prevCases.map(c =>
                    c.id === caseId ? { ...c, status: newStatus } : c
                )
            );
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleSignOut = async () => {
        await User.logout();
        window.location.href = createPageUrl("Landing");
    };

    const handleLogin = async () => {
        await User.loginWithRedirect(window.location.href);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-green-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20 px-4">
                <Card className="shadow-lg">
                    <CardHeader>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <CardTitle>Access Denied</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AlertDescription className="text-lg text-gray-600 mb-6">{error}</AlertDescription>
                        <Button onClick={handleLogin}>
                            <UserIcon className="mr-2 h-4 w-4" /> Log In
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const pendingCases = cases.filter(c => c.status !== 'resolved');
    const resolvedCases = cases.filter(c => c.status === 'resolved');

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
                            <p className="text-lg text-gray-600">Welcome, {ngo.name}</p>
                        </div>
                        <div className="flex gap-3">
                            <Link to={createPageUrl("NGOProfile")}>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </Link>
                            <Button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-white">
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <div className='flex flex-col'>
                        <p className="text-gray-700">
                            Found <strong>{cases.length}</strong> total cases in your service areas.
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            <span className='text-sm text-gray-500'>Monitoring:</span>
                            {ngo.service_areas?.map(area => (
                                <Badge key={area} variant="secondary">{area}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant={view === 'list' ? 'default' : 'outline'} onClick={() => setView('list')}>
                            <List className="mr-2 h-4 w-4" /> List View
                        </Button>
                        <Button variant={view === 'map' ? 'default' : 'outline'} onClick={() => setView('map')}>
                            <MapIcon className="mr-2 h-4 w-4" /> Map View
                        </Button>
                    </div>
                </div>

                {view === 'list' ? (
                    <div className="space-y-8">
                        {/* Pending Cases Section */}
                        <div>
                            <Card className="shadow-xl">
                                <CardHeader className="bg-yellow-50 border-b">
                                    <CardTitle className="text-xl text-yellow-800 flex items-center gap-2">
                                        🔄 Pending Cases ({pendingCases.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {pendingCases.length > 0 ? (
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {pendingCases.map(caseItem => (
                                                <CaseCard key={caseItem.id} caseItem={caseItem} onStatusUpdate={handleStatusUpdate} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <p>No pending cases in your service areas.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Resolved Cases Section */}
                        <div>
                            <Card className="shadow-xl">
                                <CardHeader className="bg-green-50 border-b">
                                    <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                                        ✅ Resolved Cases ({resolvedCases.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {resolvedCases.length > 0 ? (
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {resolvedCases.map(caseItem => (
                                                <CaseCard key={caseItem.id} caseItem={caseItem} onStatusUpdate={handleStatusUpdate} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <p>No resolved cases yet. Keep up the great work!</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <Card className="shadow-xl">
                        <CardContent className="p-0 h-[600px]">
                            <NGOMapView cases={cases} />
                        </CardContent>
                    </Card>
                )}

                {cases.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No cases right now.</h3>
                        <p className="text-gray-500">We'll notify you when a new case is reported in your area.</p>
                    </div>
                )}
            </div>
        </div>
    );
}