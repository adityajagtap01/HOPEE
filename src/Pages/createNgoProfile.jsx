import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart } from "lucide-react";

export default function CreateNGOProfile() {
    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Card className="text-center">
                    <CardContent className="p-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8 text-white fill-current" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create NGO Profile</h1>
                        <p className="text-gray-600 text-lg mb-8">
                            This feature is coming soon! You'll be able to create and manage your NGO profile here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                                <Heart className="w-4 h-4 mr-2" />
                                Get Notified
                            </Button>
                            <Button variant="outline">
                                Learn More
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}