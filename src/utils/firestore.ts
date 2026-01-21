import { db } from "@/utils/firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,

} from "firebase/firestore";
import { Reel, ReelDocument, ContactMessage } from "@/types";

// --- Reels ---
const REELS_COLLECTION = "reels";

export const getReels = async (): Promise<Reel[]> => {
    try {
        const q = query(collection(db, REELS_COLLECTION), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Reel));
    } catch (error) {
        console.error("Error fetching reels:", error);
        return [];
    }
};

export const addReel = async (reel: Reel): Promise<string> => {
    const docRef = await addDoc(collection(db, REELS_COLLECTION), reel);
    return docRef.id;
};

export const deleteReel = async (id: string) => {
    await deleteDoc(doc(db, REELS_COLLECTION, id));
};

export const updateReel = async (id: string, data: Partial<Reel>) => {
    await updateDoc(doc(db, REELS_COLLECTION, id), data);
};

// --- Documents ---
const DOCS_COLLECTION = "documents";

export const getDocuments = async (): Promise<ReelDocument[]> => {
    try {
        const q = query(collection(db, DOCS_COLLECTION), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ReelDocument));
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
};

export const addDocument = async (document: ReelDocument): Promise<string> => {
    const docRef = await addDoc(collection(db, DOCS_COLLECTION), document);
    return docRef.id;
};

export const deleteDocument = async (id: string) => {
    await deleteDoc(doc(db, DOCS_COLLECTION, id));
};

// --- Contact ---
const CONTACT_COLLECTION = "contactMessages";

export const sendContactMessage = async (message: ContactMessage) => {
    await addDoc(collection(db, CONTACT_COLLECTION), message);
};
