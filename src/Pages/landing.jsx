
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Case } from "@/entities/Case";
import { Heart, Users, Shield, MapPin, Clock, CheckCircle, ArrowRight, Star, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Landing() {
    const [recentCases, setRecentCases] = useState([]);
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    useEffect(() => {
        loadRecentCases();
    }, []);

    const loadRecentCases = async () => {
        try {
            const cases = await Case.list("-created_date", 4);
            setRecentCases(cases);
        } catch (error) {
            console.error("Error loading cases:", error);
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        // Handle contact form submission
        console.log("Contact form submitted:", contactForm);
        setContactForm({ name: "", email: "", message: "" });
    };

    const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        in_progress: "bg-blue-100 text-blue-800",
        resolved: "bg-green-100 text-green-800"
    };

    const statusIcons = {
        pending: <Clock className="w-3 h-3" />,
        in_progress: <Users className="w-3 h-3" />,
        resolved: <CheckCircle className="w-3 h-3" />
    };

    return (
        <div className="min-h-screen">
            <style>
                {`
          @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.4), 0 0 10px rgba(239, 68, 68, 0.3); }
            50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6), 0 0 30px rgba(239, 68, 68, 0.4); }
            100% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.4), 0 0 10px rgba(239, 68, 68, 0.3); }
          }
          .glow-button {
            animation: glow 3s infinite ease-in-out;
          }
        `}
            </style>
            {/* Hero Section */}
            <header
                className="relative text-white overflow-hidden bg-cover bg-center"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070&auto=format&fit=crop')"
                }}
            >

                {/* Navigation */}
                <nav className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <div className="text-white font-bold text-lg">H</div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">HOPEE</h1>
                                <p className="text-xs opacity-80 -mt-1">Small Acts, Big Impact</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <Link to={createPageUrl("ReportCase")} className="text-white/80 hover:text-white transition-colors font-medium">
                                Report Case
                            </Link>
                            <Link to={createPageUrl("NGORegister")} className="text-white/80 hover:text-white transition-colors font-medium">
                                NGO Register
                            </Link>
                            <Link to={createPageUrl("Contact")} className="text-white/80 hover:text-white transition-colors font-medium">
                                Contact
                            </Link>
                        </div>

                        <Link to={createPageUrl("Profile")}>
                            <Button variant="outline" className="bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white">
                                Login / My Profile
                            </Button>
                        </Link>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Helping Out People
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                                Everywhere Effectively
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
                            Every person deserves hope and help. Report cases of people in need,
                            and connect them with NGOs that can make a real difference.
                        </p>
                        <Link to={createPageUrl("ReportCase")}>
                            <Button className="glow-button bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-200">
                                <Heart className="w-5 h-5 mr-2 fill-current" />
                                Report a Case Now
                            </Button>
                        </Link>
                    </div>

                    {/* Floating helper images */}
                    <div className="absolute top-1/4 left-10 hidden lg:block">
                        <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=200&h=200&auto=format&fit=crop&crop=faces" alt="Helping hands" className="w-32 h-32 rounded-full border-4 border-white/20 shadow-lg opacity-80" />
                    </div>
                    <div className="absolute bottom-1/4 right-10 hidden lg:block">
                        <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=200&h=200&auto=format&fit=crop&crop=faces" alt="Community support" className="w-24 h-24 rounded-full border-4 border-white/20 shadow-lg opacity-80" />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
            </header>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            How HOPEE Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            A simple, effective platform connecting those who need help with those who can provide it
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop" alt="Report a case" className="w-full h-48 object-cover" />
                            <CardContent className="p-8 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Report</h3>
                                <p className="text-gray-600">
                                    Spot someone in need? Report their location and situation quickly and securely through our platform.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop" alt="Connect with NGOs" className="w-full h-48 object-cover" />
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Connect</h3>
                                <p className="text-gray-600 text-center">
                                    We notify verified NGOs in the area who specialize in the type of help needed.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop" alt="Provide help" className="w-full h-48 object-cover" />
                            <CardContent className="p-8 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Help</h3>
                                <p className="text-gray-600">
                                    NGOs respond quickly to provide the assistance needed, from medical care to shelter and food.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Recent Cases */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Recent Impact Stories
                        </h2>
                        <p className="text-xl text-gray-600">
                            See how HOPEE is making a difference in communities
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recentCases.map((case_, index) => (
                            <Card key={case_.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                                {case_.photo_url && <img src={case_.photo_url} alt={case_.title} className="w-full h-40 object-cover" />}
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <Badge className={`${statusColors[case_.status]} flex items-center gap-1`}>
                                            {statusIcons[case_.status]}
                                            {case_.status.replace("_", " ")}
                                        </Badge>
                                        <span className="text-xs text-gray-500">
                                            {new Date(case_.created_date).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {case_.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {case_.description}
                                    </p>

                                    <div className="flex items-center text-xs text-gray-500">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {case_.location?.city || "Location not specified"}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to={createPageUrl("ReportCase")}>
                            <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200">
                                Add Your Report
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                HOPEE was born from a simple belief: that technology can bridge the gap between
                                those who need help and those who can provide it. Every day, people encounter
                                individuals in distressing situations but don't know how to help effectively.
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Our platform creates a direct line between concerned citizens and verified NGOs,
                                ensuring that help reaches those who need it most, when they need it most.
                            </p>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
                                    <div className="text-sm text-gray-600">Always Available</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                                    <div className="text-sm text-gray-600">Free to Use</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600 mb-1">Verified</div>
                                    <div className="text-sm text-gray-600">NGO Partners</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl blur opacity-20"></div>
                            <img
                                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600&auto=format&fit=crop"
                                alt="People helping each other"
                                className="relative rounded-2xl shadow-2xl w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                        <p className="text-xl text-gray-300">
                            Have questions, suggestions, or want to partner with us?
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                            <CardContent className="p-6 text-center">
                                <Mail className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">Email Us</h3>
                                <p className="text-gray-300">support@hopee.org</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                            <CardContent className="p-6 text-center">
                                <Phone className="w-8 h-8 text-green-400 mx-auto mb-4" />
                                <h3 className="font-semibold mb-2">Call Us</h3>
                                <p className="text-gray-300">+91-XXXXXXXXXX</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                            <CardContent className="p-6 text-center">
                                <Heart className="w-8 h-8 text-red-400 mx-auto mb-4 fill-current" />
                                <h3 className="font-semibold mb-2">Join Us</h3>
                                <p className="text-gray-300">Become an NGO Partner</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-16 max-w-2xl mx-auto">
                        <Card className="bg-white/10 backdrop-blur-md border-white/20">
                            <CardContent className="p-8">
                                <form onSubmit={handleContactSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Input
                                            placeholder="Your Name"
                                            value={contactForm.name}
                                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                            className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
                                            required
                                        />
                                        <Input
                                            type="email"
                                            placeholder="Your Email"
                                            value={contactForm.email}
                                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                            className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
                                            required
                                        />
                                    </div>
                                    <Textarea
                                        placeholder="Your Message"
                                        rows={4}
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                        className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
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
            </section>
        </div>
    );
}
