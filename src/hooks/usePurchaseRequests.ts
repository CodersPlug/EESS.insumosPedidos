import { useState, useCallback } from 'react';
import { PurchaseRequest } from '../types/purchaseRequest';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/storage';
import { submitPurchaseRequests } from '../services/airtableService';
import { useBranchStore } from './useBranchSelection';
import { getBranchName } from '../services/branchService';

interface SubmitSuccess {
  timestamp: string;
  branchName: string;
}

export function usePurchaseRequests() {
  const { selectedBranchId } = useBranchStore();
  const [requests, setRequests] = useState<PurchaseRequest[]>(() => 
    storage.get<PurchaseRequest[]>(STORAGE_KEYS.PURCHASE_REQUESTS) || []
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<SubmitSuccess | null>(null);

  const addRequest = useCallback((request: Omit<PurchaseRequest, 'id' | 'createdAt' | 'branchId'>) => {
    if (!selectedBranchId) {
      throw new Error('Debe seleccionar una sucursal');
    }

    const newRequest: PurchaseRequest = {
      ...request,
      id: crypto.randomUUID(),
      branchId: selectedBranchId,
      createdAt: new Date().toISOString(),
    };

    setRequests(prev => {
      const updated = [newRequest, ...prev];
      storage.set(STORAGE_KEYS.PURCHASE_REQUESTS, updated);
      return updated;
    });

    return newRequest;
  }, [selectedBranchId]);

  const removeRequest = useCallback((id: string) => {
    setRequests(prev => {
      const updated = prev.filter(request => request.id !== id);
      storage.set(STORAGE_KEYS.PURCHASE_REQUESTS, updated);
      return updated;
    });
  }, []);

  const submitRequests = useCallback(async () => {
    if (!requests.length) {
      setError('No hay pedidos para enviar');
      return;
    }

    if (!selectedBranchId) {
      setError('Debe seleccionar una sucursal');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedRequests = requests.map(request => ({
        ...request,
        branchId: selectedBranchId
      }));

      await submitPurchaseRequests(updatedRequests);
      const branchName = await getBranchName(selectedBranchId);
      
      setRequests([]);
      storage.remove(STORAGE_KEYS.PURCHASE_REQUESTS);
      
      setSuccess({
        timestamp: new Date().toISOString(),
        branchName: branchName || 'Desconocida'
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al enviar los pedidos');
    } finally {
      setSubmitting(false);
    }
  }, [requests, selectedBranchId]);

  const clearSuccess = useCallback(() => {
    setSuccess(null);
  }, []);

  return {
    requests: requests.map(request => ({
      ...request,
      branchId: selectedBranchId || request.branchId
    })),
    submitting,
    error,
    success,
    addRequest,
    removeRequest,
    submitRequests,
    clearSuccess,
  };
}