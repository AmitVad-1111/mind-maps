"use client";

import { Node } from "@/types";

interface ConnectionProps {
    start: { x: number; y: number };
    end: { x: number; y: number };
}

export default function Connection({ start, end }: ConnectionProps) {
    // Calculate control points for a smooth bezier curve
    const midX = (start.x + end.x) / 2;
    const path = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;

    return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
            <path
                d={path}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                className="dark:stroke-gray-600"
            />
        </svg>
    );
}
