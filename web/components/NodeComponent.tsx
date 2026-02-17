"use client";

import { useMindMapStore } from "@/hooks/useMindMapStore";
import { cn } from "@/lib/utils";
import { Node } from "@/types";
import { useEffect, useRef, useState } from "react";

interface NodeProps {
    node: Node;
    onDragStart: (e: React.MouseEvent) => void;
}

export default function NodeComponent({ node, onDragStart }: NodeProps) {
    const { updateNode, deleteNode, selectNode, selectedNodeId } = useMindMapStore();
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateNode(node.id, { text: e.target.value });
    };

    const isSelected = selectedNodeId === node.id;

    return (
        <div
            className={cn(
                "absolute bg-white border-2 rounded shadow-md min-w-[120px] transition-shadow",
                isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300",
                "dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            )}
            style={{
                left: node.x,
                top: node.y,
                transform: 'translate(-50%, -50%)'
            }}
            onMouseDown={onDragStart}
            onClick={(e) => {
                e.stopPropagation();
                selectNode(node.id);
            }}
            onDoubleClick={handleDoubleClick}
        >
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={node.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="w-full h-full px-3 py-2 text-center bg-transparent border-none focus:outline-none dark:text-white"
                />
            ) : (
                <div className="px-3 py-2 text-center cursor-pointer select-none">
                    {node.text}
                </div>
            )}
        </div>
    );
}
