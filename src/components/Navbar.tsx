"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Reels", href: "/reels" },
    { name: "Documents", href: "/documents" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    if (pathname === "/") return null;

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                            REEL<span className="text-primary">DOCS</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive(link.href)
                                        ? "text-primary bg-white/5 neon-text"
                                        : "text-gray-300 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {/* Admin Link */}
                            <Link
                                href={user ? "/admin/dashboard" : "/admin/login"}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${pathname.startsWith("/admin")
                                    ? "text-accent bg-white/5"
                                    : "text-gray-300 hover:text-accent hover:bg-white/5"
                                    }`}
                            >
                                Admin
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass-panel border-t border-white/5">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.href)
                                    ? "text-primary bg-white/5"
                                    : "text-gray-300 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href={user ? "/admin/dashboard" : "/admin/login"}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-accent hover:bg-white/5"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
