export function Footer() {
    return (
        <footer className="w-full py-8 mt-auto border-t border-white/5 bg-black/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} ReelDocs. All rights reserved.</p>
                <p className="mt-2 text-xs">Gen-Z Resources Platform</p>
            </div>
        </footer>
    );
}
