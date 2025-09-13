
import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { NGO } from "@/entities/NGO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, CheckCircle, Edit, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function NGOProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [ngo, setNgo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [editData, setEditData] = useState({
        name: '',
        description: '',
        service_areas: '',
        phone: '',
        website: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = await User.me();
                if (currentUser.user_type !== 'ngo' || !currentUser.ngo_id) {
                    throw new Error("Access denied. NGO account required.");
                }
                setUser(currentUser);

                const ngoData = await NGO.get(currentUser.ngo_id);
                setNgo(ngoData);
                setEditData({
                    name: ngoData.name || '',
                    description: ngoData.description || '',
                    service_areas: ngoData.service_areas?.join(', ') || '',
                    phone: ngoData.phone || '',
                    website: ngoData.website || ''
                });
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        try {
            await NGO.update(ngo.id, {
                ...editData,
                service_areas: editData.service_areas.split(',').map(s => s.trim()).filter(s => s)
            });

            // Refresh NGO data
            const updatedNgo = await NGO.get(ngo.id);
            setNgo(updatedNgo);
            setIsEditing(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError("Failed to update profile. Please try again.");
        }
        setIsSaving(false);
    };

    const handleSignOut = async () => {
        await User.logout();
        navigate(createPageUrl("Landing"));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-green-600" />
            </div>
        );
    }

    if (error && !ngo) {
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
                        <Button onClick={() => User.login()}>Login as NGO</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Card className="border-none shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl mb-2">{ngo?.name}</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Badge className={`${ngo?.verified ? 'bg-white/20 text-white' : 'bg-yellow-500/20 text-yellow-100'}`}>
                                        {ngo?.verified ? 'Verified NGO' : 'Pending Verification'}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsEditing(!isEditing)}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </Button>
                                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSignOut}>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign Out
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-8">
                        {success && (
                            <Alert className="mb-6 bg-green-50 border-green-200">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">Profile updated successfully!</AlertDescription>
                            </Alert>
                        )}

                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>NGO Name</Label>
                                    {isEditing ? (
                                        <Input
                                            value={editData.name}
                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        />
                                    ) : (
                                        <p className="text-lg font-medium">{ngo?.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Contact Phone</Label>
                                    {isEditing ? (
                                        <Input
                                            value={editData.phone}
                                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                        />
                                    ) : (
                                        <p className="text-lg">{ngo?.phone || 'Not provided'}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                {isEditing ? (
                                    <Textarea
                                        value={editData.description}
                                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                        rows={4}
                                    />
                                ) : (
                                    <p className="text-gray-700">{ngo?.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Service Areas</Label>
                                {isEditing ? (
                                    <Input
                                        value={editData.service_areas}
                                        onChange={(e) => setEditData({ ...editData, service_areas: e.target.value })}
                                        placeholder="Mumbai, Delhi, Bangalore"
                                    />
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {ngo?.service_areas?.map((area, index) => (
                                            <Badge key={index} variant="outline">{area}</Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Website</Label>
                                {isEditing ? (
                                    <Input
                                        value={editData.website}
                                        onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-lg">{ngo?.website ? (
                                        <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            {ngo.website}
                                        </a>
                                    ) : 'Not provided'}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Contact Email</Label>
                                <p className="text-lg">{ngo?.email}</p>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end gap-3 pt-4 border-t">
                                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave} disabled={isSaving}>
                                        {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
            );
}


}