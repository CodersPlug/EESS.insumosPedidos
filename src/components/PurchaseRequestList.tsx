import React from 'react';
import { PurchaseRequest } from '../types';
import { RequestCard } from './RequestCard';
import { translations } from '../constants/translations';

interface Props {
  requests: PurchaseRequest[];
  onStatusChange: (id: string, status: PurchaseRequest['status']) => void;
}

export function PurchaseRequestList({ requests, onStatusChange }: Props) {
  if (requests.length === 0) {
    return (
      <div className="rounded-lg bg-white p-8 text-center text-gray-500">
        {translations.messages.noRequests}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}