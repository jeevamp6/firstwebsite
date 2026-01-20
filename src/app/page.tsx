"use client";

import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/bg-grid.svg')] bg-cover relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 px-4"
      >
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-white">
          REEL<span className="text-primary neon-text">DOCS</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-10 tracking-wide">
          Reels + Resources for <span className="text-white font-semibold">Gen Z</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/home" className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-lg">
            Enter Site <ArrowRight size={20} />
          </Link>
          <Link href="/reels" className="btn-secondary flex items-center justify-center gap-2 px-8 py-4 text-lg">
            Explore Reels <Play size={20} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
