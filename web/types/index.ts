export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    createdAt: Date;
}

export interface MindMap {
    id: string;
    userId: string;
    title: string;
    createdAt: any; // Firestore Timestamp
    updatedAt: any; // Firestore Timestamp
    rootNodeId?: string;
}

export interface Node {
    id: string;
    mindMapId: string;
    text: string;
    x: number;
    y: number;
    parentId: string | null;
    color?: string;
    width?: number; // Optional text measurement
    height?: number;
}
