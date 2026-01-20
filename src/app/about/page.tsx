"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="glass-panel p-8 md:p-12 max-w-2xl w-full rounded-2xl">
                    <h1 className="text-4xl font-bold mb-6 text-center">About <span className="text-primary neon-text">ReelDocs</span></h1>

                    <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                            ReelDocs is the ultimate platform for Gen-Z learners. We believe in fast, efficient learning through short-form video content backed by comprehensive documentation.
                        </p>
                        <p>
                            Our mission is to bridge the gap between entertaining reels and educational resources. Watch a 60-second summary, then download the detailed PDF to master the topic.
                        </p>
                        <p className="border-l-2 border-secondary pl-4 py-1 italic text-white">
                            "Stop wasting time on hour-long lectures. Get straight to the point with ReelDocs."
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
