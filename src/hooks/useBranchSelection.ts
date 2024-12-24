import { create } from 'zustand';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/storage';

interface BranchState {
  selectedBranchId: string | null;
  setSelectedBranchId: (id: string) => void;
}

export const useBranchStore = create<BranchState>((set) => ({
  selectedBranchId: storage.get(STORAGE_KEYS.SELECTED_BRANCH),
  setSelectedBranchId: (id: string) => {
    storage.set(STORAGE_KEYS.SELECTED_BRANCH, id);
    set({ selectedBranchId: id });
  },
}));