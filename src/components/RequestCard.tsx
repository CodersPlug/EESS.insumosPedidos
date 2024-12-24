import React from 'react';
import { PurchaseRequest } from '../types';
import { StatusBadge } from './StatusBadge';
import { translations } from '../constants/translations';
import { formatCurrency, formatDate } from '../utils/formatters';

interface Props {
  request: PurchaseRequest;
  onStatusChange: (id: string, status: PurchaseRequest['status']) => void;
}

export function RequestCard({ request, onStatusChange }: Props) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
        <StatusBadge status={request.status} />
      </div>
      
      <p className="mt-2 text-gray-600">{request.description}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <p>{translations.labels.requester}: {request.requester}</p>
          <p>{translations.labels.amount}: {formatCurrency(request.amount)}</p>
          <p>{translations.labels.date}: {formatDate(request.date)}</p>
        </div>
        
        {request.status === 'pending' && (
          <div className="flex space-x-2">
            <button
              onClick={() => onStatusChange(request.id, 'approved')}
              className="rounded-md bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
            >
              {translations.buttons.approve}
            </button>
            <button
              onClick={() => onStatusChange(request.id, 'rejected')}
              className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            >
              {translations.buttons.reject}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}