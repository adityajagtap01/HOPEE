import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from '@/entities/User';
import { createPageUrl } from "@/utils";
import { Heart, Users, Shield, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        User.me().then(setUser).catch(() => setUser(null));
    }, [location.pathname]);

    const isLandingPage = currentPageName === "Landing";

    if (isLandingPage) {
        return (
            <div className="min-h-screen bg-white">
                {children}
            </div>
        );
    }

    const subtleBgStyle = {
        backgroundColor: '#f9fafb',
        backgroundImage: `radial-gradient(#dbeafe 0.7px, #f9fafb 0.7px)`,
        backgroundSize: '20px 20px',
    };

    const handleLogin = () => User.login();

    return (
        <div className="min-h-screen" style={subtleBgStyle}>
            {/* Navigation Header */}
            <header className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to={createPageUrl("Landing")} className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white fill-current" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">HOPEE</h1>
                                <p className="text-xs text-gray-500 -mt-1">Small Acts, Big Impact</p>
                            </div>
                        </Link>

                        <nav className="hidden md:flex items-center gap-6">
                            <Link
                                to={createPageUrl("ReportCase")}
                                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                            >
                                Report Now
                            </Link>

                            {/* Show NGO Register to all logged in users who are not already NGOs */}
                            {user && user.user_type !== 'ngo' && (
                                <Link
                                    to={createPageUrl("NGORegister")}
                                    className="text-gray-600 hover:text-green-600 transition-colors font-medium"
                                >
                                    <Users className="w-4 h-4 inline-block mr-1" />
                                    Become an NGO
                                </Link>
                            )}

                            {/* Show NGO Dashboard only to NGO users */}
                            {user?.user_type === 'ngo' && (
                                <Link
                                    to={createPageUrl("NGODashboard")}
                                    className="text-gray-600 hover:text-green-600 transition-colors font-medium"
                                >
                                    <Users className="w-4 h-4 inline-block mr-1" />
                                    NGO Dashboard
                                </Link>
                            )}

                            {/* Show Admin Dashboard only to admin users */}
                            {user?.role === 'admin' && (
                                <Link
                                    to={createPageUrl("AdminDashboard")}
                                    className="text-gray-600 hover:text-red-600 transition-colors font-medium"
                                >
                                    <Shield className="w-4 h-4 inline-block mr-1" />
                                    Admin Dashboard
                                </Link>
                            )}

                            <Link
                                to={createPageUrl("Contact")}
                                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                            >
                                Contact
                            </Link>
                        </nav>

                        <div className="flex items-center gap-2">
                            {user ? (
                                <Link to={createPageUrl("Profile")}>
                                    <Button variant="outline">
                                        <img src={user.profile_photo || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&auto=format&fit=crop&crop=face`} alt="profile" className="w-6 h-6 rounded-full mr-2" />
                                        My Profile
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Button variant="ghost" onClick={handleLogin}>
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Login
                                    </Button>
                                    <Link to={createPageUrl("NGORegister")}>
                                        <Button>
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            NGO Register
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Heart className="w-6 h-6 text-blue-400 fill-current" />
                                <span className="text-xl font-bold">HOPEE</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Helping Out People Everywhere Effectively. Together, we can make a difference.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Quick Links</h3>
                            <div className="space-y-2 text-sm">
                                <Link to={createPageUrl("Landing")} className="block text-gray-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                                <Link to={createPageUrl("ReportCase")} className="block text-gray-400 hover:text-white transition-colors">
                                    Report Case
                                </Link>
                                <Link to={createPageUrl("NGORegister")} className="block text-gray-400 hover:text-white transition-colors">
                                    NGO Registration
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Contact Info</h3>
                            <div className="space-y-2 text-sm text-gray-400">
                                <p>support@hopee.org</p>
                                <p>+91-XXXXXXXXXX</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <div className="space-y-2 text-sm">
                                <Link to={createPageUrl("Contact")} className="block text-gray-400 hover:text-white transition-colors">
                                    Support
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; 2024 HOPEE. All rights reserved. Made with ❤️ for humanity.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}