import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User } from '@/entities/User';
import { createPageUrl } from '@/utils';
import { UserPlus, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NGORegister() {
    const navigate = useNavigate();

    const handleRegisterClick = async () => {
        try {
            // Check if user is already logged in
            await User.me();
            // If logged in, go directly to create the profile
            navigate(createPageUrl('CreateNGOProfile'));
        } catch (error) {
            // If not logged in, start the login flow with a redirect to the profile creation page
            await User.loginWithRedirect(
                `${window.location.origin}${createPageUrl('CreateNGOProfile')}`
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-lg text-center shadow-2xl border-none">
                <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <UserPlus className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-3xl">Become an NGO Partner</CardTitle>
                    <CardDescription className="text-lg text-gray-600 pt-2">
                        Join our network of verified organizations and make a direct impact.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-8 pb-8">
                    <div className="text-left space-y-4 text-gray-700">
                        <p className="flex items-start">
                            <Heart className="w-5 h-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                            Receive real-time alerts for cases reported in your service areas.
                        </p>
                        <p className="flex items-start">
                            <Heart className="w-5 h-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                            Manage and update the status of cases you're handling.
                        </p>
                        <p className="flex items-start">
                            <Heart className="w-5 h-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                            Be part of a community dedicated to effective, immediate help.
                        </p>
                    </div>
                    <div className="border-t pt-6">
                        <h3 className="font-semibold text-xl mb-4">Registration Process</h3>
                        <ol className="text-left text-gray-600 list-decimal list-inside space-y-2">
                            <li>Click the button below to sign up or log in to a HOPEE account.</li>
                            <li>You'll be redirected to complete your NGO profile.</li>
                            <li>Our admin team will review and verify your application.</li>
                        </ol>
                    </div>
                    <Button onClick={handleRegisterClick} className="w-full py-6 text-lg mt-4">
                        Start NGO Registration <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}