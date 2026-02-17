import { useEffect } from "react";
import { useMindMapStore } from "./useMindMapStore";
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, writeBatch, serverTimestamp } from "firebase/firestore";
import { useAuth } from "./useAuth";

export function useFirestoreSync(mindMapId: string) {
    const { user } = useAuth();
    const { nodes, setNodes } = useMindMapStore();

    // Initial Load Only
    useEffect(() => {
        if (!user || !mindMapId) return;

        async function loadNodes() {
            const nodesRef = collection(db, "mindMaps", mindMapId, "nodes");
            const snapshot = await getDocs(nodesRef);
            const loadedNodes = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as any[];

            if (loadedNodes.length > 0) {
                setNodes(loadedNodes);
            }
        }
        loadNodes();
    }, [mindMapId, user, setNodes]);

    // Debounced Save - Handles Updates and Deletions
    useEffect(() => {
        if (!user || !mindMapId) return;

        // Skip save if nodes are empty to avoid wiping out data on initial empty state before load?
        // But if user deleted everything, we SHOULD save.
        // We can check if "loaded" flag exists in store, but for now let's assume if it's 0 length it might be valid.
        // Actually, to be safe, maybe don't save if nodes is empty AND we haven't loaded?
        // Use a better approach: Diffing.

        const saveData = setTimeout(async () => {
            const batch = writeBatch(db);
            const mapRef = doc(db, "mindMaps", mindMapId);

            // Update map timestamp
            batch.update(mapRef, { updatedAt: serverTimestamp() });

            // 1. Get all current nodes on server to check for deletions
            const nodesRef = collection(db, "mindMaps", mindMapId, "nodes");
            const serverSnapshot = await getDocs(nodesRef);
            const serverNodeIds = new Set(serverSnapshot.docs.map(d => d.id));
            const localNodeIds = new Set(nodes.map(n => n.id));

            // 2. Update or Create local nodes
            nodes.forEach(node => {
                const nodeRef = doc(db, "mindMaps", mindMapId, "nodes", node.id);
                const { id, ...data } = node;
                batch.set(nodeRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
            });

            // 3. Delete nodes that are on server but not local
            serverNodeIds.forEach(serverId => {
                if (!localNodeIds.has(serverId)) {
                    const deleteRef = doc(db, "mindMaps", mindMapId, "nodes", serverId);
                    batch.delete(deleteRef);
                }
            });

            await batch.commit();
            console.log("Synced to Firestore");
        }, 2000);

        return () => clearTimeout(saveData);
    }, [nodes, mindMapId, user]);
}
