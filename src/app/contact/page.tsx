"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { sendContactMessage } from "@/utils/firestore";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            await sendContactMessage({
                name: formData.name,
                email: formData.email,
                message: formData.message,
                createdAt: Date.now(),
            });
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-4 py-24">
                <div className="glass-panel p-8 md:p-12 max-w-lg w-full rounded-2xl">
                    <h1 className="text-4xl font-bold mb-2 text-center">Contact <span className="text-primary neon-text">Us</span></h1>
                    <p className="text-center text-gray-400 mb-8">We&apos;d love to hear from you.</p>

                    {status === "success" ? (
                        <div className="bg-green-500/10 border border-green-500 text-green-400 p-4 rounded-lg text-center">
                            Message sent successfully! We&apos;ll get back to you soon.
                            <button onClick={() => setStatus("idle")} className="block mt-2 text-sm underline w-full">Send another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                                />
                            </div>

                            {status === "error" && (
                                <div className="text-red-400 text-sm text-center">Failed to send message. Please try again.</div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "submitting" ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
