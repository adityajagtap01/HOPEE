
import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { NGO } from "@/entities/NGO";
import { Case } from "@/entities/Case";
import { AdminRequest } from "@/entities/AdminRequest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Shield, Check, X, FileText, Users, PieChart as PieChartIcon, Clock, CheckCircle, BarChart3 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [ngos, setNgos] = useState([]);
    const [cases, setCases] = useState([]);
    const [adminRequests, setAdminRequests] = useState([]);
    const [stats, setStats] = useState({ totalCases: 0, totalNgos: 0, pendingNgos: 0, resolvedCases: 0, pendingCases: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const currentUser = await User.me();
                if (currentUser.role !== 'admin') {
                    throw new Error("You do not have administrative privileges to view this page.");
                }
                setUser(currentUser);

                const [allNgos, allCases, allAdminRequests] = await Promise.all([
                    NGO.list(),
                    Case.list(),
                    AdminRequest.filter({ status: 'pending' })
                ]);
                setNgos(allNgos);
                setCases(allCases);
                setAdminRequests(allAdminRequests);

                setStats({
                    totalCases: allCases.length,
                    totalNgos: allNgos.length,
                    pendingNgos: allNgos.filter(n => !n.verified).length,
                    resolvedCases: allCases.filter(c => c.status === 'resolved').length,
                    pendingCases: allCases.filter(c => c.status === 'pending').length,
                });

            } catch (e) {
                setError(e.message || "An error occurred while loading the admin dashboard.");
                console.error("Error fetching admin data:", e);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const handleVerifyNgo = async (ngoId, isVerified) => {
        try {
            await NGO.update(ngoId, { verified: isVerified });
            setNgos(prev => prev.map(n => n.id === ngoId ? { ...n, verified: isVerified } : n));
        } catch (error) {
            console.error("Failed to update NGO status", error);
        }
    };

    const handleApproveAdminRequest = async (request) => {
        try {
            await AdminRequest.update(request.id, { status: 'approved' });
            setAdminRequests(prev => prev.filter(r => r.id !== request.id));
            alert(`Request for ${request.user_name} approved. IMPORTANT: This user must now be manually promoted to 'admin' role in the user management settings to gain actual admin access.`);
        } catch (error) {
            console.error("Failed to approve admin request", error);
        }
    };

    const handleLogin = async () => {
        await User.loginWithRedirect(window.location.href);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-red-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20 px-4">
                <Card className="shadow-lg">
                    <CardHeader>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-red-600" />
                        </div>
                        <CardTitle>Admin Access Only</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AlertDescription className="text-lg text-gray-600 mb-6">{error}</AlertDescription>
                        <Button onClick={handleLogin}>Admin Login</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Chart data
    const pieChartData = [
        { name: 'Resolved', value: stats.resolvedCases, color: '#10B981' },
        { name: 'In Progress', value: cases.filter(c => c.status === 'in_progress').length, color: '#3B82F6' },
        { name: 'Pending', value: stats.pendingCases, color: '#F59E0B' }
    ];

    const barChartData = [
        { name: 'Total Cases', value: stats.totalCases },
        { name: 'Resolved', value: stats.resolvedCases },
        { name: 'Pending', value: stats.pendingCases },
        { name: 'Total NGOs', value: stats.totalNgos }
    ];

    const successRate = stats.totalCases > 0 ? Math.round((stats.resolvedCases / stats.totalCases) * 100) : 0;

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-lg text-gray-600">Platform Overview & Management</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Logged in as</p>
                            <p className="font-semibold">{user?.full_name}</p>
                            <Badge className="bg-red-100 text-red-800">Admin</Badge>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={FileText} label="Total Cases" value={stats.totalCases} />
                    <StatCard icon={Users} label="Total NGOs" value={stats.totalNgos} />
                    <StatCard icon={Clock} label="Pending NGOs" value={stats.pendingNgos} color="bg-yellow-500" />
                    <StatCard icon={CheckCircle} label="Resolution Rate" value={`${successRate}%`} color="bg-green-500" />
                </div>

                {/* Charts Section */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PieChartIcon className="w-5 h-5" />
                                Case Status Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                Platform Statistics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#3B82F6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mt-8">
                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle>Manage NGOs ({ngos.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>NGO Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ngos.map(ngo => (
                                        <TableRow key={ngo.id}>
                                            <TableCell>
                                                <div className="font-medium">{ngo.name}</div>
                                                <div className="text-sm text-gray-500">{ngo.email}</div>
                                                <div className="text-xs text-gray-400">{ngo.service_areas?.join(', ')}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={ngo.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                                    {ngo.verified ? 'Verified' : 'Pending'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {!ngo.verified ? (
                                                    <Button size="sm" onClick={() => handleVerifyNgo(ngo.id, true)}>
                                                        <Check className="mr-1 h-3 w-3" /> Verify
                                                    </Button>
                                                ) : (
                                                    <Button size="sm" variant="outline" onClick={() => handleVerifyNgo(ngo.id, false)}>
                                                        <X className="mr-1 h-3 w-3" /> Remove
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {ngos.length === 0 && <TableRow><TableCell colSpan={3} className="text-center">No NGOs registered</TableCell></TableRow>}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle>Admin Access Requests ({adminRequests.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Reason</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {adminRequests.map(req => (
                                        <TableRow key={req.id}>
                                            <TableCell>
                                                <div className="font-medium">{req.user_name}</div>
                                                <div className="text-sm text-gray-500">{req.user_email}</div>
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <p className="text-sm truncate" title={req.reason}>{req.reason}</p>
                                            </TableCell>
                                            <TableCell>
                                                <Button size="sm" onClick={() => handleApproveAdminRequest(req)}>
                                                    <Check className="mr-1 h-3 w-3" /> Approve
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {adminRequests.length === 0 && <TableRow><TableCell colSpan={3} className="text-center text-gray-500">No pending requests</TableCell></TableRow>}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const StatCard = ({ icon: Icon, label, value, color = "bg-blue-500" }) => (
    <Card className="shadow-lg">
        <CardContent className="p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </CardContent>
    </Card>
);
