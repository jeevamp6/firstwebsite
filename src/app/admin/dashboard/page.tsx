"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Reel, ReelDocument } from "@/types";
import { getReels, getDocuments, deleteReel, deleteDocument } from "@/utils/firestore";
import { Trash2, Plus, LogOut, Video, FileText } from "lucide-react";
import { auth } from "@/utils/firebase";

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [tab, setTab] = useState<"reels" | "docs">("reels");

    // Data State
    const [reels, setReels] = useState<Reel[]>([]);
    const [docs, setDocs] = useState<ReelDocument[]>([]);

    // Form State
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/admin/login");
        }
    }, [user, loading, router]);

    const refreshData = useCallback(async () => {
        setReels(await getReels());
        setDocs(await getDocuments());
    }, []);

    useEffect(() => {
        if (user) refreshData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    if (loading || !user) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Admin Nav */}
            <nav className="glass-panel border-b border-white/10 px-8 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Admin Dashboard</h1>
                <button
                    onClick={() => auth.signOut()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white"
                >
                    <LogOut size={18} /> Logout
                </button>
            </nav>

            <div className="flex-grow p-8 max-w-7xl mx-auto w-full">
                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setTab("reels")}
                        className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${tab === "reels" ? "bg-primary text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]" : "glass-panel text-gray-400"
                            }`}
                    >
                        <Video size={18} /> Manage Reels
                    </button>
                    <button
                        onClick={() => setTab("docs")}
                        className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all ${tab === "docs" ? "bg-secondary text-white font-bold shadow-[0_0_15px_rgba(112,0,255,0.3)]" : "glass-panel text-gray-400"
                            }`}
                    >
                        <FileText size={18} /> Manage Documents
                    </button>
                </div>

                {/* Content Area */}
                <div className="glass-panel p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white uppercase tracking-wider">{tab === "reels" ? "Reels List" : "Documents List"}</h2>
                        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm">
                            <Plus size={16} /> Add {tab === "reels" ? "Reel" : "Document"}
                        </button>
                    </div>

                    {/* Add Form Placeholder (To be implemented) */}
                    {showForm && (
                        <div className="mb-8 p-4 border border-dashed border-white/20 rounded-lg">
                            <p className="text-center text-gray-500">Form will be implemented in next step</p>
                        </div>
                    )}

                    {/* List */}
                    <div className="space-y-4">
                        {tab === "reels" ? (
                            reels.map(reel => (
                                <div key={reel.id} className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
                                    <div>
                                        <div className="font-bold text-white">{reel.title}</div>
                                        <div className="text-sm text-gray-400">{reel.category}</div>
                                    </div>
                                    <button onClick={async () => { await deleteReel(reel.id!); refreshData(); }} className="text-red-400 hover:text-red-300">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            docs.map(doc => (
                                <div key={doc.id} className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
                                    <div>
                                        <div className="font-bold text-white">{doc.title}</div>
                                        <div className="text-sm text-gray-400">{doc.category}</div>
                                    </div>
                                    <button onClick={async () => { await deleteDocument(doc.id!); refreshData(); }} className="text-red-400 hover:text-red-300">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))
                        )}
                        {((tab === "reels" && reels.length === 0) || (tab === "docs" && docs.length === 0)) && (
                            <div className="text-center text-gray-500 py-8">No items found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
