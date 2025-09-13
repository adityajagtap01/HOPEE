import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { NGO } from '@/entities/NGO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CreateNGOProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        service_areas: '',
        phone: '',
        website: ''
    });

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await User.me();
                setUser(currentUser);
                if (currentUser.ngo_id) {
                    // If user is already an NGO, redirect them to their dashboard
                    navigate(createPageUrl('NGODashboard'));
                }
            } catch (err) {
                // Not logged in, redirect to NGO registration start page
                navigate(createPageUrl('NGORegister'));
            }
            setIsLoading(false);
        };
        checkUser();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            // 1. Create the NGO record
            const newNgo = await NGO.create({
                ...formData,
                email: user.email,
                service_areas: formData.service_areas.split(',').map(s => s.trim()),
            });

            // 2. Update the user record with the NGO ID and user type
            await User.updateMyUserData({
                user_type: 'ngo',
                ngo_id: newNgo.id,
            });

            // Success! Show a success message and then redirect.
            setError('success');

            setTimeout(() => {
                navigate(createPageUrl('NGODashboard'));
            }, 3000);

        } catch (err) {
            setError('Failed to create NGO profile. Please check your information and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-10 h-10 animate-spin" /></div>;
    }

    if (error === 'success') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="p-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
                        <p className="text-gray-600">Your NGO profile has been submitted for verification. You will be redirected to your dashboard.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Create Your NGO Profile</CardTitle>
                    <CardDescription>
                        You're almost there! Please provide the following details about your organization.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">NGO Name</Label>
                            <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required placeholder="What is your NGO's mission?" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="service_areas">Service Areas (Cities, comma-separated)</Label>
                            <Input id="service_areas" value={formData.service_areas} onChange={e => setFormData({ ...formData, service_areas: e.target.value })} required placeholder="e.g., Mumbai, Delhi, Bangalore" />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Contact Phone</Label>
                                <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Website (optional)</Label>
                                <Input id="website" type="url" value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} placeholder="https://your-ngo.org" />
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Submit for Verification
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}