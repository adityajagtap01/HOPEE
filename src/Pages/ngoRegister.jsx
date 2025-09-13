import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Heart, AlertTriangle, CheckCircle } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function NGORegister() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        description: "",
        service_areas: [],
        specializations: [],
        website: "",
        contact_person: ""
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleServiceAreaAdd = (area) => {
        if (area && !formData.service_areas.includes(area)) {
            setFormData(prev => ({
                ...prev,
                service_areas: [...prev.service_areas, area]
            }));
        }
    };

    const handleServiceAreaRemove = (area) => {
        setFormData(prev => ({
            ...prev,
            service_areas: prev.service_areas.filter(a => a !== area)
        }));
    };

    const handleSpecializationToggle = (specialization) => {
        setFormData(prev => ({
            ...prev,
            specializations: prev.specializations.includes(specialization)
                ? prev.specializations.filter(s => s !== specialization)
                : [...prev.specializations, specialization]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Mock NGO registration
            console.log("Registering NGO:", formData);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitted(true);

            // Redirect after 3 seconds
            setTimeout(() => {
                navigate(createPageUrl("Profile"));
            }, 3000);
        } catch (error) {
            setError("Failed to register NGO. Please try again.");
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Submitted!</h2>
                        <p className="text-gray-600 mb-6">
                            Thank you for your interest in becoming an NGO partner. 
                            We'll review your application and get back to you soon.
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
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-white fill-current" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Become an NGO Partner</h1>
                    <p className="text-gray-600 text-lg">
                        Join HOPEE and help us connect those in need with the right assistance
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
                            <Heart className="w-5 h-5" />
                            NGO Registration Form
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Information */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">NGO Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your NGO name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="contact@yourngo.org"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+91-XXXXXXXXXX"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact_person">Contact Person</Label>
                                    <Input
                                        id="contact_person"
                                        placeholder="Name of primary contact"
                                        value={formData.contact_person}
                                        onChange={(e) => handleInputChange("contact_person", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">NGO Description *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your NGO's mission, work, and impact..."
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website (Optional)</Label>
                                <Input
                                    id="website"
                                    type="url"
                                    placeholder="https://yourngo.org"
                                    value={formData.website}
                                    onChange={(e) => handleInputChange("website", e.target.value)}
                                />
                            </div>

                            {/* Service Areas */}
                            <div className="space-y-4">
                                <Label>Service Areas *</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter city or area (e.g., Mumbai, Delhi)"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleServiceAreaAdd(e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                    <Button type="button" variant="outline" onClick={() => {
                                        const input = document.querySelector('input[placeholder*="Enter city"]');
                                        if (input.value) {
                                            handleServiceAreaAdd(input.value);
                                            input.value = '';
                                        }
                                    }}>
                                        Add
                                    </Button>
                                </div>
                                {formData.service_areas.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {formData.service_areas.map((area, index) => (
                                            <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                                {area}
                                                <button
                                                    type="button"
                                                    onClick={() => handleServiceAreaRemove(area)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Specializations */}
                            <div className="space-y-4">
                                <Label>Areas of Expertise *</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {[
                                        'homeless', 'medical', 'elderly', 'abandoned', 
                                        'mental_health', 'food_security', 'other'
                                    ].map((spec) => (
                                        <label key={spec} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={formData.specializations.includes(spec)}
                                                onChange={() => handleSpecializationToggle(spec)}
                                                className="rounded"
                                            />
                                            <span className="text-sm capitalize">
                                                {spec.replace('_', ' ')}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Privacy Notice */}
                            <Alert>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                    <strong>Privacy Notice:</strong> Your information will be used to verify your NGO 
                                    and connect you with relevant cases. We respect your privacy and will not share 
                                    your information with third parties without consent.
                                </AlertDescription>
                            </Alert>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Submitting Registration...
                                        </>
                                    ) : (
                                        <>
                                            <Users className="w-5 h-5 mr-2" />
                                            Submit Registration
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