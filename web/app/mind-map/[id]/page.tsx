"use client";

import { useFirestoreSync } from "@/hooks/useFirestoreSync";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Toolbar from "@/components/Toolbar";
import Canvas from "@/components/Canvas";

export default function MindMapEditor() {
    const params = useParams();
    const { id } = params;

    useFirestoreSync(id as string);

    return (
        <div className="w-screen h-screen">
            <Canvas />
            <Toolbar />
            {/* Overlay UI for toolbar, title, back button, etc. */}
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
                <h1 className="font-bold">Mind Map Editor</h1>
                <p className="text-sm text-gray-500">ID: {id}</p>
                <button onClick={() => window.history.back()} className="text-xs text-blue-500 hover:underline mt-2">Back to Dashboard</button>
            </div>
        </div>
    );
}
