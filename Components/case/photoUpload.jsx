import React, { useState } from "react";
import { UploadFile } from "@/integrations/Core";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X, Image } from "lucide-react";

export default function PhotoUpload({ onPhotoUpload, currentPhoto }) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileUpload = async (file) => {
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            // Simulate upload progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + 20, 90));
            }, 100);

            const { file_url } = await UploadFile({ file });

            clearInterval(progressInterval);
            setUploadProgress(100);

            onPhotoUpload(file_url);
        } catch (error) {
            console.error("Error uploading photo:", error);
            alert("Failed to upload photo. Please try again.");
        }

        setIsUploading(false);
        setUploadProgress(0);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleCameraCapture = () => {
        // For mobile devices, this will open the camera
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'camera';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                handleFileUpload(file);
            }
        };
        input.click();
    };

    const removePhoto = () => {
        onPhotoUpload("");
    };

    return (
        <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-4">
                {currentPhoto ? (
                    <div className="relative">
                        <img
                            src={currentPhoto}
                            alt="Uploaded"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={removePhoto}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        {isUploading ? (
                            <div className="space-y-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="text-sm text-gray-600">Uploading photo...</p>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Image className="w-12 h-12 text-gray-400 mx-auto" />
                                <p className="text-gray-600 mb-4">
                                    Add a photo to help NGOs understand the situation better
                                </p>

                                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCameraCapture}
                                        className="flex items-center gap-2"
                                    >
                                        <Camera className="w-4 h-4" />
                                        Take Photo
                                    </Button>

                                    <label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex items-center gap-2"
                                            asChild
                                        >
                                            <span>
                                                <Upload className="w-4 h-4" />
                                                Upload Photo
                                            </span>
                                        </Button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                <p className="text-xs text-gray-500">
                                    Photos help NGOs better understand the situation and respond appropriately
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}