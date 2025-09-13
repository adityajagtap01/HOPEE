import React, { useState, useEffect } from 'react';
import { AdminRequest } from '@/entities/AdminRequest';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Clock } from 'lucide-react';

export default function AdminRequestForm({ user }) {
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [existingRequest, setExistingRequest] = useState(null);

    useEffect(() => {
        const checkExisting = async () => {
            const requests = await AdminRequest.filter({ user_email: user.email });
            if (requests.length > 0) {
                setExistingRequest(requests[0]);
            }
        };
        checkExisting();
    }, [user.email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const newRequest = await AdminRequest.create({
                user_email: user.email,
                user_name: user.full_name,
                reason: reason,
            });
            setExistingRequest(newRequest);
        } catch (error) {
            console.error("Failed to submit admin request:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (existingRequest) {
        if (existingRequest.status === 'pending') {
            return (
                <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                        Your request for admin access is pending review.
                    </AlertDescription>
                </Alert>
            );
        }
        if (existingRequest.status === 'approved') {
            return (
                <Alert variant="default" className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription>
                        Your admin access has been approved! You may need to log out and log back in to see the changes.
                    </AlertDescription>
                </Alert>
            );
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-600">
                If you are part of the HOPEE organization, you can request administrative privileges.
            </p>
            <Textarea
                placeholder="Please state your reason for requesting admin access."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting...' : 'Request Admin Access'}
            </Button>
        </form>
    );
}