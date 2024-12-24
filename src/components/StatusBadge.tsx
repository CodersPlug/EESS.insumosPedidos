import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { PurchaseRequest } from '../types';
import { translations } from '../constants/translations';

interface Props {
  status: PurchaseRequest['status'];
}

export function StatusBadge({ status }: Props) {
  const getStatusIcon = (status: PurchaseRequest['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {getStatusIcon(status)}
      <span className="text-sm text-gray-500">
        {translations.status[status]}
      </span>
    </div>
  );
}