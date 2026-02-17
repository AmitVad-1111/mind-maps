"use client";

import { useMindMapStore } from "@/hooks/useMindMapStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { Move, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import NodeComponent from "./NodeComponent";
import Connection from "./Connection";

export default function Canvas() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const { nodes, updateNode } = useMindMapStore();

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target === containerRef.current) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleNodeDragStart = (e: React.MouseEvent, nodeId: string) => {
        e.stopPropagation();
        setDraggingNodeId(nodeId);
        // Calculate offset from node center if needed, but for now simple center drag
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        } else if (draggingNodeId) {
            // Calculate new position relative to canvas
            const canvasRect = containerRef.current?.getBoundingClientRect();
            if (canvasRect) {
                // Apply scale and translation to get "world" coordinates
                const rawX = e.clientX - canvasRect.left;
                const rawY = e.clientY - canvasRect.top;

                const x = (rawX - position.x) / scale;
                const y = (rawY - position.y) / scale;

                updateNode(draggingNodeId, { x, y });
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDraggingNodeId(null);
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            setScale((prev) => Math.min(Math.max(0.1, prev * delta), 5));
        }
    };

    const zoomIn = () => setScale((p) => Math.min(p * 1.2, 5));
    const zoomOut = () => setScale((p) => Math.max(p / 1.2, 0.1));

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.key === 'Delete' || e.key === 'Backspace') {
                const { selectedNodeId, deleteNode } = useMindMapStore.getState();
                if (selectedNodeId) deleteNode(selectedNodeId);
            }

            if (e.key === 'Enter' || e.key === 'Tab') {
                e.preventDefault();
                const { selectedNodeId, nodes, addNode } = useMindMapStore.getState();
                const selectedNode = nodes.find(n => n.id === selectedNodeId);

                if (selectedNode) {
                    // Add child (Enter) or Sibling (Tab)? 
                    // Plan says: Enter -> add child, Tab -> add sibling
                    // But typically Enter is sibling and Tab is child in many apps. 
                    // Let's stick to plan: Enter -> Child, Tab -> Sibling
                    // Wait, plan says: Enter -> add child node, Tab -> add sibling

                    const parentId = e.key === 'Enter' ? selectedNode.id : selectedNode.parentId;
                    const parentNode = nodes.find(n => n.id === parentId);

                    // Position new node near parent or selected
                    const baseX = e.key === 'Enter' ? selectedNode.x : (parentNode?.x || selectedNode.x);
                    const baseY = e.key === 'Enter' ? selectedNode.y : (parentNode?.y || selectedNode.y);

                    addNode({
                        text: 'New Node',
                        x: baseX + 150,
                        y: baseY + (Math.random() * 50 - 25), // Slight offset
                        parentId: parentId || null,
                        mindMapId: selectedNode.mindMapId
                    });
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div
            className="w-full h-full overflow-hidden bg-gray-50 dark:bg-gray-900 relative cursor-grab active:cursor-grabbing outline-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            ref={containerRef}
            tabIndex={0} // Make focusable for keyboard events if needed, though window listener handles it
        >
            <div
                className="absolute inset-0 origin-center transition-transform duration-75 ease-out"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                }}
            >
                {/* Render Connections */}
                {nodes.map(node => {
                    if (!node.parentId) return null;
                    const parent = nodes.find(n => n.id === node.parentId);
                    if (!parent) return null;
                    return <Connection key={node.id} start={{ x: parent.x, y: parent.y }} end={{ x: node.x, y: node.y }} />;
                })}

                {/* Render Nodes */}
                {nodes.map(node => (
                    <NodeComponent
                        key={node.id}
                        node={node}
                        onDragStart={(e) => handleNodeDragStart(e, node.id)}
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-white dark:bg-gray-800 p-2 rounded shadow">
                <button onClick={zoomIn} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><ZoomIn size={20} /></button>
                <button onClick={zoomOut} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><ZoomOut size={20} /></button>
                <button onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }) }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><Move size={20} /></button>
            </div>
        </div>
    );
}
