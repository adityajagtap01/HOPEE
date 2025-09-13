import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, AlertTriangle, User, Phone, CheckCircle } from "lucide-react";
import { format } from 'date-fns';

export default function CaseCard({ caseItem, onStatusUpdate }) {
    const priorityColors = {
        low: "bg-gray-100 text-gray-800",
        medium: "bg-yellow-100 text-yellow-800",
        high: "bg-orange-100 text-orange-800",
        urgent: "bg-red-100 text-red-800",
    };

    return (
        <Card className={`flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow ${caseItem.status === 'resolved' ? 'border-green-200 bg-green-50/30' : ''}`}>
            <CardHeader>
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        {caseItem.status === 'resolved' && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {caseItem.title}
                    </CardTitle>
                    <Badge className={`${priorityColors[caseItem.priority]} flex items-center gap-1`}>
                        <AlertTriangle className="w-3 h-3" />
                        {caseItem.priority}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{caseItem.description}</p>

                {caseItem.photo_url && (
                    <img src={caseItem.photo_url} alt="Case" className="rounded-lg w-full h-40 object-cover mb-4" />
                )}

                <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{caseItem.location?.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Reported by: {caseItem.created_by.split('@')[0]}</span>
                    </div>
                    {caseItem.contact_phone &&
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>Reporter contact: {caseItem.contact_phone}</span>
                        </div>
                    }
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{format(new Date(caseItem.created_date), 'PPpp')}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full">
                    <p className="text-sm font-medium mb-2">Update Status:</p>
                    <Select defaultValue={caseItem.status} onValueChange={(value) => onStatusUpdate(caseItem.id, value)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="resolved">✅ Resolved</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardFooter>
        </Card>
    );
}