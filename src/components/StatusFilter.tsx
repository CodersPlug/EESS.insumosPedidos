import React from 'react';
import { ListFilter } from 'lucide-react';
import { PurchaseRequest } from '../types';
import { translations } from '../constants/translations';

interface Props {
  value: PurchaseRequest['status'] | 'all';
  onChange: (value: PurchaseRequest['status'] | 'all') => void;
}

export function StatusFilter({ value, onChange }: Props) {
  return (
    <div className="mb-6 flex items-center space-x-4">
      <ListFilter className="h-5 w-5 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as PurchaseRequest['status'] | 'all')}
        className="rounded-md border-gray-300 bg-white py-1 pl-3 pr-8 text-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="all">{translations.status.all}</option>
        <option value="pending">{translations.status.pending}</option>
        <option value="approved">{translations.status.approved}</option>
        <option value="rejected">{translations.status.rejected}</option>
      </select>
    </div>
  );
}