"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addDoc, collection, query, where, getDocs, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MindMap } from "@/types";

export default function Dashboard() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [maps, setMaps] = useState<MindMap[]>([]);

    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        let isMounted = true;
        async function fetchMaps() {
            if (!user) return;
            try {
                // Simplified query to avoid index requirement
                const q = query(
                    collection(db, "mindMaps"),
                    where("userId", "==", user.uid)
                );

                const querySnapshot = await getDocs(q);
                const fetchedMaps: MindMap[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedMaps.push({ id: doc.id, ...doc.data() } as MindMap);
                });

                // Sort client-side
                fetchedMaps.sort((a, b) => {
                    const dateA = a.updatedAt?.toDate?.() || new Date(0);
                    const dateB = b.updatedAt?.toDate?.() || new Date(0);
                    return dateB.getTime() - dateA.getTime();
                });

                if (isMounted) {
                    setMaps(fetchedMaps);
                }
            } catch (error) {
                console.error("Error fetching maps:", error);
            }
        }
        fetchMaps();
        return () => { isMounted = false; };
    }, [user]);

    const handleCreateMap = async () => {
        if (!user || isCreating) return;
        setIsCreating(true);
        try {
            const docRef = await addDoc(collection(db, "mindMaps"), {
                userId: user.uid,
                title: "Untitled Mind Map",
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                rootNodeId: null
            });
            router.push(`/mind-map/${docRef.id}`);
        } catch (e) {
            console.error("Error creating map: ", e);
        } finally {
            setIsCreating(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

    if (!user) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between p-4 bg-white shadow dark:bg-gray-800">
                <h1 className="text-xl font-bold">My Mind Maps</h1>
                <button onClick={() => signOut()} className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 dark:hover:bg-red-900/20">
                    Sign Out
                </button>
            </header>
            <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Create New Map Card */}
                    <div
                        onClick={handleCreateMap}
                        className={`flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-colors h-48 ${isCreating ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 hover:bg-white dark:hover:bg-gray-800'}`}
                    >
                        {isCreating ? (
                            <div className="flex flex-col items-center animate-pulse">
                                <div className="w-8 h-8 mb-2 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                                <span className="text-gray-500 font-medium">Creating...</span>
                            </div>
                        ) : (
                            <>
                                <div className="text-4xl text-gray-400 mb-2">+</div>
                                <span className="text-gray-500 font-medium">Create New Map</span>
                            </>
                        )}
                    </div>

                    {/* Map List */}
                    {maps.map((map) => (
                        <div
                            key={map.id}
                            onClick={() => router.push(`/mind-map/${map.id}`)}
                            className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow h-48 border border-gray-100 dark:border-gray-700"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{map.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">Last updated: {map.updatedAt?.toDate().toLocaleDateString()}</p>
                            <div className="mt-auto flex justify-between items-center text-sm">
                                <span className="text-blue-600 hover:underline">Open</span>
                                {/* We could add delete button here later */}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
