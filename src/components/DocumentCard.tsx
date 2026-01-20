"use client";

import { ReelDocument } from "@/types";
import { FileText, Download } from "lucide-react";
import { motion } from "framer-motion";

interface DocumentCardProps {
    doc: ReelDocument;
}

export function DocumentCard({ doc }: DocumentCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-xl flex flex-col justify-between h-full"
        >
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/5 rounded-lg">
                        <FileText className="text-primary w-8 h-8" />
                    </div>
                    <span className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded-full">{doc.category}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{doc.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{doc.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {doc.tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-500">#{tag}</span>
                    ))}
                </div>
            </div>

            <a
                href={doc.fileUrl}
                target="_blank"
                download={doc.fileName} // 'download' attribute only works for same-origin or configured flows usually
                className="w-full btn-primary flex items-center justify-center gap-2"
            >
                <Download size={18} /> Download PDF
            </a>
        </motion.div>
    );
}
