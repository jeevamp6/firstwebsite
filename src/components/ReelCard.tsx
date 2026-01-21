"use client";

import { Reel } from "@/types";
import { FileText, Download } from "lucide-react";
import Link from "next/link";

interface ReelCardProps {
    reel: Reel;
    onDownload?: (docId: string) => void;
}

export function ReelCard({ reel, onDownload }: ReelCardProps) {
    return (
        <div className="glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <div className="aspect-[9/16] relative bg-black group">
                <video
                    src={reel.videoUrl}
                    className="w-full h-full object-cover"
                    poster={reel.videoUrl + '#t=0.1'} // Use first frame as poster if supported
                    controls
                    playsInline
                />
                {/* Overlay Play Icon (optional, if custom controls) */}
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white truncate">{reel.title}</h3>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">{reel.category}</span>
                </div>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{reel.description}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                    {reel.tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-500">#{tag}</span>
                    ))}
                </div>

                <div className="mt-4 flex gap-2">
                    {reel.linkedDocId && (
                        <>
                            <Link
                                href={`/documents?search=${reel.linkedDocId}`}
                                className="flex-1 btn-secondary text-xs flex items-center justify-center gap-2"
                            >
                                <FileText size={14} /> View Doc
                            </Link>
                            <button
                                onClick={() => onDownload && onDownload(reel.linkedDocId!)}
                                className="flex-1 btn-primary text-xs flex items-center justify-center gap-2"
                            >
                                <Download size={14} /> PDF
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
