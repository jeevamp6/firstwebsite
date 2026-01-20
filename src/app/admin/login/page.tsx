"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin/dashboard");
        } catch (err) {
            setError("Invalid credentials");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="glass-panel p-8 rounded-xl w-full max-w-md border border-white/10">
                <div className="flex justify-center mb-6">
                    <div className="bg-primary/20 p-3 rounded-full">
                        <Lock className="text-primary w-8 h-8" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-white mb-6">Admin Access</h1>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
                            placeholder="admin@reeldocs.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50"
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="w-full btn-primary mt-4">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
