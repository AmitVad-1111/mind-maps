"use client";

import { useMindMapStore } from "@/hooks/useMindMapStore";
import { Plus, Trash2 } from "lucide-react";

export default function Toolbar() {
    const { addNode, deleteNode, selectedNodeId, nodes } = useMindMapStore();

    const handleAddNode = () => {
        const parentNode = nodes.find(n => n.id === selectedNodeId);
        // Be default add to center or near parent
        const x = parentNode ? parentNode.x + 100 : window.innerWidth / 2;
        const y = parentNode ? parentNode.y + 100 : window.innerHeight / 2;

        addNode({
            text: "New Node",
            x,
            y,
            parentId: selectedNodeId || null,
            mindMapId: "temp-id" // This should come from params or context
        });
    };

    const handleDeleteNode = () => {
        if (selectedNodeId) {
            deleteNode(selectedNodeId);
        }
    };

    return (
        <div className="absolute top-4 right-4 flex gap-2 bg-white dark:bg-gray-800 p-2 rounded shadow">
            <button
                onClick={handleAddNode}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded"
                title="Add Node (Enter)"
            >
                <Plus size={20} />
            </button>
            <button
                onClick={handleDeleteNode}
                disabled={!selectedNodeId}
                className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete Node (Delete)"
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
}
