import React from 'react';
import { Trash2 } from 'lucide-react';
import { PurchaseRequest } from '../types/purchaseRequest';
import { EmptyState } from './EmptyState';

interface Props {
  requests: PurchaseRequest[];
  onRemove: (id: string) => void;
}

export function RequestList({ requests, onRemove }: Props) {
  if (requests.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mt-8">
      {requests.map((request) => (
        <div
          key={request.id}
          className="flex items-center justify-between py-1"
        >
          <div className="flex items-center gap-1 text-base">
            <span className="font-medium">{request.supplyName}</span>
            <span className="text-gray-400">×</span>
            <span>{request.quantity}</span>
          </div>

          <div className="w-10">
            <button
              onClick={() => onRemove(request.id)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}