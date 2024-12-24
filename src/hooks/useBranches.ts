import { useState, useEffect, useCallback } from 'react';
import { getBranches } from '../services/branchService';
import { Branch, BranchesState } from '../types/branch';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/storage';

export function useBranches() {
  const [state, setState] = useState<BranchesState>({
    data: [],
    loading: true,
    error: null,
    selected: null
  });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branches = await getBranches();
        const savedBranchId = storage.get<string>(STORAGE_KEYS.SELECTED_BRANCH);
        const defaultBranch = savedBranchId && branches.find(b => b.id === savedBranchId);
        
        setState({
          data: branches,
          loading: false,
          error: null,
          selected: defaultBranch?.id || branches[0]?.id || null
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Error al cargar las sucursales'
        }));
      }
    };

    fetchBranches();
  }, []);

  const selectBranch = useCallback((id: string) => {
    setState(prev => {
      if (!prev.data.some(branch => branch.id === id)) {
        return prev;
      }

      storage.set(STORAGE_KEYS.SELECTED_BRANCH, id);
      return { ...prev, selected: id };
    });
  }, []);

  return {
    ...state,
    selectBranch
  };
}