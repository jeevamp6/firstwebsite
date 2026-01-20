export interface Reel {
    id?: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    videoUrl: string;
    linkedDocId?: string;
    createdAt: number; // Timestamp
}

export interface ReelDocument {
    id?: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    fileUrl: string;
    fileName: string;
    linkedReelId?: string;
    createdAt: number;
}

export interface ContactMessage {
    id?: string;
    name: string;
    email: string;
    message: string;
    createdAt: number;
}
