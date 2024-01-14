import { create } from 'zustand'

interface GenerateTypeStore {
    data: string;
    setContent: (content: string) => void;
}

export const UseGenerateTypeStore = create<GenerateTypeStore>((set) => ({
    data: '',
    setContent: (content) => set(() => ({ data: content })),
}))
