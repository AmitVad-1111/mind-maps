import { create } from 'zustand';
import { Node, MindMap } from '@/types';
import { nanoid } from 'nanoid';

interface MindMapState {
  currentMap: MindMap | null;
  nodes: Node[];
  selectedNodeId: string | null;

  // Actions
  setMap: (map: MindMap) => void;
  setNodes: (nodes: Node[]) => void;
  addNode: (node: Omit<Node, 'id'>) => void;
  updateNode: (id: string, data: Partial<Node>) => void;
  deleteNode: (id: string) => void;
  selectNode: (id: string | null) => void;
}

export const useMindMapStore = create<MindMapState>((set) => ({
  currentMap: null,
  nodes: [],
  selectedNodeId: null,

  setMap: (map) => set({ currentMap: map }),
  setNodes: (nodes) => set({ nodes }),

  addNode: (nodeData) => set((state) => {
    const newNode: Node = {
      ...nodeData,
      id: nanoid(),
    };
    return { nodes: [...state.nodes, newNode], selectedNodeId: newNode.id };
  }),

  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id ? { ...node, ...data } : node
    ),
  })),

  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id && node.parentId !== id),
    selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
  })),

  selectNode: (id) => set({ selectedNodeId: id }),
}));
