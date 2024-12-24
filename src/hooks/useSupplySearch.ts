import { useState, useCallback } from 'react';
import { searchSupplies, createSupply } from '../services/supplyService';
import { Supply, SupplySearchState } from '../types/supply';

export function useSupplySearch() {
  const [state, setState] = useState<SupplySearchState>({
    data: [],
    loading: false,
    error: null,
  });

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setState(prev => ({ ...prev, data: [] }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const supplies = await searchSupplies(query);
      setState(prev => ({ ...prev, data: supplies, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Error al buscar insumos',
        data: [],
      }));
    }
  }, []);

  const create = useCallback(async (name: string): Promise<Supply> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const supply = await createSupply(name);
      setState(prev => ({
        ...prev,
        loading: false,
        data: [supply, ...prev.data],
      }));
      return supply;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Error al crear el insumo',
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    search,
    create,
  };
}