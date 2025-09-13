import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

export default function LocationPicker({ location, onLocationChange }) {
    const [manualAddress, setManualAddress] = useState(location?.address || "");

    const handleAddressChange = (e) => {
        const address = e.target.value;
        setManualAddress(address);
        onLocationChange({
            ...location,
            address,
            city: extractCity(address),
            state: extractState(address)
        });
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Reverse geocoding simulation (in real app, you'd use Google Maps API)
                    const mockAddress = `Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

                    onLocationChange({
                        address: mockAddress,
                        latitude,
                        longitude,
                        city: "Current Location",
                        state: "Auto-detected"
                    });

                    setManualAddress(mockAddress);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to get your current location. Please enter the address manually.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const extractCity = (address) => {
        // Simple city extraction - in real app, use proper geocoding
        const parts = address.split(',');
        return parts.length > 1 ? parts[parts.length - 2]?.trim() : "";
    };

    const extractState = (address) => {
        // Simple state extraction - in real app, use proper geocoding
        const parts = address.split(',');
        return parts.length > 2 ? parts[parts.length - 1]?.trim() : "";
    };

    return (
        <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-4">
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter the exact location/address where help is needed"
                            value={manualAddress}
                            onChange={handleAddressChange}
                            className="flex-1"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={getCurrentLocation}
                            className="flex items-center gap-2"
                        >
                            <Navigation className="w-4 h-4" />
                            Use My Location
                        </Button>
                    </div>

                    {location?.latitude && location?.longitude && (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded">
                            <MapPin className="w-4 h-4" />
                            <span>Location captured: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            placeholder="City"
                            value={location?.city || ""}
                            onChange={(e) => onLocationChange({
                                ...location,
                                city: e.target.value
                            })}
                        />
                        <Input
                            placeholder="State"
                            value={location?.state || ""}
                            onChange={(e) => onLocationChange({
                                ...location,
                                state: e.target.value
                            })}
                        />
                    </div>

                    <p className="text-xs text-gray-500">
                        Tip: Use "Use My Location" if you're at the scene, or enter the address manually if reporting from elsewhere.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
