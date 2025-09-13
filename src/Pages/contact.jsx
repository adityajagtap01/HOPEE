import React, { useState } from 'react';
import { ContactMessage } from '@/entities/ContactMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, Mail, Phone, CheckCircle, AlertTriangle, Github, Linkedin, Instagram } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSubmitted(false);

        try {
            await ContactMessage.create({ ...formData, subject: 'General Inquiry from Contact Page' });
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setError('Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
                    <p className="text-lg text-gray-600">We’d love to hear from you! Whether you have a question, feedback, or want to partner with us.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="md:col-span-2">
                        <Card className="shadow-xl border-none">
                            <CardHeader>
                                <CardTitle>Send us a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="Your Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Your message here..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={5} required />
                                    </div>

                                    {submitted && (
                                        <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
                                            <CheckCircle className="h-4 w-4" />
                                            <AlertDescription>Thank you! Your message has been sent successfully.</AlertDescription>
                                        </Alert>
                                    )}
                                    {error && (
                                        <Alert variant="destructive">
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    <Button type="submit" disabled={isSubmitting} className="w-full">
                                        {isSubmitting ? 'Sending...' : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card className="shadow-lg border-none">
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full"><Mail className="w-5 h-5 text-blue-600" /></div>
                                    <div>
                                        <h4 className="font-semibold">Email</h4>
                                        <a href="mailto:support@hopee.org" className="text-blue-600 hover:underline">support@hopee.org</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-green-100 p-3 rounded-full"><Phone className="w-5 h-5 text-green-600" /></div>
                                    <div>
                                        <h4 className="font-semibold">Phone</h4>
                                        <p className="text-gray-700">+91-XXXXXXXXXX</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg border-none">
                            <CardHeader>
                                <CardTitle>Follow Us</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-around">
                                <a href="#" className="text-gray-500 hover:text-gray-900"><Github className="w-7 h-7" /></a>
                                <a href="#" className="text-gray-500 hover:text-blue-700"><Linkedin className="w-7 h-7" /></a>
                                <a href="#" className="text-gray-500 hover:text-pink-600"><Instagram className="w-7 h-7" /></a>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}