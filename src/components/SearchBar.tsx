"use client";

import { Search, Filter } from "lucide-react";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    category: string;
    setCategory: (cat: string) => void;
    categories: string[];
}

export function SearchBar({ searchTerm, setSearchTerm, category, setCategory, categories }: SearchBarProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-full py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
            </div>

            <div className="relative w-full md:w-48">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-full py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-primary/50 cursor-pointer"
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
