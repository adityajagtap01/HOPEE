import React, { useState } from "react";
import { Case } from "@/entities/Case";
import { User } from "@/entities/User";
import { UploadFile } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Camera, Upload, Heart, AlertTriangle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import LocationPicker from "../Components/case/locationPicker.jsx";
import PhotoUpload from "../Components/case/photoUpload.jsx";

export default function ReportCase() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        priority: "medium",
        location: {
            address: "",
            latitude: null,
            longitude: null,
            city: "",
            state: ""
        },
        contact_phone: "",
        photo_url: ""
    });

    React.useEffect(() => {
        loadCurrentUser();
    }, []);

    const loadCurrentUser = async () => {
        try {
            const user = await User.me();
            setCurrentUser(user);
        } catch (error) {
            // User not logged in - that's okay, they can still submit
            console.log("User not logged in");
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleLocationChange = (location) => {
        setFormData(prev => ({
            ...prev,
            location
        }));
    };

    const handlePhotoUpload = (photoUrl) => {
        setFormData(prev => ({
            ...prev,
            photo_url: photoUrl
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await Case.create(formData);
            setSubmitted(true);

            // Redirect after 3 seconds
            setTimeout(() => {
                navigate(createPageUrl("Profile"));
            }, 3000);
        } catch (error) {
            setError("Failed to submit case. Please try again.");
        }

        setIsSubmitting(false);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md text-center border-none shadow-xl">
                    <CardContent className="p-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Case Submitted Successfully!</h2>
                        <p className="text-gray-600 mb-6">
                            Thank you for caring. We've notified relevant NGOs in the area.
                            You'll be redirected to your profile shortly.
                        </p>
                        <div className="animate-pulse text-blue-600">
                            Redirecting...
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-white fill-current" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Someone in Need</h1>
                    <p className="text-gray-600 text-lg">
                        Help us connect those in need with organizations that can help
                    </p>
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Card className="border-none shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Case Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Information */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Case Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="Brief description of the situation"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => handleInputChange("category", value)}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="homeless">Homeless Individual</SelectItem>
                                            <SelectItem value="medical">Medical Emergency</SelectItem>
                                            <SelectItem value="elderly">Elderly in Need</SelectItem>
                                            <SelectItem value="abandoned">Abandoned Person</SelectItem>
                                            <SelectItem value="mental_health">Mental Health Crisis</SelectItem>
                                            <SelectItem value="food_security">Food Insecurity</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Detailed Description *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Please provide detailed information about the situation, person's condition, immediate needs, etc."
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="priority">Priority Level</Label>
                                    <Select
                                        value={formData.priority}
                                        onValueChange={(value) => handleInputChange("priority", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low - Can wait</SelectItem>
                                            <SelectItem value="medium">Medium - Important</SelectItem>
                                            <SelectItem value="high">High - Urgent</SelectItem>
                                            <SelectItem value="urgent">Urgent - Immediate attention needed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Your Contact Phone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Optional - for follow-up"
                                        value={formData.contact_phone}
                                        onChange={(e) => handleInputChange("contact_phone", e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-4">
                                <Label>Location *</Label>
                                <LocationPicker
                                    location={formData.location}
                                    onLocationChange={handleLocationChange}
                                />
                            </div>

                            {/* Photo Upload */}
                            <div className="space-y-4">
                                <Label>Photo (Optional)</Label>
                                <PhotoUpload
                                    onPhotoUpload={handlePhotoUpload}
                                    currentPhoto={formData.photo_url}
                                />
                            </div>

                            {/* Privacy Notice */}
                            <Alert>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                    <strong>Privacy Notice:</strong> This report will be shared with verified NGOs
                                    in the area. Personal information will be handled confidentially and only used
                                    to provide assistance.
                                </AlertDescription>
                            </Alert>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Submitting Report...
                                        </>
                                    ) : (
                                        <>
                                            <Heart className="w-5 h-5 mr-2 fill-current" />
                                            Submit Report
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}