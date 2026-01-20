"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReelCard } from "@/components/ReelCard";
import { DocumentCard } from "@/components/DocumentCard";
import { getReels, getDocuments } from "@/utils/firestore";
import { Reel, ReelDocument } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    const [reels, setReels] = useState<Reel[]>([]);
    const [docs, setDocs] = useState<ReelDocument[]>([]);

    useEffect(() => {
        // Fetch data on mount
        const fetchData = async () => {
            const fetchedReels = await getReels();
            const fetchedDocs = await getDocuments();
            setReels(fetchedReels.slice(0, 3)); // Trending: Top 3
            setDocs(fetchedDocs.slice(0, 3)); // Latest: Top 3
        };
        fetchData();
    }, []);

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Learn Faster with <span className="text-primary">Shorts</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
                    Skip the boring lectures. Watch 60s reels and download the exact PDF notes you need to ace your exams.
                </p>
            </section>

            {/* Trending Reels */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto w-full mb-16">
                <div className="flex justify-between items-end mb-8">
                    <h3 className="text-2xl font-bold border-l-4 border-primary pl-3">Trending Reels</h3>
                    <Link href="/reels" className="text-primary flex items-center gap-1 hover:underline">View All <ArrowRight size={16} /></Link>
                </div>

                {reels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reels.map(reel => <ReelCard key={reel.id} reel={reel} />)}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500 bg-white/5 rounded-xl">No reels found. Check back soon!</div>
                )}
            </section>

            {/* Latest Documents */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto w-full mb-16">
                <div className="flex justify-between items-end mb-8">
                    <h3 className="text-2xl font-bold border-l-4 border-secondary pl-3">Latest Documents</h3>
                    <Link href="/documents" className="text-primary flex items-center gap-1 hover:underline">View All <ArrowRight size={16} /></Link>
                </div>

                {docs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {docs.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500 bg-white/5 rounded-xl">No documents found. Check back soon!</div>
                )}
            </section>

            <Footer />
        </main>
    );
}
