import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Heart, Send } from "lucide-react";

export default function Contact() {
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        console.log("Contact form submitted:", contactForm);
        alert("Thank you for your message! We'll get back to you soon.");
        setContactForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-white fill-current" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h1>
                    <p className="text-gray-600 text-lg">
                        Have questions, suggestions, or want to partner with us?
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <Mail className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">Email Us</h3>
                                <p className="text-gray-600">support@hopee.org</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <Phone className="w-8 h-8 text-green-400 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">Call Us</h3>
                                <p className="text-gray-600">+91-XXXXXXXXXX</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <Heart className="w-8 h-8 text-red-400 mx-auto mb-4 fill-current" />
                                <h3 className="font-semibold mb-2">Join Us</h3>
                                <p className="text-gray-600">Become an NGO Partner</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Send us a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleContactSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Input
                                            placeholder="Your Name"
                                            value={contactForm.name}
                                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                            required
                                        />
                                        <Input
                                            type="email"
                                            placeholder="Your Email"
                                            value={contactForm.email}
                                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Textarea
                                        placeholder="Your Message"
                                        rows={4}
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                        required
                                    />
                                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}