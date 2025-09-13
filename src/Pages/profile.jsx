
import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Case } from "@/entities/Case";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Loader2, User as UserIcon, AlertCircle, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Added useNavigate

import ProfileHeader from "../components/profile/ProfileHeader";
import CaseListItem from "../components/profile/CaseListItem";
import AdminRequestForm from "../components/profile/AdminRequestForm";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [cases, setCases] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, in_progress: 0, resolved: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialized useNavigate

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const currentUser = await User.me();

                // If user is an NGO, redirect to their dedicated profile page.
                if (currentUser.user_type === 'ngo') {
                    navigate(createPageUrl('NGOProfile'));
                    return; // Stop further execution for NGOs on this page.
                }

                setUser(currentUser);

                const userCases = await Case.filter({ created_by: currentUser.email });
                setCases(userCases);

                // Calculate stats
                const newStats = userCases.reduce((acc, currentCase) => {
                    acc.total++;
                    if (currentCase.status === 'pending') acc.pending++;
                    if (currentCase.status === 'in_progress') acc.in_progress++;
                    if (currentCase.status === 'resolved') acc.resolved++;
                    return acc;
                }, { total: 0, pending: 0, in_progress: 0, resolved: 0 });
                setStats(newStats);

            } catch (e) {
                setError("You need to be logged in to view your profile. Please log in to continue.");
                console.error("Error fetching user profile:", e);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [navigate]); // Added navigate to dependency array

    const handleLogin = async () => {
        await User.loginWithRedirect(window.location.href);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
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
                            <UserIcon className="mr-2 h-4 w-4" /> Log In / Sign Up
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <ProfileHeader user={user} stats={stats} />

                <main className="mt-8 grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <Card className="border-none shadow-xl">
                            <CardHeader>
                                <CardTitle>My Reported Cases</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {cases.length > 0 ? (
                                    <div className="space-y-4">
                                        {cases.map((caseItem) => (
                                            <CaseListItem key={caseItem.id} caseItem={caseItem} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">You haven't reported any cases yet.</h3>
                                        <p className="text-gray-500 mb-6">Your reports will appear here once you submit them.</p>
                                        <Link to={createPageUrl("ReportCase")}>
                                            <Button>Report a Case Now</Button>
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                    <div className="md:col-span-1 space-y-8"> {/* Added space-y-8 for vertical spacing */}
                        {user && user.user_type === 'user' && user.role !== 'admin' && ( // New card for NGO registration
                            <Card className="border-none shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Users /> Become an NGO Partner</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 mb-4">Join our network of verified organizations to make a direct impact in your community.</p>
                                    <Link to={createPageUrl("NGORegister")}>
                                        <Button className="w-full">Start NGO Registration</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                        {user && user.role !== 'admin' && (
                            <Card className="border-none shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Shield /> Admin Access</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <AdminRequestForm user={user} />
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
