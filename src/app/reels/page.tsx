"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReelCard } from "@/components/ReelCard";
import { getReels } from "@/utils/firestore";
import { Reel } from "@/types";

export default function ReelsPage() {
    const [reels, setReels] = useState<Reel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedReels = await getReels();
            setReels(fetchedReels);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">
                    Explore <span className="text-primary neon-text">Reels</span>
                </h1>

                {loading ? (
                    <div className="text-center text-gray-500 py-20">Loading reels...</div>
                ) : reels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {reels.map((reel) => (
                            <ReelCard key={reel.id} reel={reel} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-20 bg-white/5 rounded-xl">
                        No reels available yet.
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
