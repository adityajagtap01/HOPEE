import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, CheckCircle, MapPin, Calendar } from "lucide-react";
import { format } from 'date-fns';

export default function CaseListItem({ caseItem }) {
    const statusConfig = {
        pending: {
            icon: <Clock className="w-4 h-4" />,
            color: "bg-yellow-100 text-yellow-800 border-yellow-200",
            label: "Pending",
        },
        in_progress: {
            icon: <Users className="w-4 h-4" />,
            color: "bg-blue-100 text-blue-800 border-blue-200",
            label: "In Progress",
        },
        resolved: {
            icon: <CheckCircle className="w-4 h-4" />,
            color: "bg-green-100 text-green-800 border-green-200",
            label: "Resolved",
        },
    };

    const currentStatus = statusConfig[caseItem.status] || statusConfig.pending;

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 grid md:grid-cols-3 gap-4 items-start">
                <div className="md:col-span-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 sm:mb-0">{caseItem.title}</h3>
                        <Badge className={`${currentStatus.color} flex items-center gap-2`}>
                            {currentStatus.icon}
                            {currentStatus.label}
                        </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{caseItem.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{caseItem.location?.city || 'N/A'}, {caseItem.location?.state || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Reported on: {format(new Date(caseItem.created_date), 'MMM d, yyyy')}</span>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-1 md:text-right">
                    {caseItem.photo_url && (
                        <img
                            src={caseItem.photo_url}
                            alt="Case photo"
                            className="w-full md:w-32 h-24 object-cover rounded-lg ml-auto"
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}