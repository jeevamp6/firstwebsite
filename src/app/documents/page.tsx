"use client";

import { useEffect, useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DocumentCard } from "@/components/DocumentCard";
import { SearchBar } from "@/components/SearchBar";
import { getDocuments } from "@/utils/firestore";
import { ReelDocument } from "@/types";

export default function DocumentsPage() {
    const [docs, setDocs] = useState<ReelDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const fetchedDocs = await getDocuments();
            setDocs(fetchedDocs);
            setLoading(false);
        };
        fetchData();
    }, []);

    const categories = useMemo(() => {
        return Array.from(new Set(docs.map((d) => d.category)));
    }, [docs]);

    const filteredDocs = useMemo(() => {
        return docs.filter((doc) => {
            const matchesSearch =
                doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = category ? doc.category === category : true;
            return matchesSearch && matchesCategory;
        });
    }, [docs, searchTerm, category]);

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">
                    Document <span className="text-secondary neon-text">Library</span>
                </h1>

                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    category={category}
                    setCategory={setCategory}
                    categories={categories}
                />

                {loading ? (
                    <div className="text-center text-gray-500 py-20">Loading documents...</div>
                ) : filteredDocs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {filteredDocs.map((doc) => (
                            <DocumentCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-20 bg-white/5 rounded-xl">
                        No documents found matching your search.
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
