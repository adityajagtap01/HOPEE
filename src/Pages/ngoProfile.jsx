import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, MapPin, Globe, Heart } from "lucide-react";

export default function NGOProfile() {
    // Mock NGO data
    const ngoData = {
        name: "Hope Foundation",
        email: "contact@hopefoundation.org",
        phone: "+91-9876543210",
        description: "Dedicated to helping homeless individuals and families find shelter, food, and support services. We work across multiple cities to provide immediate assistance to those in need.",
        service_areas: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
        specializations: ["homeless", "food_security", "elderly"],
        website: "https://hopefoundation.org",
        verified: true,
        logo_url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=100&auto=format&fit=crop"
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* NGO Header */}
                <Card className="mb-8">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <img
                                src={ngoData.logo_url}
                                alt="NGO Logo"
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                            />
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">{ngoData.name}</h1>
                                    {ngoData.verified && (
                                        <Badge className="bg-green-100 text-green-800">
                                            ✓ Verified
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        {ngoData.email}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        {ngoData.phone}
                                    </div>
                                    {ngoData.website && (
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-4 h-4" />
                                            <a href={ngoData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                Website
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-700 leading-relaxed">{ngoData.description}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Service Areas */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Service Areas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {ngoData.service_areas.map((area, index) => (
                                    <Badge key={index} className="bg-blue-100 text-blue-800">
                                        {area}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Specializations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="w-5 h-5" />
                                Areas of Expertise
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {ngoData.specializations.map((spec, index) => (
                                    <Badge key={index} className="bg-green-100 text-green-800">
                                        {spec.replace('_', ' ')}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Section */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Get in Touch</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-4">Contact Information</h3>
                                <div className="space-y-2 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        {ngoData.email}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        {ngoData.phone}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Partnership</h3>
                                <p className="text-gray-600 mb-4">
                                    Interested in partnering with this NGO? Contact them directly or reach out to us.
                                </p>
                                <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                                    <Users className="w-4 h-4 mr-2" />
                                    Contact NGO
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}